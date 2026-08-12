"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * TextReveal — scroll-triggered masked text reveal.
 * Splits text into words or characters, each slides up from behind a mask.
 *
 * @param {"word"|"char"} type
 */
export default function TextReveal({
  children,
  type = "word",
  delay = 0,
  stagger = 0.04,
  duration = 0.6,
  className = "",
  tag: Tag = "span",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const text = typeof children === "string" ? children : "";
  const items = type === "char" ? text.split("") : text.split(" ");

  return (
    <Tag ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap", gap: type === "word" ? "0.3em" : 0 }}>
      {items.map((item, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {item}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
