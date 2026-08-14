"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TributesWall() {
  const [tributes, setTributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchTributes() {
    try {
      setLoading(true);
      const res = await fetch("/api/tributes");
      if (!res.ok) throw new Error("Failed to load tributes");
      const data = await res.json();
      if (data.tributes) {
        setTributes(data.tributes);
      }
    } catch (err) {
      console.error("Error fetching tributes:", err);
      setError("Could not load tributes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTributes();

    // Listen for new RSVP submissions to auto-update the wall
    const handleNewSubmission = () => {
      fetchTributes();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("rsvpSubmitted", handleNewSubmission);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("rsvpSubmitted", handleNewSubmission);
      }
    };
  }, []);

  if (loading && tributes.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--color-text-secondary)" }}>
        <p>Loading tributes and condolences...</p>
      </div>
    );
  }

  if (!loading && tributes.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2.5rem 1rem", background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
        <p style={{ fontStyle: "italic", color: "var(--color-text-secondary)" }}>
          &ldquo;Be the first to leave a tribute or condolence message in the form below.&rdquo;
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBlock: "1.5rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}
      >
        <AnimatePresence>
          {tributes.map((item, idx) => {
            const initials = `${item.firstName?.[0] || ""}${item.lastName?.[0] || ""}`.toUpperCase() || "E";
            const dateStr = item.submittedAt
              ? new Date(item.submittedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "";

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.5rem",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  justify: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top Quote Decoration */}
                <div
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "1rem",
                    fontSize: "3rem",
                    lineHeight: 1,
                    color: "var(--color-accent)",
                    opacity: 0.12,
                    fontFamily: "serif",
                    pointerEvents: "none",
                  }}
                >
                  &ldquo;
                </div>

                <div>
                  {/* Header: Avatar + Info */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--color-accent) 0%, #8B6508 100%)",
                        color: "#FFF",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.95rem",
                        letterSpacing: "0.05em",
                        flexShrink: 0,
                      }}
                    >
                      {initials}
                    </div>

                    <div>
                      <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: "700", color: "var(--color-text)" }}>
                        {item.firstName} {item.lastName}
                      </h4>
                      {dateStr && (
                        <span style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>
                          {dateStr}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message Content */}
                  <p
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                      color: "var(--color-text-secondary)",
                      fontStyle: "italic",
                      margin: 0,
                      wordBreak: "break-word",
                    }}
                  >
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>

                {/* Footer Tag */}
                <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px dashed var(--color-border)", display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>
                  <span>{item.attending === "yes" ? "✓ Attending Burial" : "Condolence Tribute"}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
