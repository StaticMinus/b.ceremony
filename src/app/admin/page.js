"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./admin.module.css";

export default function AdminPage() {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterAttending, setFilterAttending] = useState("all");
  const [lastUpdatedTime, setLastUpdatedTime] = useState("");
  const [selectedAttendee, setSelectedAttendee] = useState(null);

  useEffect(() => {
    // Initial fetch on page load
    fetchSubmissions();

    // Live auto-poll every 3 seconds from server database
    const interval = setInterval(() => {
      fetchSubmissions(true);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  async function fetchSubmissions(isBackgroundPoll = false) {
    if (!isBackgroundPoll) {
      setLoading(true);
      setError("");
    }

    try {
      // Always fetch fresh data from server API without browser HTTP cache
      const res = await fetch("/api/rsvp?t=" + Date.now(), { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setAttendees(data);
          setLastUpdatedTime(new Date().toLocaleTimeString());
        }
      } else {
        if (!isBackgroundPoll) {
          setError("Failed to fetch latest responses from server.");
        }
      }
    } catch (err) {
      console.error("Fetch submissions error:", err);
      if (!isBackgroundPoll) {
        setError("Network error loading responses. Please check your connection.");
      }
    } finally {
      if (!isBackgroundPoll) setLoading(false);
    }
  }

  function downloadCSV() {
    window.location.href = "/api/rsvp?format=csv";
  }

  /* Filtering */
  const filtered = attendees.filter((item) => {
    const searchTarget = `${item.firstName || ""} ${item.lastName || ""} ${item.phone || ""} ${item.email || ""}`.toLowerCase();
    const nameMatch = searchTarget.includes(search.toLowerCase());

    if (filterAttending === "all") return nameMatch;
    if (filterAttending === "yes") return nameMatch && item.attending === "yes";
    if (filterAttending === "no") return nameMatch && item.attending === "no";
    if (filterAttending === "lodging") return nameMatch && item.lodging === "yes";
    if (filterAttending === "bus") return nameMatch && item.bus === "yes";
    if (filterAttending === "tribute") return nameMatch && item.message && item.message.trim().length > 0;

    return nameMatch;
  });

  /* Summary Metrics */
  const totalAttending = attendees.filter((a) => a.attending === "yes").length;
  const totalHeadcount = attendees.reduce((acc, curr) => {
    if (curr.attending === "yes") {
      const num = parseInt(curr.guests, 10) || 0;
      return acc + 1 + num;
    }
    return acc;
  }, 0);
  const totalLodging = attendees.filter((a) => a.lodging === "yes").length;
  const totalBus = attendees.filter((a) => a.bus === "yes").length;
  const totalTributes = attendees.filter((a) => a.message && a.message.trim().length > 0).length;

  return (
    <div className={styles.adminWrapper}>
      <div className="container-wide">
        {/* Top Header */}
        <div className={styles.adminHeader}>
          <div className={styles.adminHeaderInfo}>
            <Link href="/" className={styles.backLink}>
              ← Return to Memorial Site
            </Link>
            <h1 className={styles.adminTitle}>RSVP Admin Dashboard</h1>
            <p className={styles.adminSubtitle}>
              High Chief Sir Dr. Richard O. Egbule Burial Ceremony Submissions
            </p>

            <div className={styles.liveBadge}>
              <span className={styles.pulseDot} />
              <span>Live Sync Active {lastUpdatedTime ? `(${lastUpdatedTime})` : ""}</span>
            </div>
          </div>

          <div className={styles.adminActions}>
            <button onClick={() => fetchSubmissions()} className={`btn btn-secondary ${styles.adminBtn}`}>
              🔄 Refresh Now
            </button>
            <button onClick={downloadCSV} className={`btn btn-primary ${styles.adminBtn}`}>
              📥 Download CSV
            </button>
          </div>
        </div>

        {/* Responsive KPI Metrics Grid */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Total Submissions</span>
            <div className={styles.metricValue}>{attendees.length}</div>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Confirmed Attending</span>
            <div className={styles.metricValue}>{totalAttending}</div>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Total Headcount</span>
            <div className={styles.metricValue}>{totalHeadcount}</div>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Lodging Needed</span>
            <div className={styles.metricValue}>{totalLodging}</div>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Bus Transport</span>
            <div className={styles.metricValue}>{totalBus}</div>
          </div>
        </div>

        {/* Toolbar: Search & Filters */}
        <div className={styles.toolbarCard}>
          <div className={styles.toolbarRow}>
            <input
              type="text"
              placeholder="🔍 Search attendee by name, phone, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />

            <select
              value={filterAttending}
              onChange={(e) => setFilterAttending(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Submissions ({attendees.length})</option>
              <option value="yes">Attending Only ({totalAttending})</option>
              <option value="no">Cannot Attend</option>
              <option value="lodging">Needs Lodging ({totalLodging})</option>
              <option value="bus">Needs Bus Transport ({totalBus})</option>
              <option value="tribute">With Tribute Message ({totalTributes})</option>
            </select>
          </div>
        </div>

        {/* Content Loading & Error States */}
        {loading && attendees.length === 0 && (
          <p style={{ padding: "3rem", textAlign: "center", color: "var(--color-text-secondary)" }}>
            Loading attendee records from server...
          </p>
        )}
        {error && <p style={{ padding: "3rem", textAlign: "center", color: "#DC2626" }}>{error}</p>}

        {!loading && !filtered.length && !error && (
          <div style={{ padding: "4rem 1rem", textAlign: "center", background: "var(--color-surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "1.05rem" }}>
              No attendee responses found matching your criteria.
            </p>
          </div>
        )}

        {filtered.length > 0 && (
          <>
            {/* Desktop Table View (>= 768px) */}
            <div className={styles.tableContainer}>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Attendee Name</th>
                    <th>Phone & Email</th>
                    <th>Status</th>
                    <th>Guests</th>
                    <th>Lodging</th>
                    <th>Bus</th>
                    <th>Tribute / Message</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, idx) => {
                    const isAttending = item.attending === "yes";
                    return (
                      <tr
                        key={item.id || idx}
                        onClick={() => setSelectedAttendee(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <td style={{ fontWeight: "700" }}>
                          {item.firstName} {item.lastName}
                        </td>
                        <td>
                          <div>
                            {item.phone ? (
                              <a href={`tel:${item.phone}`} className={styles.contactLink}>
                                {item.phone}
                              </a>
                            ) : (
                              "—"
                            )}
                          </div>
                          {item.email && (
                            <div style={{ color: "var(--color-text-tertiary)", fontSize: "0.75rem", wordBreak: "break-all" }}>
                              <a href={`mailto:${item.email}`} style={{ color: "inherit", textDecoration: "none" }}>
                                {item.email}
                              </a>
                            </div>
                          )}
                        </td>
                        <td>
                          <span className={`${styles.statusBadge} ${isAttending ? styles.badgeYes : styles.badgeNo}`}>
                            {isAttending ? "ATTENDING" : "DECLINED"}
                          </span>
                        </td>
                        <td>{item.guests ? `+${item.guests}` : "0"}</td>
                        <td>{item.lodging === "yes" ? "✓ Yes" : "No"}</td>
                        <td>{item.bus === "yes" ? "✓ Yes" : "No"}</td>
                        <td style={{ maxWidth: "240px" }}>
                          {item.message ? (
                            <span style={{ fontStyle: "italic", color: "var(--color-text-secondary)" }}>
                              &ldquo;{item.message.length > 60 ? item.message.substring(0, 60) + "..." : item.message}&rdquo;
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td style={{ fontSize: "0.78rem", color: "var(--color-text-tertiary)" }}>
                          {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View (< 768px) */}
            <div className={styles.mobileCardsContainer}>
              {filtered.map((item, idx) => {
                const isAttending = item.attending === "yes";
                const dateFormatted = item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : "—";
                return (
                  <div
                    key={item.id || idx}
                    className={styles.attendeeMobileCard}
                    onClick={() => setSelectedAttendee(item)}
                  >
                    {/* Header */}
                    <div className={styles.attendeeMobileHeader}>
                      <div>
                        <h4 className={styles.attendeeName}>
                          {item.firstName} {item.lastName}
                        </h4>
                        {item.phone && (
                          <div style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
                            📞 <a href={`tel:${item.phone}`} className={styles.contactLink}>{item.phone}</a>
                          </div>
                        )}
                        {item.email && (
                          <div style={{ fontSize: "0.78rem", color: "var(--color-text-tertiary)", marginTop: "0.1rem" }}>
                            ✉️ <a href={`mailto:${item.email}`} style={{ color: "inherit", textDecoration: "none" }}>{item.email}</a>
                          </div>
                        )}
                      </div>

                      <span className={`${styles.statusBadge} ${isAttending ? styles.badgeYes : styles.badgeNo}`}>
                        {isAttending ? "ATTENDING" : "DECLINED"}
                      </span>
                    </div>

                    {/* Field Grid */}
                    <div className={styles.fieldGrid}>
                      <div className={styles.fieldItem}>
                        <span className={styles.fieldKey}>Guests</span>
                        <span className={styles.fieldVal}>{item.guests ? `+${item.guests}` : "0 guests"}</span>
                      </div>
                      <div className={styles.fieldItem}>
                        <span className={styles.fieldKey}>Lodging</span>
                        <span className={styles.fieldVal}>{item.lodging === "yes" ? "✓ Requested" : "No"}</span>
                      </div>
                      <div className={styles.fieldItem}>
                        <span className={styles.fieldKey}>Bus Charter</span>
                        <span className={styles.fieldVal}>{item.bus === "yes" ? "✓ Joining" : "No"}</span>
                      </div>
                      <div className={styles.fieldItem}>
                        <span className={styles.fieldKey}>Submitted</span>
                        <span className={styles.fieldVal}>{dateFormatted}</span>
                      </div>
                    </div>

                    {/* Full Tribute Message on Mobile Card */}
                    {item.message && (
                      <div className={styles.tributeBox}>
                        &ldquo;{item.message}&rdquo;
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Attendee Details Modal */}
      <AnimatePresence>
        {selectedAttendee && (
          <div className={styles.modalOverlay} onClick={() => setSelectedAttendee(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.75rem" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--color-text)" }}>
                    {selectedAttendee.firstName} {selectedAttendee.lastName}
                  </h3>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-tertiary)" }}>
                    Submitted {selectedAttendee.submittedAt ? new Date(selectedAttendee.submittedAt).toLocaleString() : "Recently"}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedAttendee(null)}
                  style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "var(--color-text-secondary)" }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-tertiary)", fontWeight: "700" }}>Phone / WhatsApp</label>
                  <p style={{ margin: "0.2rem 0", fontWeight: "600", fontSize: "0.95rem" }}>
                    <a href={`tel:${selectedAttendee.phone}`} style={{ color: "var(--color-accent)", textDecoration: "none" }}>
                      {selectedAttendee.phone || "—"}
                    </a>
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-tertiary)", fontWeight: "700" }}>Email</label>
                  <p style={{ margin: "0.2rem 0", fontWeight: "600", fontSize: "0.95rem" }}>
                    {selectedAttendee.email ? (
                      <a href={`mailto:${selectedAttendee.email}`} style={{ color: "var(--color-accent)", textDecoration: "none" }}>
                        {selectedAttendee.email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-tertiary)", fontWeight: "700" }}>Attendance</label>
                  <p style={{ margin: "0.2rem 0", fontWeight: "600", fontSize: "0.95rem" }}>
                    {selectedAttendee.attending === "yes" ? "✓ Attending Burial" : "Cannot Attend"}
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-tertiary)", fontWeight: "700" }}>Additional Guests</label>
                  <p style={{ margin: "0.2rem 0", fontWeight: "600", fontSize: "0.95rem" }}>{selectedAttendee.guests || "0"}</p>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-tertiary)", fontWeight: "700" }}>Accommodation Needed?</label>
                  <p style={{ margin: "0.2rem 0", fontWeight: "600", fontSize: "0.95rem" }}>{selectedAttendee.lodging === "yes" ? "Yes, requested lodging" : "No"}</p>
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-tertiary)", fontWeight: "700" }}>Bus Charter Transport?</label>
                  <p style={{ margin: "0.2rem 0", fontWeight: "600", fontSize: "0.95rem" }}>{selectedAttendee.bus === "yes" ? "Yes, joining bus charter" : "No"}</p>
                </div>
              </div>

              {selectedAttendee.message && (
                <div style={{ marginTop: "1rem" }}>
                  <label style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-tertiary)", fontWeight: "700" }}>Tribute / Condolence Message</label>
                  <div className={styles.tributeBox} style={{ marginTop: "0.4rem" }}>
                    &ldquo;{selectedAttendee.message}&rdquo;
                  </div>
                </div>
              )}

              <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setSelectedAttendee(null)} className="btn btn-secondary">
                  Close Detail View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
