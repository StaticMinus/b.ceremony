import { NextResponse } from "next/server";
import { getAttendees, saveAttendee } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      attending,
      guests,
      lodging,
      bus,
      message,
    } = body || {};

    if (!firstName || !firstName.trim() || !lastName || !lastName.trim()) {
      return NextResponse.json(
        { error: "First name and last name are required." },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    const entry = {
      id: "rsvp_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: (email || "").trim(),
      phone: (phone || "").trim(),
      attending: attending || "yes",
      guests: String(guests || "0"),
      lodging: lodging || "no",
      bus: bus || "no",
      message: (message || "").trim(),
      submittedAt: new Date().toISOString(),
    };

    await saveAttendee(entry);

    return NextResponse.json({ success: true, entry });
  } catch (err) {
    console.error("RSVP submission error:", err);
    return NextResponse.json(
      { error: "Failed to process RSVP submission. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const attendees = await getAttendees();
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");

    // CSV Download Route
    if (format === "csv") {
      const headers = [
        "First Name",
        "Last Name",
        "Email",
        "Phone / WhatsApp",
        "Attending",
        "Guests",
        "Need Lodging",
        "Bus Charter",
        "Message",
        "Submitted At",
      ];

      const rows = attendees.map((a) => [
        `"${a.firstName || ""}"`,
        `"${a.lastName || ""}"`,
        `"${a.email || ""}"`,
        `"${a.phone || ""}"`,
        `"${a.attending || ""}"`,
        `"${a.guests || ""}"`,
        `"${a.lodging || ""}"`,
        `"${a.bus || ""}"`,
        `"${(a.message || "").replace(/"/g, '""')}"`,
        `"${a.submittedAt || ""}"`,
      ]);

      const csvString = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

      return new Response(csvString, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="Egbule_Burial_RSVP_Responses_${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json(attendees);
  } catch (err) {
    console.error("RSVP fetch error:", err);
    return NextResponse.json(
      { error: "Failed to retrieve attendees." },
      { status: 500 }
    );
  }
}
