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
 * "Reading this as: Regal Editorial Memorial and Celebration of Life for High Chief Sir Dr. Richard O. Egbule
 * (MFR, NPOM, KSM), Obanze Akoji of Ehime Mbano. Clean parchment light mode default with dark mode toggle,
 * Cinzel typography, uncropped portrait presentation, and zero scroll gaps."
 */

const STATS = [
  { value: 77, suffix: "", label: "Years of Grace" },
  { value: 3, suffix: "", label: "Generations Inspired" },
  { value: 40, suffix: "+", label: "Years of Service" },
  { value: 1, suffix: "", label: "Extraordinary Legacy" },
];

const GALLERY_PLACEHOLDERS = [
  { title: "Chieftaincy Installation", desc: "Obanze Akoji of Ehime Mbano" },
  { title: "National Honours Ceremony", desc: "MFR & NPOM Awards" },
  { title: "Academic Accomplishments", desc: "PhD Conferment & Fellowship" },
  { title: "Knights of St. Mulumba", desc: "Church & Faith Leadership" },
  { title: "Family Moments", desc: "Generations of Love & Unity" },
  { title: "Community Development", desc: "Service to Ehime Mbano" },
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
                    alt="High Chief Sir Dr. Richard O. Egbule"
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
              HIGH CHIEF (SIR) DR. RICHARD O. EGBULE
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
                With gratitude to God for a life well lived, the family announces the transition to Eternal Glory of our beloved Father, Father-in-law, Grandfather, Uncle, Benefactor, and National Hero.
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
              &ldquo;What we have once enjoyed deeply we can never lose. All that we love deeply becomes a part of us.&rdquo;
            </p>
            <p className={`caption text-accent ${styles.quoteBannerAuthor}`}>
              — The Egbule Family
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* LEGACY & UNCROPPED BIOGRAPHY IMAGE                         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section>
        <div className="container-wide">
          <div className={styles.biographyGrid}>
            <FadeIn direction="left" scale>
              <div className={styles.biographyImageWrapper}>
                <img
                  src="/portrait.jpg"
                  alt="High Chief Sir Dr. Richard O. Egbule portrait"
                  className={styles.biographyImg}
                />
              </div>
            </FadeIn>

            <div className={styles.biographyText}>
              <FadeIn direction="right" delay={0.1}>
                <span className="caption">A Legacy of Honor</span>
              </FadeIn>

              <TextReveal className="headline" delay={0.2} type="word">
                Servant Leader & National Patriot
              </TextReveal>

              <FadeIn direction="right" delay={0.35}>
                <p className="body text-secondary">
                  High Chief Sir Dr. Richard O. Egbule was a distinguished son of Umuezeala-ihu, Umunakanu-Owerre in Ehime Mbano Local Government Area, Imo State. His lifetime of meritorious service earned him national honors: Member of the Order of the Federal Republic (MFR) and the National Productivity Order of Merit (NPOM).
                </p>
              </FadeIn>

              <FadeIn direction="right" delay={0.45}>
                <p className="body text-secondary">
                  A Fellow of the Nigerian Institute of Management (FNIM) and a Knight of St. Mulumba (KSM), he combined academic excellence (PhD) with unyielding faith, administrative wisdom, and traditional leadership as the Obanze Akoji of Ehime Mbano.
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
                Celebrating moments of family, chieftaincy, academic honors, and service.
              </p>
              <div className={styles.sectionDivider} />
            </div>
          </FadeIn>

          <div className={styles.galleryGrid}>
            {GALLERY_PLACEHOLDERS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08} scale>
                <TiltCard className={styles.galleryCard} maxTilt={5}>
                  <div className={styles.galleryImagePlaceholder}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div className={styles.galleryCaption}>
                    <strong>{item.title}</strong>
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
