"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * TiltCard — 3D tilt effect on hover using pointer position.
 * Adds depth via perspective and subtle shadow shifts.
 * Disabled on touch devices.
 */
export default function TiltCard({
  children,
  maxTilt = 8,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const rotateX = useSpring(0, { stiffness: 250, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 250, damping: 20 });

  const handleMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const px = (e.clientX - cx) / (rect.width / 2);
    const py = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(px * maxTilt);
    rotateX.set(-py * maxTilt);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-cursor-hover
    >
      {children}
    </motion.div>
  );
}
