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
    desc: "Pursued higher education with scholarly distinction, ultimately earning a PhD. His intellectual depth and commitment to research opened doors to high-level public service and mentorship.",
    icon: "🎓",
  },
  {
    year: "1990s",
    title: "Fellowship & National Leadership",
    desc: "Recognized as a Fellow of the Nigerian Institute of Management (FNIM) for stellar administrative acumen, public sector management, and institutional governance.",
    icon: "🏛️",
  },
  {
    year: "2000s",
    title: "National Honours & Chieftaincy",
    subtitle: "MFR · NPOM · Obanze Akoji",
    desc: "Conferred with Member of the Order of the Federal Republic (MFR) and National Productivity Order of Merit (NPOM) by the Federal Government of Nigeria. Installed as the traditional Obanze Akoji of Ehime Mbano.",
    icon: "👑",
  },
  {
    year: "2010s – 2026",
    title: "Knight of St. Mulumba & Eternal Legacy",
    subtitle: "KSM · Community Pillar",
    desc: "A devoted Knight of St. Mulumba (KSM). Spent his later years dedicated to family, philanthropy, church leadership, and community development before his peaceful transition to eternal glory.",
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
              key={item.year}
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
