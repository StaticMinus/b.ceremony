"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ParallaxImage — wraps children in a parallax container.
 * Images move slower/faster than the scroll to create depth.
 *
 * @param {number} speed  Multiplier: 0.5 = slow, 1.5 = fast, negative = reverse
 */
export default function ParallaxImage({
  children,
  speed = 0.3,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -80, speed * 80]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: "hidden", position: "relative", ...style }}
    >
      <motion.div style={{ y, width: "100%", height: "120%" }}>
        {children}
      </motion.div>
    </div>
  );
}
