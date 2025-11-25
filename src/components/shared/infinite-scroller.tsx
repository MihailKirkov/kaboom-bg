"use client";

import { useEffect, useRef } from "react";
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
};

export default function InfiniteScroller({
  items,
  baseSpeed = 40,
  gap = 32,
  height = 60,
}: Props) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const doubled = [...items, ...items];

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
      const itemWidth = el.scrollWidth / 2;

      // dragging direction is natural
      const next = (current + dx) % itemWidth;
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
        const itemWidth = el.scrollWidth / 2;
        const next = (current - dist) % itemWidth;
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
      className="relative w-[100vw] overflow-hidden select-none"
      style={{ userSelect: "none", touchAction: "pan-y" }}
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-black" />

      <motion.div style={{ x }} className="flex items-center w-max">
        {doubled.map((item, i) => (
          <div
            key={item.id + "-" + i}
            className="flex-shrink-0 pointer-events-none"
            style={{ marginRight: gap }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={100}
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
