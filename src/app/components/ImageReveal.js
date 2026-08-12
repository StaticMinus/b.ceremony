"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * ImageReveal — clip-path based image reveal on scroll.
 * Uses inset() to wipe the image into view from a chosen direction.
 */
export default function ImageReveal({
  children,
  direction = "bottom", // "top" | "bottom" | "left" | "right"
  duration = 1.2,
  delay = 0,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const clips = {
    bottom: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
    top:    { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
    left:   { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
    right:  { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
  };

  const clip = clips[direction] || clips.bottom;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clip.from, scale: 1.08 }}
      animate={isInView ? { clipPath: clip.to, scale: 1 } : {}}
      transition={{
        clipPath: { duration, delay, ease: [0.77, 0, 0.175, 1] },
        scale:    { duration: duration * 1.2, delay, ease: [0.23, 1, 0.32, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
