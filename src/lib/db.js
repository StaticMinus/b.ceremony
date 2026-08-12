import { promises as fs } from "fs";
import path from "path";

// Choose file path (uses /tmp on Vercel serverless environment if process.cwd() is read-only)
const IS_VERCEL = !!process.env.VERCEL;
const DATA_DIR = IS_VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "attendees.json");

// In-memory fallback for serverless execution lifecycle
let memoryStore = [];

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
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const res = await fetch(`${process.env.KV_REST_API_URL}/get/attendees`, {
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        return json.result ? JSON.parse(json.result) : [];
      }
    } catch (err) {
      console.warn("Vercel KV fetch failed, using fallback storage:", err);
    }
  }

  // 2. Local Filesystem / Serverless /tmp Storage
  try {
    await ensureStorage();
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    memoryStore = parsed;
    return parsed;
  } catch {
    return memoryStore;
  }
}

/**
 * Add a new RSVP entry
 */
export async function saveAttendee(entry) {
  const current = await getAttendees();
  const updated = [entry, ...current];

  // 1. Vercel KV / Upstash Redis (Persistent Production Database on Vercel)
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      await fetch(`${process.env.KV_REST_API_URL}/set/attendees`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSON.stringify(updated)),
      });
    } catch (err) {
      console.warn("Vercel KV save error:", err);
    }
  }

  // 2. Webhook Notification (e.g. Zapier / Make / Formspree / Google Sheet / Slack)
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

  // 3. Local Filesystem / /tmp File Save
  try {
    await ensureStorage();
    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.warn("Filesystem write error (using memory store):", err);
  }

  memoryStore = updated;
  return updated;
}
