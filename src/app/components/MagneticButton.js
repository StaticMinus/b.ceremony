"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * MagneticButton — button that subtly follows the cursor when hovered.
 * Spring-based return ensures smooth release. Disabled on touch devices.
 *
 * @param {number} strength  0–1, how much the element follows the cursor
 */
export default function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  as: Tag = "div",
  ...props
}) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

  const handleMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-magnetic
      {...props}
    >
      {children}
    </motion.div>
  );
}
