"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * HorizontalScroll — pins a section and scrolls its children horizontally
 * as the user scrolls vertically. Creates a tall scroll container to
 * provide the scroll room needed for the horizontal translation.
 */
export default function HorizontalScroll({
  children,
  className = "",
  stickyClassName = "",
  innerClassName = "",
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setScrollRange(contentRef.current.scrollWidth - window.innerWidth + 100);
    }

    const handleResize = () => {
      if (contentRef.current) {
        setScrollRange(contentRef.current.scrollWidth - window.innerWidth + 100);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [children]);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: `${Math.max(scrollRange + window?.innerHeight || 1000, 1500)}px`, position: "relative" }}
    >
      <div
        className={stickyClassName}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <motion.div
          ref={contentRef}
          className={innerClassName}
          style={{
            x,
            display: "flex",
            gap: "2rem",
            paddingLeft: "8vw",
            paddingRight: "40vw",
            willChange: "transform",
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
