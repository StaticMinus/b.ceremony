import { prisma } from "../src/lib/prisma.js";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "attendees.json");

async function cleanup() {
  console.log("Cleaning up database...");

  // 1. Delete Test User from Prisma DB
  const testDel = await prisma.attendee.deleteMany({
    where: {
      OR: [
        { firstName: "Test" },
        { lastName: "User" },
        { email: "test@example.com" },
      ],
    },
  });
  console.log(`Deleted ${testDel.count} 'Test User' record(s) from Prisma DB.`);

  // 2. Deduplicate Lucia Okpo in Prisma DB
  const lucias = await prisma.attendee.findMany({
    where: {
      OR: [
        { firstName: { contains: "Lucia" } },
        { lastName: { contains: "Okpo" } },
        { email: "okpolucia@gmail.com" },
      ],
    },
  });

  if (lucias.length > 1) {
    console.log(`Found ${lucias.length} Lucia Okpo entries. Keeping 1, deleting extra ${lucias.length - 1}...`);
    for (let i = 1; i < lucias.length; i++) {
      await prisma.attendee.delete({
        where: { id: lucias[i].id },
      });
    }
  } else {
    console.log(`Lucia Okpo count in DB: ${lucias.length} (exactly 1 entry).`);
  }

  // 3. Update data/attendees.json
  try {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(fileContent);
    const filtered = [];
    const seen = new Set();

    for (const a of parsed) {
      if (!a) continue;
      if (a.firstName === "Test" && a.lastName === "User") continue;
      if (a.email === "test@example.com") continue;

      const key = a.phone ? a.phone.trim().toLowerCase() : `${a.firstName}_${a.lastName}`.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        filtered.push(a);
      }
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    console.log(`Updated attendees.json (Total entries: ${filtered.length}).`);
  } catch (e) {
    console.warn("JSON update notice:", e.message);
  }
}

cleanup()
  .then(() => console.log("Cleanup completed successfully!"))
  .catch(console.error);
