"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";

export default function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    attending: "yes",
    guests: "0",
    lodging: "no",
    bus: "no",
    message: "",
  };

  const [form, setForm] = useState(initialForm);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please check your inputs.");
      }

      if (data.entry && typeof window !== "undefined") {
        try {
          const stored = JSON.parse(localStorage.getItem("egbule_rsvp_submissions") || "[]");
          const updated = [data.entry, ...stored.filter((s) => s.id !== data.entry.id)];
          localStorage.setItem("egbule_rsvp_submissions", JSON.stringify(updated));
        } catch (e) {
          console.warn("Could not save backup to localStorage:", e);
        }
      }

      setSubmittedName(`${form.firstName} ${form.lastName}`);
      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          className={styles.rsvpSuccess}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", padding: "1.5rem 1rem" }}
        >
          <div className={styles.rsvpSuccessIcon} style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>✓</div>
          <h3 className="title">Response Received</h3>
          <p className="body text-secondary" style={{ marginTop: "0.75rem", fontSize: "1.05rem" }}>
            Thank you, <strong>{submittedName}</strong>. Your response has been recorded. The Egbule family deeply appreciates your prayers, attendance confirmation, and support during this period.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn btn-secondary"
            style={{ marginTop: "1.5rem" }}
          >
            Submit Another RSVP Response
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          className={styles.rsvpForm}
          onSubmit={handleSubmit}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          {/* Name Row */}
          <div className={styles.rsvpRow}>
            <div className="input-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="Chief / Dr. / Mr. / Mrs."
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Your Surname"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contact Details: Phone & Email */}
          <div className={styles.rsvpRow}>
            <div className="input-group">
              <label htmlFor="phone">Phone / WhatsApp *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+234..."
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address (Optional)</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Attendance & Guests */}
          <div className={styles.rsvpRow}>
            <div className="input-group">
              <label htmlFor="attending">Will You Attend?</label>
              <select
                id="attending"
                name="attending"
                value={form.attending}
                onChange={handleChange}
              >
                <option value="yes">Yes, I will attend</option>
                <option value="no">No, I cannot attend</option>
                <option value="maybe">Not sure yet</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="guests">Number of Additional Guests</label>
              <select
                id="guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
              >
                <option value="0">Just me (0 guests)</option>
                <option value="1">+1 guest</option>
                <option value="2">+2 guests</option>
                <option value="3">+3 guests</option>
                <option value="4">+4 or more</option>
              </select>
            </div>
          </div>

          {/* Accommodation & Bus Transport */}
          <div className={styles.rsvpRow}>
            <div className="input-group">
              <label htmlFor="lodging">Need Accommodation / Lodging?</label>
              <select
                id="lodging"
                name="lodging"
                value={form.lodging}
                onChange={handleChange}
              >
                <option value="no">No, I have personal arrangements</option>
                <option value="yes">Yes, please assist with lodging</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="bus">Following the Bus Charter?</label>
              <select
                id="bus"
                name="bus"
                value={form.bus}
                onChange={handleChange}
              >
                <option value="no">No, private transport</option>
                <option value="yes">Yes, I will join the bus transport</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="input-group">
            <label htmlFor="message">Tribute / Message to Family (Optional)</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Share a tribute or message of condolence to the family..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div style={{ padding: "0.75rem 1rem", background: "rgba(220, 38, 38, 0.1)", border: "1px solid #DC2626", borderRadius: "8px", color: "#DC2626", fontSize: "0.875rem" }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-primary ${styles.rsvpSubmit}`}
            disabled={submitting}
          >
            {submitting ? "Submitting Response..." : "Confirm Attendance & Submit"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
