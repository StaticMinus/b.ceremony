"use client";

import styles from "./page.module.css";

import FadeIn from "./components/FadeIn";
import TextReveal from "./components/TextReveal";
import AnimatedCounter from "./components/AnimatedCounter";
import RSVPForm from "./components/RSVPForm";
import MagneticButton from "./components/MagneticButton";
import ScrollTimeline from "./components/ScrollTimeline";
import ParallaxGallery from "./components/ParallaxGallery";
import ExtendedDossier from "./components/ExtendedDossier";
import FuneralSupport from "./components/FuneralSupport";
import Header from "./components/Header";
import BackgroundMesh from "./components/BackgroundMesh";

/* 
 * TASTE-SKILL DESIGN READ:
 * "Regal Editorial Memorial and Celebration of Life for High Chief Richard Onwuka Egbule
 * (PhD, MFR, FNIM, KSM), Obanze Akoji of Ehime Mbano. Clean parchment light mode default with dark mode toggle,
 * Cinzel typography, uncropped portrait presentation, and zero scroll gaps."
 */

const STATS = [
  { value: 77, suffix: "", label: "Years of Grace" },
  { value: 40, suffix: "+", label: "Years of Public Service" },
  { value: 10, suffix: " Years", label: "as Executive Chairman" },
  { value: 1, suffix: "", label: "Extraordinary Legacy" },
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
    <main style={{ position: "relative" }}>
      {/* Animated Ambient Mesh Background */}
      <BackgroundMesh />

      {/* Sticky Glassmorphic Header */}
      <Header />

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
                    alt="High Chief Richard Onwuka Egbule"
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
              HIGH CHIEF RICHARD ONWUKA EGBULE
            </TextReveal>

            <FadeIn delay={0.55}>
              <p className={styles.heroHonours}>
                (PhD, MFR, FNIM, KSM)
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
                <a href="#citation" className="btn btn-primary">
                  Official Citation
                </a>
                <a href="#programme" className="btn btn-secondary">
                  Burial Programme
                </a>
                <a href="#support" className="btn btn-secondary">
                  Funeral Support
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
              — The Egbule Family Tribute
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* REDESIGNED LUXURY BIOGRAPHY SECTION                         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section style={{ paddingBlock: "var(--space-2xl)" }}>
        <div className="container-wide">
          <FadeIn direction="up" scale blur>
            <div className={styles.biographyCardWrapper}>
              <div className={styles.biographyGrid}>
                {/* Portrait Frame with Floating Pill Badge */}
                <div className={styles.biographyMosaicContainer}>
                  <div className={styles.biographyMosaicMain}>
                    <img
                      src="/executive_portrait.jpg"
                      alt="High Chief Richard Onwuka Egbule Executive Portrait"
                      className={styles.biographyImgMain}
                    />
                  </div>

                  {/* Clean Floating Achievement Pill Badge */}
                  <div className={styles.biographyMosaicBadge}>
                    <span className={styles.biographyBadgeIcon}>🏛️</span>
                    <div className={styles.biographyBadgeText}>
                      <span className={styles.biographyBadgeTitle}>
                        10 YEARS AS EXECUTIVE CHAIRMAN
                      </span>
                      <span className={styles.biographyBadgeSub}>
                        National Salaries, Incomes and Wages Commission (2009–2019)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Biography Text & Feature Cards */}
                <div className={styles.biographyTextContent}>
                  <span className="caption">A Legacy of Honor</span>

                  <h2 className={styles.biographyHeadline}>
                    Statesman, Philanthropist & Executive Leader
                  </h2>

                  <p className={styles.biographySubhead}>
                    High Chief Richard Onwuka Egbule <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>(PhD, MFR, FNIM, KSM)</span>
                  </p>

                  <div className={styles.biographyFeatureGrid}>
                    <div className={styles.biographyFeatureItem}>
                      <div className={styles.biographyFeatureIcon}>📜</div>
                      <div className={styles.biographyFeatureText}>
                        <h4>Public Sector Governance & Wage Policy</h4>
                        <p>
                          Served 10 years as <strong>Executive Chairman of the National Salaries, Incomes and Wages Commission (2009–2019)</strong>, formulating national wage structures (HAPSS, HATISS, HAFSS) and leading presidential minimum wage committees.
                        </p>
                      </div>
                    </div>

                    <div className={styles.biographyFeatureItem}>
                      <div className={styles.biographyFeatureIcon}>🎓</div>
                      <div className={styles.biographyFeatureText}>
                        <h4>Academic Mastery & Professional Honours</h4>
                        <p>
                          B.Sc. Hons in Economics (UNN 1978, 2nd Class Upper), M.Sc. (UNILAG 1990), and Ph.D. in Management (2010). Conferred as Member of the Order of the Federal Republic (<strong>MFR</strong>) and Fellow of the Nigerian Institute of Management (<strong>FNIM</strong>).
                        </p>
                      </div>
                    </div>

                    <div className={styles.biographyFeatureItem}>
                      <div className={styles.biographyFeatureIcon}>👑</div>
                      <div className={styles.biographyFeatureText}>
                        <h4>Traditional Leadership & Youth Empowerment</h4>
                        <p>
                          Installed as <strong>Obanze Akoji of Ehime Mbano</strong> alongside four other traditional chieftaincy titles. Devoted over 40 years to mentoring and placing hundreds of youths across federal ministries and defense forces.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* OFFICIAL EXTENDED DOSSIER                                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <ExtendedDossier />

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
      {/* CREATIVE PARALLAX SCROLL GALLERY                           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className={styles.gallerySection} id="gallery">
        <div className="container-wide">
          <FadeIn>
            <div className={styles.sectionHeader}>
              <span className="caption">Interactive Memories</span>
              <h2 className="headline">Photo Gallery</h2>
              <p className="body text-secondary" style={{ marginTop: "0.5rem" }}>
                Experience life moments through scroll-triggered depth & interactive filters. Click any photo to expand.
              </p>
              <div className={styles.sectionDivider} />
            </div>
          </FadeIn>

          <ParallaxGallery />
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
      {/* FUNERAL SUPPORT & FINANCIAL TRIBUTES                       */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <FuneralSupport />

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
