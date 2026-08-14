import { promises as fs } from "fs";
import path from "path";

const SCHEMA_PATH = path.join(process.cwd(), "prisma", "schema.prisma");

async function prepareSchema() {
  const dbUrl =
    process.env.DATABASE_URL ||
    process.env.STORAGE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.NEON_DATABASE_URL ||
    "file:./dev.db";

  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = dbUrl;
  }

  const isPostgres = dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://");
  const provider = isPostgres ? "postgresql" : "sqlite";

  let schemaText = await fs.readFile(SCHEMA_PATH, "utf-8");

  // Ensure generator client is prisma-client-js
  schemaText = schemaText.replace(/generator client\s*\{[\s\S]*?\}/, `generator client {\n  provider = "prisma-client-js"\n}`);

  // Set datasource db provider dynamically
  schemaText = schemaText.replace(/datasource db\s*\{[\s\S]*?\}/, `datasource db {\n  provider = "${provider}"\n  url      = env("DATABASE_URL")\n}`);

  await fs.writeFile(SCHEMA_PATH, schemaText, "utf-8");
  console.log(`Prisma datasource provider set to: ${provider}`);
}

prepareSchema().catch(console.error);
