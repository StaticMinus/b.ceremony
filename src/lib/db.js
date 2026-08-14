import { promises as fs } from "fs";
import path from "path";

// Choose file path (uses /tmp on Vercel serverless environment if process.cwd() is read-only)
const IS_VERCEL = !!process.env.VERCEL;
const DATA_DIR = IS_VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "attendees.json");

// Upstash Redis / Vercel KV Env Var Support
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// In-memory fallback for serverless execution lifecycle
let memoryStore = [];

/**
 * Helper to deduplicate array of attendee objects
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
 * Ensure data directory and storage file exist
 */
async function ensureStorage() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

/**
 * Fetch all attendees (supports Upstash Redis / Vercel KV if env vars exist, otherwise falls back to filesystem / memory)
 */
export async function getAttendees() {
  // 1. Upstash Redis / Vercel KV Integration (if configured on Vercel)
  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/get/attendees`, {
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
        },
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.result) {
          const parsed = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
          const clean = deduplicateAttendees(Array.isArray(parsed) ? parsed : []);
          memoryStore = clean;
          return clean;
        }
      }
    } catch (err) {
      console.warn("Vercel KV / Upstash fetch failed, using fallback storage:", err);
    }
  }

  // 2. Local Filesystem / Serverless /tmp Storage
  try {
    await ensureStorage();
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    const clean = deduplicateAttendees(Array.isArray(parsed) ? parsed : []);
    memoryStore = clean;
    return clean;
  } catch {
    return memoryStore;
  }
}

/**
 * Save updated attendee list to persistent storage
 */
async function persistAttendees(updatedList) {
  const cleanList = deduplicateAttendees(updatedList);

  // 1. Vercel KV / Upstash Redis (Persistent Production Database on Vercel)
  if (KV_URL && KV_TOKEN) {
    try {
      await fetch(`${KV_URL}/set/attendees`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSON.stringify(cleanList)),
      });
    } catch (err) {
      console.warn("Vercel KV / Upstash save error:", err);
    }
  }

  // 2. Local Filesystem / /tmp File Save
  try {
    await ensureStorage();
    await fs.writeFile(DATA_FILE, JSON.stringify(cleanList, null, 2), "utf-8");
  } catch (err) {
    console.warn("Filesystem write error (using memory store):", err);
  }

  memoryStore = cleanList;
  return cleanList;
}

/**
 * Add a single new RSVP entry
 */
export async function saveAttendee(entry) {
  const current = await getAttendees();
  const updated = [entry, ...current];

  // Webhook Notification (e.g. Zapier / Make / Formspree / Google Sheet / Slack)
  if (process.env.RSVP_WEBHOOK_URL) {
    try {
      await fetch(process.env.RSVP_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch (err) {
      console.warn("RSVP Webhook notification failed:", err);
    }
  }

  return await persistAttendees(updated);
}

/**
 * Bulk save or sync multiple attendee entries (for restoring/merging client backups)
 */
export async function saveMultipleAttendees(entries) {
  const current = await getAttendees();
  const merged = [...entries, ...current];
  return await persistAttendees(merged);
}
