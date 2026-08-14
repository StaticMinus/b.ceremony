"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#citation", label: "Official Citation" },
    { href: "#milestones", label: "Milestones" },
    { href: "#gallery", label: "Gallery" },
    { href: "#programme", label: "Programme" },
    { href: "#support", label: "Funeral Support" },
    { href: "#rsvp", label: "RSVP" },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.headerContainer}>
        {/* Brand Logo / Monogram */}
        <Link href="/" className={styles.headerBrand}>
          <span className={styles.headerCrest}>👑</span>
          <div className={styles.headerTitleGroup}>
            <span className={styles.headerName}>HIGH CHIEF R. O. EGBULE</span>
            <span className={styles.headerSubtitle}>1949 — 2026</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.headerNav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.headerNavLink}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className={styles.headerActions}>
          <ThemeToggle />
          <button
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileNavDrawer}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
