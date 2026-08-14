"use client";

import { motion } from "framer-motion";
import styles from "../page.module.css";

export default function BackgroundMesh() {
  return (
    <div className={styles.bgMeshContainer} aria-hidden="true">
      <motion.div
        className={styles.bgMeshOrb1}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={styles.bgMeshOrb2}
        animate={{
          x: [0, -45, 35, 0],
          y: [0, 40, -35, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className={styles.bgMeshGridOverlay} />
    </div>
  );
}
