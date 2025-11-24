"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { CLIENTS } from "@/data/clients";
import { CLIENT_REVIEWS } from "@/data/client-reviews";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import PaginationDots from "@/components/shared/pagination-dots";
import { useTranslations } from "next-intl";
import InfiniteScroller from "../shared/infinite-scroller";

export default function SectionTestimonials() {
  const t = useTranslations("SectionTestimonials");

  const [speedUp, setSpeedUp] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState(0);
  const review = CLIENT_REVIEWS[current];
  const total = CLIENT_REVIEWS.length;

  const quote = t(`reviews.${review.id}.quote`);
  const fullName = t(`reviews.${review.id}.fullName`);

  const logos = [...CLIENTS, ...CLIENTS];

  // ---------- FIX: Stable height for quotes ----------
  const measureRef = useRef<HTMLDivElement>(null);
  const [quoteHeight, setQuoteHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!measureRef.current) return;

    const blocks = measureRef.current.querySelectorAll(".measure-quote");
    if (!blocks.length) return;

    const heights = Array.from(blocks).map(
      (el) => (el as HTMLElement).scrollHeight
    );

    setQuoteHeight(Math.max(...heights));
  }, [t]);

  // ---------- Marquee speed control ----------
  useEffect(() => {
    const baseDuration = 25;
    const duration = speedUp ? baseDuration / 3 : baseDuration;

    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration,
        },
      },
    });
  }, [speedUp, controls]);

  // ---------- Animation Variants ----------
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" },
  };

  const fadeScale = {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 },
    transition: { duration: 0.35, ease: "easeOut" },
  };

  const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.35 },
  };

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative w-full min-h-screen bg-gradient-to-b from-zinc-900 to-red-600 via-black/70 flex flex-col overflow-visible"
      
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center text-center px-4 pt-20 md:pt-24 pb-48 relative">

        {/* Header */}
        <motion.div
          className="mb-10 text-center space-y-3"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fade}
        >
          <h1 className="text-muted uppercase tracking-[0.38em] text-xs sm:text-sm font-bold font-display">
            {t("heading1")}
          </h1>

          <h2 className="text-red-600 font-display text-3xl sm:text-4xl md:text-5xl font-thin leading-tight whitespace-pre-line">
            {t("heading2")}
          </h2>

          <p className="text-white text-[10px] sm:text-[11px] md:text-[12px] max-w-[22rem] mx-auto leading-relaxed font-legacy">
            {t("subtext")}
          </p>
        </motion.div>

        {/* Marquee */}
        <div
          ref={containerRef}
          onMouseEnter={() => setSpeedUp(true)}
          onMouseLeave={() => setSpeedUp(false)}
          onTouchStart={() => setSpeedUp(true)}
          onTouchEnd={() => setSpeedUp(false)}
          className="relative w-full overflow-hidden py-6 md:py-8"
        >
          <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-black via-transparent to-black" />

          <InfiniteScroller
            items={CLIENTS.map(c => ({
              id: c.id,
              src: c.logo,
              alt: c.name,
            }))}
            baseSpeed={40}
            accelSpeed={140}
            gap={32}
            height={60}
          />


        </div>

        {/* Reviews Title */}
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 text-xs uppercase tracking-[0.3em] text-red-500 font-semibold mb-1 font-display"
        >
          {t("reviewsTitle")}
        </motion.h2>

        <motion.h3
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-xl sm:text-2xl md:text-3xl font-display text-white font-extrabold mt-4 whitespace-pre-line"
        >
          {t("reviewsHeading")}
        </motion.h3>

        {/* ---------- FIXED HEIGHT QUOTE SECTION ---------- */}
        <div
          className="relative mt-10 w-full max-w-[900px] px-4 flex justify-center"
          style={quoteHeight ? { height: quoteHeight } : {}}
        >
          <div className="absolute inset-0 flex items-center justify-center gap-6 sm:gap-10 md:gap-12">

            <button
              onClick={() => setCurrent((p) => (p - 1 + total) % total)}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
            >
              <Image src="/icons/arrow-left.svg" alt="" width={20} height={20} />
            </button>

            <motion.p
              key={review.id}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-white text-xs sm:text-sm md:text-md uppercase font-display font-thin tracking-wider leading-relaxed max-w-sm whitespace-pre-line text-center"
            >
              {quote}
            </motion.p>

            <button
              onClick={() => setCurrent((p) => (p + 1) % total)}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
            >
              <Image src="/icons/arrow-right.svg" alt="" width={20} height={20} />
            </button>

          </div>
        </div>

        {/* Hidden Block Used for Measurement */}
        <div ref={measureRef} className="absolute opacity-0 -z-50 pointer-events-none">
          {CLIENT_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="measure-quote max-w-sm text-xs sm:text-sm md:text-md whitespace-pre-line leading-relaxed"
            >
              {t(`reviews.${rev.id}.quote`)}
            </div>
          ))}
        </div>

      </div>

      {/* Avatar */}
      <motion.div
        key={"avatar-" + review.id}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 h-[120px] w-[120px] sm:h-[150px] sm:w-[150px] md:h-[170px] md:w-[170px]"
        variants={fadeScale}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Image src={review.avatar} alt="" fill className="object-contain pointer-events-none" />
      </motion.div>

      {/* Full Name */}
      <motion.div
        key={"name-" + review.id}
        className="
          absolute text-black font-legacy font-thin whitespace-pre-line text-center
          bottom-[125px] sm:bottom-[75px] md:bottom-[85px]
          left-1/2 -translate-x-1/2
          sm:-translate-x-[calc(50%+170px)]
          md:-translate-x-[calc(50%+190px)]
          text-xs sm:text-sm md:text-base
        "
        variants={fade}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {fullName.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <PaginationDots
          total={total}
          current={current}
          onChange={setCurrent}
          navClassname="relative z-25 flex items-center gap-2 bg-red-600 rounded-md py-1 px-2"
        />
      </div>
    </section>
  );
}
