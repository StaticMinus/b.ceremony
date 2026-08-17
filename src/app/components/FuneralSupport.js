"use client";

import { useState } from "react";
import styles from "../page.module.css";
import FadeIn from "./FadeIn";

export default function FuneralSupport() {
  const [copied, setCopied] = useState(false);

  const accountInfo = {
    bank: "Keystone bank",
    name: "Meka Obiamaka Anthony",
    number: "6020626163",
  };

  function handleCopy() {
    navigator.clipboard.writeText(accountInfo.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section className={styles.funeralSupportSection} id="support">
      <div className="container">
        <FadeIn>
          <div className={styles.sectionHeader}>
            <span className="caption">Financial Tributes</span>
            <h2 className="headline">Funeral Support</h2>
            <p className="body text-secondary" style={{ marginTop: "0.5rem" }}>
              For family, friends, and well-wishers who wish to contribute towards the burial arrangements and support the family.
            </p>
            <div className={styles.sectionDivider} />
          </div>
        </FadeIn>

        <FadeIn delay={0.15} scale blur>
          <div className={styles.supportCard}>
            <div className={styles.supportHeader}>
              <span className={styles.supportBankBadge}>🏦 {accountInfo.bank}</span>
              <span className={styles.supportTypeTag}>OFFICIAL BURIAL ACCOUNT</span>
            </div>

            <div className={styles.supportCardBody}>
              <div className={styles.supportField}>
                <span className={styles.supportFieldLabel}>ACCOUNT NAME</span>
                <p className={styles.supportFieldValueName}>{accountInfo.name}</p>
              </div>

              <div className={styles.supportField}>
                <span className={styles.supportFieldLabel}>ACCOUNT NUMBER</span>
                <div className={styles.supportNumberGroup}>
                  <span className={styles.supportFieldValueNumber}>{accountInfo.number}</span>
                  <button
                    onClick={handleCopy}
                    className={`${styles.copyButton} ${copied ? styles.copyButtonActive : ""}`}
                    aria-label="Copy Account Number"
                  >
                    {copied ? "✓ Copied" : "📋 Copy Number"}
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.supportCardFooter}>
              <p>The Egbule family extends heartfelt gratitude for your generous support and prayers.</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
