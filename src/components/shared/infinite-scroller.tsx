"use client";

import { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";

type Item = {
  id: string | number;
  src: string;
  alt: string;
};

type Props = {
  items: Item[];
  baseSpeed?: number;
  accelSpeed?: number;
  gap?: number;
  height?: number;
  itemWidth?: number; // approximate rendered width of each item in px (default 100)
  className?: string;
};

export default function InfiniteScroller({
  items,
  baseSpeed = 40,
  gap = 32,
  height = 60,
  itemWidth = 100,
  className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-black"
}: Props) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Build repeated array so total content width >= 2 * viewport width
const repeated = useMemo(() => {
  if (!items || items.length === 0) return [];

  // Always repeat at least 4–6 times.
  // Enough to cover any viewport once motion starts.
  const repeats = 6;

  const arr: Item[] = [];
  for (let r = 0; r < repeats; r++) arr.push(...items);

  return arr;
}, [items]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let lastTime = performance.now();
    let running = true;

    // ---- DRAG STATE ----
    let dragging = false;
    let lastX = 0;

    const pointerDown = (e: PointerEvent) => {
      dragging = true;
      running = false; // stop auto scroll
      lastX = e.clientX;
    };

    const pointerMove = (e: PointerEvent) => {
      if (!dragging) return;

      const dx = e.clientX - lastX;
      lastX = e.clientX;

      const current = x.get();
      const itemWidthTotal = el.scrollWidth / 2;
      const next = (current + dx) % itemWidthTotal;
      x.set(next);
    };

    const pointerUp = () => {
      dragging = false;
      running = true; // resume auto scroll
      lastTime = performance.now(); // reset timer
    };

    el.addEventListener("pointerdown", pointerDown);
    el.addEventListener("pointermove", pointerMove);
    el.addEventListener("pointerup", pointerUp);
    el.addEventListener("pointerleave", pointerUp);

    // ---- ANIMATION LOOP ----
    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (running) {
        const dist = baseSpeed * dt;
        const current = x.get();
        const itemWidthTotal = el.scrollWidth / 2;
        const next = (current - dist) % itemWidthTotal;
        x.set(next);
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointerdown", pointerDown);
      el.removeEventListener("pointermove", pointerMove);
      el.removeEventListener("pointerup", pointerUp);
      el.removeEventListener("pointerleave", pointerUp);
    };
  }, [x, baseSpeed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{ userSelect: "none", touchAction: "pan-y" }}
    >
      <div className={className} />

      <motion.div style={{ x }} className="flex items-center justify-center w-max">
        {repeated.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="flex-shrink-0 pointer-events-none"
            style={{ marginRight: gap }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={itemWidth}
              height={height}
              draggable={false}
              className="object-contain grayscale hover:grayscale-0 transition pointer-events-none"
              style={{ maxHeight: height }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
