"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "../page.module.css";

const TIMELINE_DATA = [
  {
    year: "1949",
    title: "Ancestral Lineage & Upbringing",
    subtitle: "Umunakanu Owerre, Ehime Mbano",
    desc: "Born into the revered family of Nze Egbule Ogbuji ('Ogbakwuru Oluo') of Umuezeala Ogbuji, Umuezealaji, Umuezealaihu in Umunakanu Owerre Autonomous Community, Ehime-Mbano LGA, Imo State.",
    icon: "🌅",
  },
  {
    year: "1971 – 1978",
    title: "Academic Distinction & Economics Degree",
    subtitle: "UNN B.Sc. Hons (2nd Class Upper)",
    desc: "Senior Prefect at Pater Noster Secondary (Division 1 WASC 1971, Best Student Award). Earned London GCE (1972) and graduated with Second Class Honours (Upper Division) in Economics from University of Nigeria, Nsukka (1978).",
    icon: "🎓",
  },
  {
    year: "1978 – 2009",
    title: "Federal Public Service Genesis & NSIWC Service",
    subtitle: "Public Sector Architecture & Commission Leadership",
    desc: "Joined Federal Public Service in 1978 on Grade Level 08. In 1992, became a pioneer senior officer of the National Salaries, Incomes and Wages Commission (NSIWC), formulating its structural architecture and organogram ending as the Secretary to the Commission where he retired in 2009.",
    icon: "🏛️",
  },
  {
    year: "1990 – 2010",
    title: "Post-Graduate Research & Professional Fellowships",
    subtitle: "UNILAG M.Sc. · Ph.D. · FNIM",
    desc: "Earned M.Sc. in Industrial Relations & Personnel Management (UNILAG 1990) and Ph.D. in Management (2010). Conferred as Fellow of the Nigerian Institute of Management (FNIM) and Member of the Order of the Federal Republic (MFR).",
    icon: "📚",
  },
  {
    year: "2009 – 2019",
    title: "Executive Chairman of NSIWC",
    subtitle: "Decennial Presidential Appointment",
    desc: "Appointed Executive Chairman of the National Salaries, Incomes and Wages Commission in Aug. 2009 and served for a decade under 3 Presidents. Led national minimum wage committees (2009, 2018, 2019), wage relativity panels, and salary revisions across major federal agencies. Exited gloriously.",
    icon: "⚖️",
  },
  {
    year: "Lifetime Legacy",
    title: "High Chieftaincy, Knighthood & Humanitarian Legacy",
    subtitle: "Obanze Akoji · KSM · Lifetime of Humanitarianism",
    desc: "Bagged the prestigious Obanze Akoji of Ehime Mbano traditional title alongside other traditional titles. Devoted 40+ years to placing hundreds of youths across federal ministries, agencies as well as the defense forces. A 4th Degree Knight of St. Mulumba (KSM) and Jerusalem Pilgrim (JP).",
    icon: "👑",
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
