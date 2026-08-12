"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, animate, useMotionValue, useTransform } from "framer-motion";

/**
 * AnimatedCounter — counts from 0 to target when scrolled into view.
 *
 * @param {number}  target   The number to count up to.
 * @param {number}  duration Seconds for the count animation.
 * @param {string}  suffix   Text after the number (e.g. "+", "%").
 * @param {string}  prefix   Text before the number (e.g. "$").
 */
export default function AnimatedCounter({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, target, {
      duration,
      ease: [0.23, 1, 0.32, 1],
    });

    return () => controls.stop();
  }, [isInView, target, duration, count]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
