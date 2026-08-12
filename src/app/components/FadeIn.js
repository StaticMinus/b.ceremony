"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/**
 * FadeIn — scroll-triggered animation with multiple modes.
 *
 * @param {"up"|"down"|"left"|"right"|"none"} direction  Slide direction
 * @param {boolean} scale      Also scale from 0.95
 * @param {boolean} blur       Also blur-in
 * @param {boolean} parallax   Apply subtle parallax offset while scrolling
 */
export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.7,
  distance = 32,
  className = "",
  style = {},
  once = true,
  scale: doScale = false,
  blur: doBlur = false,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const dirMap = {
    up:    { y: distance, x: 0 },
    down:  { y: -distance, x: 0 },
    left:  { y: 0, x: distance },
    right: { y: 0, x: -distance },
    none:  { y: 0, x: 0 },
  };

  const offset = dirMap[direction] || dirMap.up;

  const initial = {
    opacity: 0,
    y: offset.y,
    x: offset.x,
    ...(doScale ? { scale: 0.95 } : {}),
    ...(doBlur ? { filter: "blur(6px)" } : {}),
  };

  const visible = {
    opacity: 1,
    y: 0,
    x: 0,
    ...(doScale ? { scale: 1 } : {}),
    ...(doBlur ? { filter: "blur(0px)" } : {}),
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={initial}
      animate={isInView ? visible : {}}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
