"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSubmissions() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState("");

  function mergeRecords(serverList, localList) {
    const map = new Map();

    for (const item of serverList || []) {
      if (!item) continue;
      const key = item.id || `${item.phone || ""}_${item.firstName || ""}_${item.lastName || ""}`;
      map.set(key, item);
    }

    const missingOnServer = [];
    for (const item of localList || []) {
      if (!item) continue;
      const key = item.id || `${item.phone || ""}_${item.firstName || ""}_${item.lastName || ""}`;
      if (!map.has(key)) {
        map.set(key, item);
        missingOnServer.push(item);
      }
    }

    return {
      merged: Array.from(map.values()),
      missingOnServer,
    };
  }

  async function fetchSubmissions() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/rsvp");
      let serverData = [];
      if (res.ok) {
        serverData = await res.json();
      }

      let localData = [];
      if (typeof window !== "undefined") {
        try {
          localData = JSON.parse(localStorage.getItem("egbule_rsvp_submissions") || "[]");
        } catch {
          localData = [];
        }
      }

      const { merged, missingOnServer } = mergeRecords(serverData, localData);

      if (missingOnServer.length > 0) {
        try {
          await fetch("/api/rsvp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "sync", entries: missingOnServer }),
          });
        } catch (e) {
          console.warn("Auto sync failed:", e);
        }
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("egbule_rsvp_submissions", JSON.stringify(merged));
      }

      setAttendees(merged);
    } catch {
      if (typeof window !== "undefined") {
        const localData = JSON.parse(localStorage.getItem("egbule_rsvp_submissions") || "[]");
        setAttendees(localData);
      } else {
        setError("Could not load responses. Ensure server is running.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleOpen() {
    setIsOpen(true);
    fetchSubmissions();
  }

  function downloadCSV() {
    if (!attendees.length) return;
    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
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

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Egbule_Burial_RSVP_Responses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="btn btn-secondary"
        style={{ fontSize: "0.8rem", padding: "0.5rem 1.2rem", marginTop: "1rem" }}
      >
        📋 View Submitted Responses ({attendees.length})
      </button>

      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "100%",
                maxWidth: "800px",
                maxHeight: "85vh",
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                overflowY: "auto",
                boxShadow: "var(--shadow-lg)",
                color: "var(--color-text)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <h3 className="title">Attendee Responses ({attendees.length})</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                    Real-time attendee list backed up in browser & server storage
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  ✕
                </button>
              </div>

              {loading && <p>Loading submissions...</p>}
              {error && <p style={{ color: "#DC2626" }}>{error}</p>}

              {!loading && !attendees.length && !error && (
                <p style={{ color: "var(--color-text-secondary)", textAlign: "center", margin: "2rem 0" }}>
                  No responses recorded yet. Submissions will appear here.
                </p>
              )}

              {attendees.length > 0 && (
                <>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
                    <button onClick={downloadCSV} className="btn btn-primary" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }}>
                      📥 Download CSV
                    </button>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.85rem",
                        textAlign: "left",
                      }}
                    >
                      <thead>
                        <tr style={{ borderBottom: "2px solid var(--color-border)", color: "var(--color-accent)" }}>
                          <th style={{ padding: "0.75rem" }}>Name</th>
                          <th style={{ padding: "0.75rem" }}>Phone / Email</th>
                          <th style={{ padding: "0.75rem" }}>Attending</th>
                          <th style={{ padding: "0.75rem" }}>Guests</th>
                          <th style={{ padding: "0.75rem" }}>Lodging</th>
                          <th style={{ padding: "0.75rem" }}>Bus</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendees.map((item, idx) => (
                          <tr key={item.id || idx} style={{ borderBottom: "1px solid var(--color-border)" }}>
                            <td style={{ padding: "0.75rem", fontWeight: "600" }}>
                              {item.firstName} {item.lastName}
                            </td>
                            <td style={{ padding: "0.75rem" }}>
                              <div>{item.phone || "—"}</div>
                              <div style={{ color: "var(--color-text-tertiary)", fontSize: "0.75rem" }}>{item.email}</div>
                            </td>
                            <td style={{ padding: "0.75rem" }}>{item.attending}</td>
                            <td style={{ padding: "0.75rem" }}>{item.guests}</td>
                            <td style={{ padding: "0.75rem" }}>{item.lodging}</td>
                            <td style={{ padding: "0.75rem" }}>{item.bus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
