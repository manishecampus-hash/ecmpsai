"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "../motion";

// Number that counts up from its previous value whenever `value` changes
export default function CountUp({
  value,
  format = (n) => n.toLocaleString("en-IN"),
  duration = 1.1,
  delay = 0,
}: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(reduce ? value : 0);
  const shown = useRef(current);

  useEffect(() => {
    if (reduce) {
      shown.current = value;
      setCurrent(value);
      return;
    }
    const controls = animate(shown.current, value, {
      duration,
      delay,
      ease: EASE_OUT,
      onUpdate: (v) => {
        shown.current = v;
        setCurrent(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value, duration, delay, reduce]);

  return <span className="tabular-nums">{format(current)}</span>;
}
