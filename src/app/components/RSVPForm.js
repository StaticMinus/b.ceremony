"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";

export default function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    attending: "yes",
    guests: "0",
    lodging: "no",
    bus: "no",
    message: "",
  });

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

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
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
        >
          <div className={styles.rsvpSuccessIcon}>✓</div>
          <h3 className="title">Response Received</h3>
          <p className="body text-secondary" style={{ marginTop: "0.75rem" }}>
            Thank you for confirming. The Egbule family appreciates your prayers and support during this period.
          </p>
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
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="Chief / Dr. / Mr."
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
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

          {/* Email & Phone */}
          <div className={styles.rsvpRow}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your.email@domain.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone / WhatsApp</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+234..."
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Attending + Guests */}
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
              <label htmlFor="guests">Number of Guests</label>
              <select
                id="guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
              >
                <option value="0">Just me</option>
                <option value="1">+1 guest</option>
                <option value="2">+2 guests</option>
                <option value="3">+3 guests</option>
                <option value="4">+4 or more</option>
              </select>
            </div>
          </div>

          {/* Lodging + Bus */}
          <div className={styles.rsvpRow}>
            <div className="input-group">
              <label htmlFor="lodging">Need Accommodation / Lodging?</label>
              <select
                id="lodging"
                name="lodging"
                value={form.lodging}
                onChange={handleChange}
              >
                <option value="no">No, I have arrangements</option>
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
              placeholder="Share a tribute or message of condolence..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          {error && <p style={{ color: "#DC2626", fontSize: "0.875rem" }}>{error}</p>}

          <button
            type="submit"
            className={`btn btn-primary ${styles.rsvpSubmit}`}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Confirm Attendance & Submit"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
