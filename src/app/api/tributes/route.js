import { NextResponse } from "next/server";
import { getTributes } from "@/lib/db";

export async function GET() {
  try {
    const tributes = await getTributes();
    return NextResponse.json({ success: true, tributes });
  } catch (err) {
    console.error("Fetch tributes error:", err);
    return NextResponse.json(
      { error: "Failed to fetch tributes." },
      { status: 500 }
    );
  }
}
