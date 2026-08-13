"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import styles from "../page.module.css";

const GALLERY_DATA = [
  {
    id: 1,
    category: "chieftaincy",
    src: "/portrait.jpg",
    title: "Obanze Akoji of Ehime Mbano",
    desc: "Principal Chieftaincy Title (plus 3 other traditional titles)",
  },
  {
    id: 2,
    category: "corporate",
    src: "/corporate_portrait_hd.jpg",
    title: "Distinguished Corporate Leadership",
    desc: "Executive Excellence & Public Policy Statesman",
  },
  {
    id: 3,
    category: "corporate",
    src: "/executive_portrait.jpg",
    title: "Executive Chairman (2009–2019)",
    desc: "National Salaries, Incomes and Wages Commission",
  },
  {
    id: 4,
    category: "chieftaincy",
    src: "/ksm_ceremonial.jpg",
    title: "Knight of St. Mulumba (KSM)",
    desc: "4th Degree Ceremonial Honor & Faith Leadership",
  },
  {
    id: 5,
    category: "chieftaincy",
    src: "/official_standing.jpg",
    title: "Official State Duties",
    desc: "National Public Service & Official State Ceremonies",
  },
  {
    id: 6,
    category: "family",
    src: "/father_son_car_selfie.jpg",
    title: "Father & Son Journey",
    desc: "Cherished Moments with Chief Dr. Daniel Egbule",
  },
  {
    id: 7,
    category: "family",
    src: "/family_gathering_1.jpg",
    title: "Family Unity & Generations",
    desc: "Surrounded by Children, Grandchildren & Loved Ones",
  },
  {
    id: 8,
    category: "family",
    src: "/family_gathering_2.jpg",
    title: "Family Celebration",
    desc: "Cherished Family Moments & Generations of Joy",
  },
  {
    id: 9,
    category: "family",
    src: "/family_father_son.jpg",
    title: "Father & Son Fellowship",
    desc: "Warm Fellowship with Chief Dr. Daniel Egbule",
  },
  {
    id: 10,
    category: "family",
    src: "/family_granddaughter.jpg",
    title: "Grandfather's Love",
    desc: "Precious Moments with Grandchildren",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Memories" },
  { key: "chieftaincy", label: "Chieftaincy & Faith" },
  { key: "corporate", label: "Public Leadership" },
  { key: "family", label: "Family & Legacy" },
];

export default function ParallaxGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3 Distinct Parallax Speeds for Asymmetric Depth
  const yCol1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [50, -50]); // Opposite movement direction!
  const yCol3 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const filteredItems = GALLERY_DATA.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") setSelectedPhotoIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) => (prev + 1) % filteredItems.length);
      }
      if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex(
          (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredItems.length]);

  // Distribute items across 3 columns
  const col1 = filteredItems.filter((_, i) => i % 3 === 0);
  const col2 = filteredItems.filter((_, i) => i % 3 === 1);
  const col3 = filteredItems.filter((_, i) => i % 3 === 2);

  const renderColumn = (items, yMotion) => (
    <motion.div style={{ y: yMotion }} className={styles.parallaxColumn}>
      {items.map((item, idx) => {
        const itemGlobalIndex = filteredItems.findIndex((x) => x.id === item.id);
        return (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={styles.parallaxCardWrapper}
            onClick={() => setSelectedPhotoIndex(itemGlobalIndex)}
          >
            <div className={styles.parallaxCardInner}>
              <div className={styles.parallaxImageContainer}>
                <motion.img
                  src={item.src}
                  alt={item.title}
                  className={styles.parallaxImg}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.4 }}
                />
                <div className={styles.parallaxOverlayHover}>
                  <span>🔍 Expand Photo</span>
                </div>
              </div>
              <div className={styles.parallaxCardCaption}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );

  return (
    <div ref={containerRef} className={styles.parallaxGallerySection}>
      {/* Category Filter Tabs */}
      <div className={styles.categoryTabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              setSelectedPhotoIndex(null);
            }}
            className={`${styles.categoryTabBtn} ${
              activeCategory === cat.key ? styles.activeCategoryTab : ""
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3-Column Parallax Grid */}
      <div className={styles.parallaxGrid3Col}>
        {renderColumn(col1, yCol1)}
        {renderColumn(col2, yCol2)}
        {renderColumn(col3, yCol3)}
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && filteredItems[selectedPhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.lightboxBackdrop}
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className={styles.lightboxCloseBtn}
                onClick={() => setSelectedPhotoIndex(null)}
              >
                ✕
              </button>

              {/* Prev / Next Controls */}
              <button
                className={`${styles.lightboxNavBtn} ${styles.lightboxNavPrev}`}
                onClick={() =>
                  setSelectedPhotoIndex(
                    (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
                  )
                }
              >
                ‹
              </button>
              <button
                className={`${styles.lightboxNavBtn} ${styles.lightboxNavNext}`}
                onClick={() =>
                  setSelectedPhotoIndex((prev) => (prev + 1) % filteredItems.length)
                }
              >
                ›
              </button>

              {/* Main Image */}
              <div className={styles.lightboxImageFrame}>
                <img
                  src={filteredItems[selectedPhotoIndex].src}
                  alt={filteredItems[selectedPhotoIndex].title}
                  className={styles.lightboxMainImg}
                />
              </div>

              {/* Details */}
              <div className={styles.lightboxFooter}>
                <span className={styles.lightboxCounter}>
                  {selectedPhotoIndex + 1} / {filteredItems.length}
                </span>
                <h3 className={styles.lightboxTitle}>
                  {filteredItems[selectedPhotoIndex].title}
                </h3>
                <p className={styles.lightboxDesc}>
                  {filteredItems[selectedPhotoIndex].desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
