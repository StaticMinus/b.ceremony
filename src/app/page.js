"use client";

import styles from "./page.module.css";

import FadeIn from "./components/FadeIn";
import TextReveal from "./components/TextReveal";
import AnimatedCounter from "./components/AnimatedCounter";
import TiltCard from "./components/TiltCard";
import RSVPForm from "./components/RSVPForm";
import MagneticButton from "./components/MagneticButton";
import ScrollTimeline from "./components/ScrollTimeline";

/* 
 * TASTE-SKILL DESIGN READ:
 * "Regal Editorial Memorial and Celebration of Life for High Chief Sir Richard O. Egbule
 * (KSM, PHD, FNIM, MFR, NPOM), Obanze Akoji of Ehime Mbano. Clean parchment light mode default with dark mode toggle,
 * Cinzel typography, uncropped portrait presentation, and zero scroll gaps."
 */

const STATS = [
  { value: 77, suffix: "", label: "Years of Grace" },
  { value: 3, suffix: "", label: "Generations Inspired" },
  { value: 40, suffix: "+", label: "Years of Service" },
  { value: 1, suffix: "", label: "Extraordinary Legacy" },
];

const GALLERY_ITEMS = [
  {
    src: "/portrait.jpg",
    title: "Obanze Akoji of Ehime Mbano",
    desc: "Principal Chieftaincy Title (plus 3 other traditional titles)",
  },
  {
    src: "/corporate_portrait_hd.png",
    title: "Distinguished Corporate Leadership",
    desc: "Executive Excellence & Public Policy Statesman",
  },
  {
    src: "/executive_portrait.jpg",
    title: "Executive Chairman (2009–2019)",
    desc: "National Salaries, Incomes and Wages Commission",
  },
  {
    src: "/ksm_ceremonial.jpg",
    title: "Knight of St. Mulumba (KSM)",
    desc: "4th Degree Ceremonial Honor & Faith Leadership",
  },
  {
    src: "/official_standing.jpg",
    title: "Official State Duties",
    desc: "National Public Service & Official State Ceremonies",
  },
  {
    src: "/father_son_car_selfie.png",
    title: "Father & Son Journey",
    desc: "Cherished Moments with Chief Dr. Daniel Egbule",
  },
  {
    src: "/family_gathering_1.jpg",
    title: "Family Unity & Generations",
    desc: "Surrounded by Children, Grandchildren & Loved Ones",
  },
  {
    src: "/family_gathering_2.jpg",
    title: "Family Celebration",
    desc: "Cherished Family Moments & Generations of Joy",
  },
  {
    src: "/family_father_son.jpg",
    title: "Father & Son Fellowship",
    desc: "Warm Fellowship with Chief Dr. Daniel Egbule",
  },
  {
    src: "/family_granddaughter.jpg",
    title: "Grandfather's Love",
    desc: "Precious Moments with Grandchildren",
  },
];

const BURIAL_EVENTS = [
  {
    date: "OCTOBER 23RD, 2026",
    events: [
      {
        time: "5:00 PM",
        title: "Service of Songs",
        location: "Arete's Place, 12 Takum Close, Area 11, Garki, Abuja",
      },
    ],
  },
  {
    date: "NOVEMBER 20TH, 2026",
    events: [
      {
        time: "",
        title: "Requiem Mass",
        location: "Our Lady Queen of Nigeria Pro-Cathedral, Area 3 Garki, Abuja",
      },
    ],
  },
  {
    date: "DECEMBER 16TH, 2026",
    events: [
      {
        time: "",
        title: "Arrival of Body",
        location: "Morgue to his hometown Umuezeala-ihu, Umunakanu-Owerre, Ehime Mbano L.G.A, Imo State",
      },
      {
        time: "Evening",
        title: "Wake-Keep",
        location: "At his residence",
      },
    ],
  },
  {
    date: "DECEMBER 17TH, 2026",
    events: [
      {
        time: "8:00 AM",
        title: "Lying in State",
        location: "At his compound",
      },
      {
        time: "11:00 AM",
        title: "Funeral Mass",
        location: "St. Theresa's Catholic Church, Umunakanu",
      },
      {
        time: "1:00 PM",
        title: "Interment & Reception",
        location: "Interment followed by reception at the School Field",
      },
    ],
  },
  {
    date: "DECEMBER 20TH, 2026",
    events: [
      {
        time: "9:00 AM",
        title: "Thanksgiving / Outing Service",
        location: "St. Theresa's Catholic Church, Umunakanu",
      },
    ],
  },
];

