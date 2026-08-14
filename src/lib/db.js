import { prisma } from "./prisma.js";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "attendees.json");

/**
 * Deduplicate attendee list helper
 */
function deduplicateAttendees(list) {
  const seen = new Set();
  const result = [];

  for (const item of list) {
    if (!item) continue;
    const key = item.id || `${item.phone || ""}_${item.firstName || ""}_${item.lastName || ""}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

/**
 * Helper to auto-migrate existing legacy attendees.json into database if DB is empty
 */
async function autoMigrateLegacyJson() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed) && parsed.length > 0) {
      console.log(`Auto-migrating ${parsed.length} legacy entries from attendees.json to database...`);
      for (const entry of parsed) {
        if (!entry.firstName || !entry.lastName || !entry.phone) continue;
        await prisma.attendee.upsert({
          where: { id: entry.id || `legacy_${Date.now()}_${Math.random().toString(36).substr(2, 4)}` },
          update: {},
          create: {
            id: entry.id || `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            firstName: String(entry.firstName).trim(),
            lastName: String(entry.lastName).trim(),
            email: entry.email ? String(entry.email).trim() : null,
            phone: String(entry.phone).trim(),
            attending: String(entry.attending || "yes"),
            guests: String(entry.guests || "0"),
            lodging: String(entry.lodging || "no"),
            bus: String(entry.bus || "no"),
            message: entry.message ? String(entry.message).trim() : null,
            submittedAt: entry.submittedAt ? new Date(entry.submittedAt) : new Date(),
          },
        });
      }
    }
  } catch (err) {
    // If file doesn't exist or migration fails, continue cleanly
    console.warn("Legacy JSON migration notice:", err.message);
  }
}

/**
 * Fetch all attendees from Database
 */
export async function getAttendees() {
  try {
    let records = await prisma.attendee.findMany({
      orderBy: { submittedAt: "desc" },
    });

    // Auto-seed/migrate from attendees.json if database is currently empty
    if (records.length === 0) {
      await autoMigrateLegacyJson();
      records = await prisma.attendee.findMany({
        orderBy: { submittedAt: "desc" },
      });
    }

    const formatted = records.map((r) => ({
      id: r.id,
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email || "",
      phone: r.phone,
      attending: r.attending,
      guests: r.guests,
      lodging: r.lodging,
      bus: r.bus,
      message: r.message || "",
      submittedAt: r.submittedAt ? r.submittedAt.toISOString() : new Date().toISOString(),
    }));

    return deduplicateAttendees(formatted);
  } catch (err) {
    console.error("Database fetch error in getAttendees:", err);
    // Fallback: Attempt filesystem read if DB connection fails
    try {
      const raw = await fs.readFile(DATA_FILE, "utf-8");
      return deduplicateAttendees(JSON.parse(raw));
    } catch {
      return [];
    }
  }
}

/**
 * Save a single new attendee RSVP response to Database
 */
export async function saveAttendee(entry) {
  try {
    const entryId = entry.id || `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    await prisma.attendee.upsert({
      where: { id: entryId },
      update: {
        firstName: String(entry.firstName).trim(),
        lastName: String(entry.lastName).trim(),
        email: entry.email ? String(entry.email).trim() : null,
        phone: String(entry.phone).trim(),
        attending: String(entry.attending || "yes"),
        guests: String(entry.guests || "0"),
        lodging: String(entry.lodging || "no"),
        bus: String(entry.bus || "no"),
        message: entry.message ? String(entry.message).trim() : null,
        submittedAt: entry.submittedAt ? new Date(entry.submittedAt) : new Date(),
      },
      create: {
        id: entryId,
        firstName: String(entry.firstName).trim(),
        lastName: String(entry.lastName).trim(),
        email: entry.email ? String(entry.email).trim() : null,
        phone: String(entry.phone).trim(),
        attending: String(entry.attending || "yes"),
        guests: String(entry.guests || "0"),
        lodging: String(entry.lodging || "no"),
        bus: String(entry.bus || "no"),
        message: entry.message ? String(entry.message).trim() : null,
        submittedAt: entry.submittedAt ? new Date(entry.submittedAt) : new Date(),
      },
    });

    // Optional Webhook Notification
    if (process.env.RSVP_WEBHOOK_URL) {
      try {
        await fetch(process.env.RSVP_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
      } catch (err) {
        console.warn("RSVP Webhook notification error:", err);
      }
    }

    // Also sync to data/attendees.json on disk so git/file state stays updated
    try {
      const allRecords = await getAttendees();
      await fs.writeFile(DATA_FILE, JSON.stringify(allRecords, null, 2), "utf-8");
    } catch (e) {
      console.warn("Could not sync to attendees.json:", e);
    }

    return await getAttendees();
  } catch (err) {
    console.error("Database save error in saveAttendee:", err);
    throw err;
  }
}

/**
 * Bulk save / sync multiple attendee records into Database
 */
export async function saveMultipleAttendees(entries) {
  if (!Array.isArray(entries)) return await getAttendees();

  try {
    for (const entry of entries) {
      if (!entry.firstName || !entry.lastName || !entry.phone) continue;
      const entryId = entry.id || `rsvp_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

      await prisma.attendee.upsert({
        where: { id: entryId },
        update: {
          firstName: String(entry.firstName).trim(),
          lastName: String(entry.lastName).trim(),
          email: entry.email ? String(entry.email).trim() : null,
          phone: String(entry.phone).trim(),
          attending: String(entry.attending || "yes"),
          guests: String(entry.guests || "0"),
          lodging: String(entry.lodging || "no"),
          bus: String(entry.bus || "no"),
          message: entry.message ? String(entry.message).trim() : null,
          submittedAt: entry.submittedAt ? new Date(entry.submittedAt) : new Date(),
        },
        create: {
          id: entryId,
          firstName: String(entry.firstName).trim(),
          lastName: String(entry.lastName).trim(),
          email: entry.email ? String(entry.email).trim() : null,
          phone: String(entry.phone).trim(),
          attending: String(entry.attending || "yes"),
          guests: String(entry.guests || "0"),
          lodging: String(entry.lodging || "no"),
          bus: String(entry.bus || "no"),
          message: entry.message ? String(entry.message).trim() : null,
          submittedAt: entry.submittedAt ? new Date(entry.submittedAt) : new Date(),
        },
      });
    }
    return await getAttendees();
  } catch (err) {
    console.error("Database bulk save error:", err);
    throw err;
  }
}

/**
 * Fetch tributes (attendees who provided condolence messages)
 */
export async function getTributes() {
  const all = await getAttendees();
  return all.filter((item) => item.message && item.message.trim().length > 0);
}

/**
 * Delete attendee by ID
 */
export async function deleteAttendee(id) {
  try {
    await prisma.attendee.deleteMany({
      where: { id: id },
    });
  } catch (err) {
    console.warn("Database delete error:", err);
  }
  return await getAttendees();
}
