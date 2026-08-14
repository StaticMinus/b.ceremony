"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../page.module.css";

export default function AdminPage() {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterAttending, setFilterAttending] = useState("all");
  const [syncStatus, setSyncStatus] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchAndSyncSubmissions();
  }, []);

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

  async function fetchAndSyncSubmissions() {
    setLoading(true);
    setError("");
    setSyncStatus("");

    try {
      // 1. Fetch Server Data
      const res = await fetch("/api/rsvp");
      let serverData = [];
      if (res.ok) {
        serverData = await res.json();
      }

      // 2. Read Local Storage Data Backup
      let localData = [];
      if (typeof window !== "undefined") {
        try {
          localData = JSON.parse(localStorage.getItem("egbule_rsvp_submissions") || "[]");
        } catch {
          localData = [];
        }
      }

      // 3. Merge Server & Local Storage Records
      const { merged, missingOnServer } = mergeRecords(serverData, localData);

      // 4. Auto-Sync Missing Local Records back to Server
      if (missingOnServer.length > 0) {
        setSyncStatus(`Auto-syncing ${missingOnServer.length} record(s) to server...`);
        try {
          await fetch("/api/rsvp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "sync", entries: missingOnServer }),
          });
        } catch (e) {
          console.warn("Auto-sync back to server failed:", e);
        }
      }

      // 5. Update Master Local Storage Cache
      if (typeof window !== "undefined") {
        localStorage.setItem("egbule_rsvp_submissions", JSON.stringify(merged));
      }

      setAttendees(merged);
    } catch (err) {
      console.error("Fetch submissions error:", err);
      // Fallback to local storage if network or server fails
      if (typeof window !== "undefined") {
        const localData = JSON.parse(localStorage.getItem("egbule_rsvp_submissions") || "[]");
        setAttendees(localData);
      } else {
        setError("Could not load responses. Ensure the server is running.");
      }
    } finally {
      setLoading(false);
    }
  }

  function downloadCSV() {
    window.location.href = "/api/rsvp?format=csv";
  }

  function exportJSONBackup() {
    if (!attendees.length) return;
    const jsonString = JSON.stringify(attendees, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Egbule_RSVP_Backup_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function handleImportJSON(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const imported = JSON.parse(text);
      if (!Array.isArray(imported)) {
        alert("Invalid backup file format. Expected a JSON array.");
        return;
      }

      setLoading(true);
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync", entries: imported }),
      });

      if (res.ok) {
        alert(`Successfully imported and synced ${imported.length} attendee records!`);
        fetchAndSyncSubmissions();
      } else {
        alert("Failed to sync imported data with the server.");
      }
    } catch (err) {
      alert("Error parsing backup JSON file: " + err.message);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  /* Filtering */
  const filtered = attendees.filter((item) => {
    const nameMatch = `${item.firstName || ""} ${item.lastName || ""} ${item.phone || ""}`
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filterAttending === "all") return nameMatch;
    if (filterAttending === "yes") return nameMatch && item.attending === "yes";
    if (filterAttending === "no") return nameMatch && item.attending === "no";
    if (filterAttending === "lodging") return nameMatch && item.lodging === "yes";
    if (filterAttending === "bus") return nameMatch && item.bus === "yes";

    return nameMatch;
  });

  /* Calculate Summary Metrics */
  const totalAttending = attendees.filter((a) => a.attending === "yes").length;
  const totalGuestsCount = attendees.reduce((acc, curr) => {
    if (curr.attending === "yes") {
      const num = parseInt(curr.guests, 10) || 0;
      return acc + 1 + num;
    }
    return acc;
  }, 0);
  const totalLodging = attendees.filter((a) => a.lodging === "yes").length;
  const totalBus = attendees.filter((a) => a.bus === "yes").length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", padding: "2rem 1rem" }}>
      <div className="container-wide">
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <Link href="/" style={{ color: "var(--color-accent)", textDecoration: "none", fontSize: "0.9rem", fontWeight: "600", letterSpacing: "0.05em" }}>
              ← Return to Memorial Site
            </Link>
            <h1 className="headline" style={{ marginTop: "0.5rem" }}>
              RSVP Admin Dashboard
            </h1>
            <p className="body text-secondary">
              High Chief Sir Dr. Richard O. Egbule Burial Ceremony Submissions
            </p>
            {syncStatus && (
              <p style={{ fontSize: "0.8rem", color: "#16a34a", marginTop: "0.25rem", fontWeight: "600" }}>
                ✓ {syncStatus}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
            <button onClick={fetchAndSyncSubmissions} className="btn btn-secondary" style={{ fontSize: "0.82rem", padding: "0.5rem 1rem" }}>
              🔄 Refresh & Sync
            </button>

            <button onClick={downloadCSV} className="btn btn-primary" style={{ fontSize: "0.82rem", padding: "0.5rem 1rem" }}>
              📥 Download CSV
            </button>

            <button onClick={exportJSONBackup} className="btn btn-secondary" style={{ fontSize: "0.82rem", padding: "0.5rem 1rem" }}>
              💾 Backup JSON
            </button>

            <button onClick={() => fileInputRef.current?.click()} className="btn btn-secondary" style={{ fontSize: "0.82rem", padding: "0.5rem 1rem" }}>
              📤 Import Backup
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          <div className={styles.biographyCard} style={{ padding: "1.25rem", textAlign: "center" }}>
            <span className="caption">Total Submissions</span>
            <h3 className="title" style={{ fontSize: "2rem", color: "var(--color-accent)", marginTop: "0.2rem" }}>
              {attendees.length}
            </h3>
          </div>
          <div className={styles.biographyCard} style={{ padding: "1.25rem", textAlign: "center" }}>
            <span className="caption">Confirmed Attending</span>
            <h3 className="title" style={{ fontSize: "2rem", color: "var(--color-accent)", marginTop: "0.2rem" }}>
              {totalAttending}
            </h3>
          </div>
          <div className={styles.biographyCard} style={{ padding: "1.25rem", textAlign: "center" }}>
            <span className="caption">Total Headcount (Inc. Guests)</span>
            <h3 className="title" style={{ fontSize: "2rem", color: "var(--color-accent)", marginTop: "0.2rem" }}>
              {totalGuestsCount}
            </h3>
          </div>
          <div className={styles.biographyCard} style={{ padding: "1.25rem", textAlign: "center" }}>
            <span className="caption">Lodging Needed</span>
            <h3 className="title" style={{ fontSize: "2rem", color: "var(--color-accent)", marginTop: "0.2rem" }}>
              {totalLodging}
            </h3>
          </div>
          <div className={styles.biographyCard} style={{ padding: "1.25rem", textAlign: "center" }}>
            <span className="caption">Bus Transport</span>
            <h3 className="title" style={{ fontSize: "2rem", color: "var(--color-accent)", marginTop: "0.2rem" }}>
              {totalBus}
            </h3>
          </div>
        </div>

        {/* Filters & Search */}
        <div className={`glass-card`} style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: "1 1 280px",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text)",
              }}
            />

            <select
              value={filterAttending}
              onChange={(e) => setFilterAttending(e.target.value)}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text)",
              }}
            >
              <option value="all">All Submissions</option>
              <option value="yes">Attending Only</option>
              <option value="no">Cannot Attend</option>
              <option value="lodging">Needs Lodging</option>
              <option value="bus">Needs Bus Charter</option>
            </select>
          </div>
        </div>

        {/* Attendees Table */}
        <div className={`glass-card`} style={{ padding: "1.5rem", overflowX: "auto" }}>
          {loading && <p style={{ padding: "2rem", textAlign: "center" }}>Loading attendee records...</p>}
          {error && <p style={{ padding: "2rem", textAlign: "center", color: "#DC2626" }}>{error}</p>}

          {!loading && !filtered.length && !error && (
            <p style={{ padding: "3rem 1rem", textAlign: "center", color: "var(--color-text-secondary)" }}>
              No matching attendee responses found.
            </p>
          )}

          {!loading && filtered.length > 0 && (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-border)", color: "var(--color-accent)" }}>
                  <th style={{ padding: "1rem 0.75rem" }}>Attendee Name</th>
                  <th style={{ padding: "1rem 0.75rem" }}>Phone / WhatsApp</th>
                  <th style={{ padding: "1rem 0.75rem" }}>Status</th>
                  <th style={{ padding: "1rem 0.75rem" }}>Guests</th>
                  <th style={{ padding: "1rem 0.75rem" }}>Lodging</th>
                  <th style={{ padding: "1rem 0.75rem" }}>Bus</th>
                  <th style={{ padding: "1rem 0.75rem" }}>Tribute / Message</th>
                  <th style={{ padding: "1rem 0.75rem" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => (
                  <tr key={item.id || item.phone || idx} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "1rem 0.75rem", fontWeight: "600" }}>
                      {item.firstName} {item.lastName}
                    </td>
                    <td style={{ padding: "1rem 0.75rem" }}>
                      <div>{item.phone || "—"}</div>
                      <div style={{ color: "var(--color-text-tertiary)", fontSize: "0.75rem" }}>{item.email}</div>
                    </td>
                    <td style={{ padding: "1rem 0.75rem" }}>
                      <span
                        style={{
                          padding: "0.2rem 0.6rem",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: "700",
                          background: item.attending === "yes" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                          color: item.attending === "yes" ? "#10B981" : "#EF4444",
                        }}
                      >
                        {(item.attending || "").toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 0.75rem" }}>{item.guests}</td>
                    <td style={{ padding: "1rem 0.75rem" }}>{item.lodging}</td>
                    <td style={{ padding: "1rem 0.75rem" }}>{item.bus}</td>
                    <td style={{ padding: "1rem 0.75rem", maxWidth: "260px", color: "var(--color-text-secondary)" }}>
                      {item.message || "—"}
                    </td>
                    <td style={{ padding: "1rem 0.75rem", fontSize: "0.8rem", color: "var(--color-text-tertiary)" }}>
                      {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