export default function Home() {
  return (
    <main>
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                               */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} />

        <div className={styles.heroGrid}>
          {/* Uncropped Portrait Frame */}
          <FadeIn direction="left" delay={0.15} scale blur>
            <div className={styles.heroPortraitContainer}>
              <div className={styles.heroPortraitFrame}>
                <div className={styles.heroPortraitInner}>
                  <img
                    src="/portrait.jpg"
                    alt="High Chief Sir Richard O. Egbule"
                    className={styles.heroPortraitImg}
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Hero Information */}
          <div className={styles.heroContent}>
            <FadeIn delay={0.1}>
              <span className={styles.heroTag}>
                Celebration Of a Worthy Life
              </span>
            </FadeIn>

            <TextReveal
              className={styles.heroTitle}
              type="word"
              delay={0.25}
              stagger={0.05}
            >
              HIGH CHIEF (SIR) RICHARD O. EGBULE
            </TextReveal>

            <FadeIn delay={0.55}>
              <p className={styles.heroHonours}>
                (KSM, PHD, FNIM, MFR, NPOM)
              </p>
            </FadeIn>

            <FadeIn delay={0.7}>
              <p className={styles.heroTraditionalTitle}>
                OBANZE AKOJI OF EHIME MBANO
              </p>
            </FadeIn>

            <FadeIn delay={0.85}>
              <p className={styles.heroDates}>
                1949 — 2026
              </p>
            </FadeIn>

            <FadeIn delay={0.95}>
              <p className={styles.heroDescription}>
                With gratitude to God for a life well lived, the family announces the transition to Eternal Glory of our Father, Father-in-law, Grandfather, Uncle, Benefactor, and National Hero.
              </p>
            </FadeIn>

            <FadeIn delay={1.1}>
              <div className={styles.heroActions}>
                <a href="#programme" className="btn btn-primary">
                  Burial Programme
                </a>
                <a href="#rsvp" className="btn btn-secondary">
                  Confirm RSVP & Travel
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* QUOTE BANNER                                               */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className={styles.quoteBanner}>
        <div className="container">
          <FadeIn direction="up">
            <p className={styles.quoteBannerText}>
              &ldquo;A lifetime of humanitarian philanthropy will forever remain his indelible legacy. We miss you dearly, Dad&rdquo;
            </p>
            <p className={`caption text-accent ${styles.quoteBannerAuthor}`}>
              — The Egbule Family
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* LEGACY & EXECUTIVE BIOGRAPHY                               */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section>
        <div className="container-wide">
          <div className={styles.biographyGrid}>
            <FadeIn direction="left" scale>
              <div className={styles.biographyImageWrapper}>
                <img
                  src="/executive_portrait.jpg"
                  alt="High Chief Sir Richard O. Egbule Executive Portrait"
                  className={styles.biographyImg}
                />
              </div>
            </FadeIn>

            <div className={styles.biographyText}>
              <FadeIn direction="right" delay={0.1}>
                <span className="caption">A Legacy of Honor</span>
              </FadeIn>

              <TextReveal className="headline" delay={0.2} type="word">
                Statesman, Philanthropist & Executive Leader
              </TextReveal>

              <FadeIn direction="right" delay={0.35}>
                <p className="body text-secondary">
                  High Chief Sir Richard O. Egbule was a distinguished son of Umuezeala-ihu, Umunakanu-Owerre in Ehime Mbano Local Government Area, Imo State. A patriot of extraordinary caliber, he served as the <strong>Executive Chairman of the National Salaries, Incomes and Wages Commission from 2009 to 2019</strong>, shaping national wage policy, public sector compensation standards, and institutional equity across Nigeria.
                </p>
              </FadeIn>

              <FadeIn direction="right" delay={0.45}>
                <p className="body text-secondary">
                  His meritorious service to the nation was recognized with national honors: Member of the Order of the Federal Republic (MFR) and National Productivity Order of Merit (NPOM). A Fellow of the Nigerian Institute of Management (FNIM) and a 4th Degree Knight of St. Mulumba (KSM), he combined academic excellence (PhD) with unyielding Christian faith, wisdom, and leadership.
                </p>
              </FadeIn>

              <FadeIn direction="right" delay={0.55}>
                <p className="body text-secondary">
                  In addition to his principal traditional title as the <strong>Obanze Akoji of Ehime Mbano</strong>, High Chief Sir Richard O. Egbule held <strong>three other traditional chieftaincy titles</strong>, bestowed upon him in honor of his vast humanitarian philanthropy, community development, and wisdom.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* STATS & IMPACT                                             */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section style={{ paddingBlock: "var(--space-2xl)" }}>
        <div className="container-wide">
          <div className={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08} scale>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={2.2}
                    />
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SCROLL-TRIGGERED LIFE MILESTONES                           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="milestones">
        <div className="container-wide">
          <FadeIn>
            <div className={styles.sectionHeader}>
              <span className="caption">Life Milestones</span>
              <h2 className="headline">A Journey of Honor</h2>
              <p className="body text-secondary" style={{ marginTop: "0.5rem" }}>
                Scroll through the transformative chapters of his distinguished life.
              </p>
              <div className={styles.sectionDivider} />
            </div>
          </FadeIn>

          <ScrollTimeline />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MEMORY & PHOTO GALLERY                                      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className={styles.gallerySection}>
        <div className="container-wide">
          <FadeIn>
            <div className={styles.sectionHeader}>
              <span className="caption">Memories & Tribute</span>
              <h2 className="headline">Photo Gallery</h2>
              <p className="body text-secondary" style={{ marginTop: "0.5rem" }}>
                Celebrating moments of family, chieftaincy, public service, and faith.
              </p>
              <div className={styles.sectionDivider} />
            </div>
          </FadeIn>

          <div className={styles.galleryGrid}>
            {GALLERY_ITEMS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08} scale>
                <TiltCard className={styles.galleryCard} maxTilt={5}>
                  <div className={styles.galleryImagePlaceholder} style={{ background: "#640d14", padding: 0, height: "240px" }}>
                    <img
                      src={item.src}
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
                    />
                  </div>
                  <div className={styles.galleryCaption}>
                    <strong style={{ color: "var(--color-text)", display: "block" }}>{item.title}</strong>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-tertiary)", marginTop: "0.2rem" }}>
                      {item.desc}
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* BURIAL ARRANGEMENT SCHEDULE                                */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className={styles.burialSection} id="programme">
        <div className="container">
          <FadeIn>
            <div className={styles.sectionHeader}>
              <span className="caption">Order of Events</span>
              <h2 className="headline">Burial Arrangement</h2>
              <div className={styles.sectionDivider} />
            </div>
          </FadeIn>

          <div className={styles.burialGrid}>
            {BURIAL_EVENTS.map((day, i) => (
              <FadeIn key={day.date} delay={i * 0.1}>
                <div className={styles.burialCard}>
                  <div className={styles.burialDateBadge}>
                    {day.date}
                  </div>
                  {day.events.map((evt, j) => (
                    <div key={j} className={styles.burialEvent}>
                      <div className={styles.burialTimeTitle}>
                        {evt.time && <span className={styles.burialTime}>{evt.time}</span>}
                        <h4 className={styles.burialTitle}>{evt.title}</h4>
                      </div>
                      {evt.location && (
                        <p className={styles.burialLocation}>
                          <span>📍</span> {evt.location}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* RSVP & ATTENDANCE FORM                                      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="rsvp" style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <FadeIn>
            <div className={styles.sectionHeader}>
              <span className="caption">Ceremony Attendance</span>
              <h2 className="headline">Confirm RSVP & Travel</h2>
              <p className="body text-secondary" style={{ marginTop: "0.5rem" }}>
                Kindly confirm your attendance to help the family arrange logistics, transport, and lodging.
              </p>
              <div className={styles.sectionDivider} />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} scale blur>
            <div className={`glass-card ${styles.rsvpCard}`}>
              <RSVPForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FAMILY SIGN-OFF & FOOTER                                   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <footer className={styles.footer}>
        <div className="container">
          <FadeIn direction="none">
            <div className={styles.footerFamilySign}>
              <p className={styles.footerSignTitle}>Signed for the Family</p>
              <p className={styles.footerSignName}>
                CHIEF DR. DANIEL EGBULE
              </p>
              <p className="caption" style={{ color: "var(--color-text-tertiary)", marginTop: "0.2rem" }}>
                (Ozodibenna 1 of Umunakanu)
              </p>
            </div>

            <MagneticButton strength={0.15}>
              <p className={styles.footerRestPeace}>
                MAY HIS GENTLE SOUL REST IN PERFECT PEACE. AMEN.
              </p>
            </MagneticButton>
          </FadeIn>
        </div>
      </footer>
    </main>
  );
}
