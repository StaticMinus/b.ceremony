"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";
import FadeIn from "./FadeIn";

const DOSSIER_SECTIONS = [
  {
    id: "lineage",
    label: "Ancestral Lineage",
    icon: "👑",
    title: "1. Ancestral Lineage & Early Upbringing",
    content: (
      <div className={styles.dossierContentBlock}>
        <p className={styles.dossierLeadText}>
          High Chief Richard Onwuka Egbule, PhD, MFR, FNIM, KSM was born into the deep traditionally-rooted and revered family of <strong>Nze Egbule Ogbuji (&lsquo;Ogbakwuru Oluo&rsquo;)</strong> of Umuezeala Ogbuji, Umuezealaji, Umuezealaihu in <strong>Umunakanu Owerre Autonomous Community</strong>, Ehime-Mbano Local Government Area of Imo State.
        </p>
        <div className={styles.dossierInfoGrid}>
          <div className={styles.dossierInfoCard}>
            <span className={styles.dossierInfoTag}>ANCESTRAL HOME</span>
            <h4>Umunakanu Owerre</h4>
            <p>Ehime-Mbano Local Government Area, Imo State, Nigeria</p>
          </div>
          <div className={styles.dossierInfoCard}>
            <span className={styles.dossierInfoTag}>FAMILY DYNASTY</span>
            <h4>Nze Egbule Ogbuji</h4>
            <p>&lsquo;Ogbakwuru Oluo&rsquo; — Revered Traditional Lineage</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "academics",
    label: "Academic Record",
    icon: "🎓",
    title: "2. Comprehensive Academic Record",
    content: (
      <div className={styles.dossierContentBlock}>
        <h4 className={styles.dossierSubheading}>Primary & Secondary Milestones</h4>
        <ul className={styles.dossierList}>
          <li>
            <strong>Primary Education:</strong> St. Patrick&apos;s (Umuezeala Owerre), St. Michael&apos;s (Umunakanu Ama), Holy Rosary (Umunakanu Owerre), and St. Eugene&apos;s (Aba) — <em>Distinction in First School Leaving Certificate (FSLC).</em>
          </li>
          <li>
            <strong>Secondary Education:</strong> Comprehensive Secondary School, Awo-Omama; Pater Noster Secondary School, Ekwerazu, Mbaise <em>(Senior Prefect, Division One WASC 1971, Best Student Award).</em>
          </li>
          <li>
            <strong>University of London:</strong> General Certificate of Education (GCE), Jan 1972.
          </li>
        </ul>

        <h4 className={styles.dossierSubheading} style={{ marginTop: "1.5rem" }}>
          University Degrees & Post-Graduate Research
        </h4>
        <div className={styles.dossierDegreeCards}>
          <div className={styles.dossierDegreeCard}>
            <div className={styles.degreeYear}>1978</div>
            <div className={styles.degreeDetails}>
              <h4>B.Sc. Hons in Economics</h4>
              <p>University of Nigeria, Nsukka (UNN) — Second Class Honours (Upper Division)</p>
            </div>
          </div>
          <div className={styles.dossierDegreeCard}>
            <div className={styles.degreeYear}>1990</div>
            <div className={styles.degreeDetails}>
              <h4>M.Sc. Industrial Relations & Personnel Management</h4>
              <p>University of Lagos (UNILAG), Akoka, Lagos</p>
            </div>
          </div>
          <div className={styles.dossierDegreeCard}>
            <div className={styles.degreeYear}>2010</div>
            <div className={styles.degreeDetails}>
              <h4>Ph.D. in Management</h4>
              <p>Commonwealth University, Belize</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "service",
    label: "Federal Leadership",
    icon: "🏛️",
    title: "3. Federal Public Service Genesis & NSIWC Service",
    content: (
      <div className={styles.dossierContentBlock}>
        <p className={styles.dossierLeadText}>
          Began federal service in <strong>1978</strong> as Administrative Officer on Grade Level 08 in the Office of the Head of Civil Service of the Federation, advancing through merit to Chief Management Consultant in 1994.
        </p>
        <p className={styles.dossierBodyText}>
          In <strong>1992</strong>, he became a pioneer senior officer of the <strong>National Salaries, Incomes and Wages Commission (NSIWC)</strong>. Collaborating with pioneer Secretary Chief A. O. Okafor, he single-handedly formulated the structural architecture, organogram, and manning levels without retaining external consultants.
        </p>
        <p className={styles.dossierBodyText}>
          Served successively as Acting Head of Compensation Department, Deputy Director (1999), Director of Compensation (Jan 2004), ending as the <strong>Secretary to the Commission where he retired in 2009</strong>, before his landmark appointment by the President, Commander-in-Chief of the Armed Forces, as:
        </p>

        <div className={styles.dossierHighlightBox}>
          <span className={styles.highlightBadge}>DECENNIAL PRESIDENTIAL APPOINTMENT</span>
          <h3>Executive Chairman of NSIWC</h3>
          <p className={styles.highlightDates}>Appointed Executive Chairman of the National Salaries, Incomes and Wages Commission in Aug. 2009 and served for a decade under 3 Presidents. Led national minimum wage committees (2009, 2018, 2019), wage relativity panels, and salary revisions across major federal agencies. Exited gloriously.</p>
        </div>
      </div>
    ),
  },
  {
    id: "wagepolicy",
    label: "National Wage Architecture",
    icon: "⚖️",
    title: "4. National Wage Policy Architecture & Special Committees",
    content: (
      <div className={styles.dossierContentBlock}>
        <h4 className={styles.dossierSubheading}>Major Presidential & Technical Committees Served</h4>
        <div className={styles.dossierCommitteesGrid}>
          <div className={styles.committeeItem}>
            <span className={styles.committeeYear}>2019</span>
            <p>Member/Secretary, Committee on Negotiation of Consequential Adjustment in Salaries from New Minimum Wage.</p>
          </div>
          <div className={styles.committeeItem}>
            <span className={styles.committeeYear}>2019</span>
            <p>Member, Rewane Presidential Advisory Committee on Implementation of New National Minimum Wage.</p>
          </div>
          <div className={styles.committeeItem}>
            <span className={styles.committeeYear}>2018</span>
            <p>Member/Secretary, Tripartite Committee on National Minimum Wage.</p>
          </div>
          <div className={styles.committeeItem}>
            <span className={styles.committeeYear}>2009</span>
            <p>Secretary, Tripartite Committee on National Minimum Wage.</p>
          </div>
          <div className={styles.committeeItem}>
            <span className={styles.committeeYear}>2006–2008</span>
            <p>Member, Committee on Re-negotiations with Staff Unions of Federal Tertiary Institutions (ASUU, etc.).</p>
          </div>
          <div className={styles.committeeItem}>
            <span className={styles.committeeYear}>2004–2006</span>
            <p>Secretary, Presidential Panel on Wages, Salaries and Emolument Relativity.</p>
          </div>
          <div className={styles.committeeItem}>
            <span className={styles.committeeYear}>2004–2005</span>
            <p>Secretary, Presidential Committee on Mortgage Financing.</p>
          </div>
          <div className={styles.committeeItem}>
            <span className={styles.committeeYear}>1999</span>
            <p>Member, Special Committee that curtailed budget deficit from &gt;₦100 Billion to ₦34 Billion.</p>
          </div>
          <div className={styles.committeeItem}>
            <span className={styles.committeeYear}>1986</span>
            <p>Secretary, IMF Loan Debate Sub-Committees (Options, Trade Liberalisation, Petroleum Subsidy Removal).</p>
          </div>
        </div>

        <h4 className={styles.dossierSubheading} style={{ marginTop: "1.5rem" }}>
          Key Federal Agencies & Parastatals Formulated
        </h4>
        <p className={styles.dossierBodyText}>
          Formulated salary revisions for Central Bank of Nigeria (CBN), NNPC, NDIC, SEC, FAAN, NPA, NEPA, NITEL, BPE, NEXIM Bank, PEF, CAC, NICON Insurance, and Nigerian Reinsurance Corporation.
        </p>

        <div className={styles.dossierPillContainer}>
          <span className={styles.salaryStructureTag}>Harmonized Structures Formulated:</span>
          {["HAPSS", "HATISS", "HAFSS", "HAPPSS", "TOPSAL (2000)"].map((st) => (
            <span key={st} className={styles.salaryBadge}>{st}</span>
          ))}
        </div>

        <h4 className={styles.dossierSubheading} style={{ marginTop: "1.5rem" }}>
          International Technical Training & Study Tours
        </h4>
        <div className={styles.dossierToursGrid}>
          <div className={styles.tourCard}>
            <strong>🇬🇧 UK (RIPA)</strong>
            <p>Public Service Reform Strategies (2007) & Management Consultancy (1981)</p>
          </div>
          <div className={styles.tourCard}>
            <strong>🇺🇸 USA (Bureau of Labor Stats)</strong>
            <p>Wage & Salary Measurement, Washington D.C. (1988)</p>
          </div>
          <div className={styles.tourCard}>
            <strong>🇨🇦 Canada (BMC Ottawa)</strong>
            <p>Grading Operations & Pay Research Course (1982)</p>
          </div>
          <div className={styles.tourCard}>
            <strong>🇳🇱 Netherlands</strong>
            <p>6th NDE International Leadership Retreat (2008)</p>
          </div>
          <div className={styles.tourCard}>
            <strong>🇪🇺 Europe</strong>
            <p>Wage policy missions to Sweden, Switzerland & Britain (1993)</p>
          </div>
          <div className={styles.tourCard}>
            <strong>🌏 Asia</strong>
            <p>Compensation study tours to Malaysia & Singapore (1998)</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "community",
    label: "Community & Youth Placements",
    icon: "🤝",
    title: "5. Community Leadership & Youth Employment Placements",
    content: (
      <div className={styles.dossierContentBlock}>
        <h4 className={styles.dossierSubheading}>
          Unbroken Record of Youth Employment Placements (1983 — DATE)
        </h4>
        <p className={styles.dossierLeadText}>
          Devoted over four continuous decades to the employment placement and career mentorship of hundreds of youths and graduates across federal ministries, defense forces, intelligence organs, and commercial regulatory authorities:
        </p>

        <div className={styles.agencyBadgesGrid}>
          {[
            "The Presidency",
            "National Salaries, Incomes & Wages Commission (NSIWC)",
            "Federal Ministry of Health",
            "The Nigeria Police Force",
            "Nigeria Customs Service",
            "The Nigerian Navy & Armed Forces",
            "Nigeria Immigration Service",
            "Nigerian Correctional Service",
            "Nigeria Security and Civil Defence Corps (NSCDC)",
            "Defence Intelligence Agency (DIA)",
            "Economic and Financial Crimes Commission (EFCC)",
            "Independent Corrupt Practices Commission (ICPC)",
            "National Drug Law Enforcement Agency (NDLEA)",
            "Central Bank of Nigeria (CBN)",
            "Federal Inland Revenue Service (FIRS)",
            "Nigerian Maritime Administration and Safety Agency (NIMASA)",
            "National Health Insurance Authority (NHIA)",
            "Federal Road Safety Corps (FRSC)",
            "National Agency for Food and Drug Administration and Control (NAFDAC)",
          ].map((agency) => (
            <span key={agency} className={styles.agencyBadge}>
              🏛️ {agency}
            </span>
          ))}
        </div>

        <h4 className={styles.dossierSubheading} style={{ marginTop: "1.75rem" }}>
          Civic Projects & Student Leadership
        </h4>
        <ul className={styles.dossierList}>
          <li>Built the Modern Civic Hall for Umuezealaihu Village.</li>
          <li>Constructed Classroom Building for Central Primary School, Umunakanu.</li>
          <li>President, Ezealaihu Newbreeds (1970–1974).</li>
          <li>President, Okigwe Students Union (UNN Calabar, 1974–1975).</li>
          <li>President, Mbano Students Union (UNN Nsukka, 1976–1977).</li>
          <li>President Emeritus, Umunakanu Development Union.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "titles",
    label: "Titles & Faith Honors",
    icon: "📜",
    title: "6. Chieftaincy Titles, Christian Faith & Diocesan Recognition",
    content: (
      <div className={styles.dossierContentBlock}>
        <h4 className={styles.dossierSubheading}>Chieftaincy Titles & Traditional Honours</h4>
        <div className={styles.dossierTitlesGrid}>
          <div className={styles.titleCard}>
            <span className={styles.titleRank}>PRINCIPAL TITLE</span>
            <h3>Obanze Akoji of Ehime Mbano</h3>
            <p>Ehime Council of Ndi Eze</p>
          </div>
          <div className={styles.titleCard}>
            <span className={styles.titleRank}>HOMETOWN HONOUR (2001)</span>
            <h3>Oba Nze Akoji 1</h3>
            <p>Umunakanu Autonomous Community</p>
          </div>
          <div className={styles.titleCard}>
            <span className={styles.titleRank}>TRADITIONAL TITLE</span>
            <h3>Aku Fere Mba 1</h3>
            <p>Nnebi-na-Asonye Autonomous Community</p>
          </div>
          <div className={styles.titleCard}>
            <span className={styles.titleRank}>KINGDOM HONOUR</span>
            <h3>Nwanne di na Mba</h3>
            <p>Uburu Autonomous Kingdom</p>
          </div>
          <div className={styles.titleCard}>
            <span className={styles.titleRank}>CAPITAL TERRITORY TITLE</span>
            <h3>Nwadiohamma</h3>
            <p>Abuja Federal Capital Territory</p>
          </div>
        </div>

        <h4 className={styles.dossierSubheading} style={{ marginTop: "1.75rem" }}>
          Christian Faith, Knighthood & Diocesan Recognition
        </h4>
        <ul className={styles.dossierList}>
          <li>
            <strong>Knight of the Order of St. Mulumba (KSM):</strong> Devoted 4th Degree Knight.
          </li>
          <li>
            <strong>Jerusalem Pilgrim (JP):</strong> Honored for holy pilgrimage.
          </li>
          <li>
            <strong>Catholic Men Organization (CMO):</strong> Active Member, Our Lady Queen of Nigeria Pro-Cathedral, Garki, Abuja.
          </li>
          <li>
            <strong>Nkwa Chukwu Kwere & Omere Oha:</strong> St. Theresa&apos;s Catholic Church.
          </li>
          <li>
            <strong>Pillar of the Church:</strong> Catholic Women Organization (CWO), Pro-Cathedral Abuja.
          </li>
          <li>
            <strong>Motivator of God&apos;s People:</strong> Catholic Men Organization (CMO), Pro-Cathedral Abuja.
          </li>
        </ul>
      </div>
    ),
  },
];

export default function ExtendedDossier() {
  const [activeTab, setActiveTab] = useState("lineage");

  const currentSection = DOSSIER_SECTIONS.find((s) => s.id === activeTab);

  return (
    <section className={styles.extendedDossierSection} id="citation">
      <div className="container-wide">
        <FadeIn>
          <div className={styles.sectionHeader}>
            <span className="caption">Official Citation & Biography</span>
            <h2 className="headline">Extended Dossier</h2>
            <p className="body text-secondary" style={{ marginTop: "0.5rem" }}>
              Explore the detailed biography, academic milestones, wage policy architecture, and traditional honors of High Chief Dr. Richard Onwuka Egbule.
            </p>
            <div className={styles.sectionDivider} />
          </div>
        </FadeIn>

        {/* Tab Navigation */}
        <div className={styles.dossierTabNavigation}>
          {DOSSIER_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveTab(sec.id)}
              className={`${styles.dossierTabButton} ${
                activeTab === sec.id ? styles.dossierTabActive : ""
              }`}
            >
              <span className={styles.dossierTabIcon}>{sec.icon}</span>
              <span className={styles.dossierTabLabel}>{sec.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className={styles.dossierMainCard}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={styles.dossierCardBody}
            >
              <h3 className={styles.dossierSectionTitle}>
                {currentSection.title}
              </h3>
              {currentSection.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
