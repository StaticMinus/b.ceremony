"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "../page.module.css";

const TIMELINE_DATA = [
  {
    year: "1949",
    title: "Birth & Early Foundations",
    subtitle: "Umuezeala-ihu, Ehime Mbano",
    desc: "Born into a noble family in Umuezeala-ihu, Umunakanu-Owerre, Ehime Mbano L.G.A, Imo State. Raised with deep Christian faith and Igbo cultural values that laid the foundation for a lifetime of integrity.",
    icon: "🌅",
  },
  {
    year: "1970s – 1980s",
    title: "Academic & Intellectual Mastery",
    subtitle: "Doctorate Degree (PhD)",
    desc: "Pursued higher education with scholarly distinction, ultimately earning his PhD. His intellectual depth and commitment to research opened doors to high-level public service and national governance.",
    icon: "🎓",
  },
  {
    year: "1990s",
    title: "Fellowship & Professional Distinction",
    subtitle: "FNIM",
    desc: "Recognized as a Fellow of the Nigerian Institute of Management (FNIM) for stellar administrative acumen, public sector governance, and executive management leadership.",
    icon: "🏛️",
  },
  {
    year: "2009 – 2019",
    title: "Executive Chairman",
    subtitle: "National Salaries, Incomes & Wages Commission",
    desc: "Appointed and served as Executive Chairman of the National Salaries, Incomes and Wages Commission from 2009 to 2019, steering national wage policy, compensation reforms, and public service wage equity.",
    icon: "⚖️",
  },
  {
    year: "National Honours & Chieftaincy",
    title: "MFR · NPOM · Traditional Titles",
    subtitle: "Obanze Akoji & 3 Traditional Titles",
    desc: "Conferred with Member of the Order of the Federal Republic (MFR) and National Productivity Order of Merit (NPOM). Installed as the Obanze Akoji of Ehime Mbano, along with three other traditional chieftaincy titles.",
    icon: "👑",
  },
  {
    year: "2010s – 2026",
    title: "Knight of St. Mulumba & Philanthropic Legacy",
    subtitle: "KSM (4th Degree)",
    desc: "A devoted 4th Degree Knight of St. Mulumba (KSM). Dedicated his life to church leadership, humanitarian philanthropy, and community upliftment before his peaceful transition to eternal glory.",
    icon: "✝️",
  },
];

export default function ScrollTimeline() {
  const containerRef = useRef(null);

  /* Scroll progress driving the central vertical line */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <div ref={containerRef} className={styles.scrollTimelineWrapper}>
      {/* Central Progress Line */}
      <div className={styles.timelineCentralTrack}>
        <motion.div
          className={styles.timelineProgressLine}
          style={{ height: lineHeight }}
        />
      </div>

      {/* Timeline Items */}
      <div className={styles.timelineNodesList}>
        {TIMELINE_DATA.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={item.year + item.title}
              className={`${styles.timelineRow} ${
                isEven ? styles.timelineRowLeft : styles.timelineRowRight
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Card Container */}
              <div className={styles.timelineCardBox}>
                <div className={styles.timelineCardInner}>
                  <div className={styles.timelineCardHeader}>
                    <span className={styles.timelineIcon}>{item.icon}</span>
                    <span className={styles.timelineYearBadge}>{item.year}</span>
                  </div>

                  <h3 className={styles.timelineCardTitle}>{item.title}</h3>
                  {item.subtitle && (
                    <p className={styles.timelineCardSubtitle}>{item.subtitle}</p>
                  )}

                  <p className={styles.timelineCardDesc}>{item.desc}</p>
                </div>
              </div>

              {/* Node Marker Dot */}
              <div className={styles.timelineNodeMarker}>
                <div className={styles.timelineNodeDot} />
              </div>

              {/* Spacer for 2-column alignment */}
              <div className={styles.timelineSpacer} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
