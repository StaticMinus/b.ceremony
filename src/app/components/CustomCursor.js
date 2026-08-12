"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 600, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 600, damping: 30 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const over = (e) => {
      if (
        e.target.closest(
          "a, button, [data-magnetic], [data-cursor-hover], select"
        )
      ) {
        setIsHovering(true);
      }
    };

    const out = (e) => {
      if (
        e.target.closest(
          "a, button, [data-magnetic], [data-cursor-hover], select"
        )
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseout", out, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div className="cursor-dot" style={{ x: cursorX, y: cursorY }}>
      <div className={`cursor-circle${isHovering ? " hovering" : ""}`} />
    </motion.div>
  );
}
