"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useMemo, useState } from "react";
import PaginationDots from "../shared/pagination-dots";
import { SERVICES } from "@/data/services";
import { useTranslations } from "next-intl";

const ILLUSTRATION_SRC = "/images/section-services.svg";

/**
 * We drive layout with CSS variables so everything stays in lockstep:
 *   --card-w  : card width
 *   --sep-w   : separator width
 *   --show-w  : 3 * card width
 *
 * Tailwind responsive arbitrary properties set these per breakpoint,
 * including very small screens (<360px).
 */

export default function SectionServices() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const t = useTranslations("SectionServices");

  const [dragOffset, setDragOffset] = useState(0);


  // Interleave: card, sep, card, sep, ...
const slides = useMemo(() => {
  const base = SERVICES.flatMap((s, i) => [
    { type: "card" as const, service: s, index: i },
    { type: "sep" as const, key: `sep-${i}` },
  ]);

  // Minimal safe duplication so the track is always longer than the viewport
  // 3 loops is safe for any card width and any screen size
  return [...base, ...base, ...base];
}, []);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const snap = api.selectedScrollSnap();
      const cardSnap = snap % 2 === 0 ? snap : snap - 1;
      const cardIndex = (cardSnap / 2 + SERVICES.length) % SERVICES.length;
      setCurrentCard(cardIndex);
    };

    const onScroll = () => {
      // Embla returns a value 0→1→0 as you drag between snaps
      const progress = api.scrollProgress();
      setDragOffset(progress);
    };

    api.on("select", onSelect);
    api.on("scroll", onScroll);

    onSelect();
    return () => {
      api.off("select", onSelect);
      api.off("scroll", onScroll);
    };
  }, [api]);

  useEffect(() => {
    const handler = (e: any) => {
      const serviceId = e.detail;
      const index = SERVICES.findIndex((s) => s.id === serviceId);
      if (index === -1 || !api) return;

      scrollToCard(index);

      // smooth scroll to the section
      document.getElementById("section-services-anchor")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    window.addEventListener("jump-to-service", handler);
    return () => window.removeEventListener("jump-to-service", handler);
  }, [api]);


  const scrollToCard = (i: number) => {
    if (!api) return;
    const baseIndex = i * 2;
    // Find the nearest matching snap among duplicates
    const snaps = api.scrollSnapList();
    const target = snaps.findIndex((_, idx) => idx % (SERVICES.length * 2) === baseIndex);
    if (target >= 0) api.scrollTo(target);
  };

  return (
    <section
      aria-label={t("ariaLabel")}
      className={[
  "relative overflow-hidden flex flex-col items-center justify-start pt-24 md:pt-28 pb-20 md:pb-24 min-h-screen bg-black",

  // Mobile-first — bigger cards so text fits
  "[--card-w:140px] [--sep-w:10px]",

  // ≥390px (iPhone mini–normal)
  "xs:[--card-w:150px] xs:[--sep-w:12px]",

  // ≥640px
  "sm:[--card-w:180px] sm:[--sep-w:14px]",

  // ≥768px
  "md:[--card-w:200px] md:[--sep-w:16px]",

  // ≥1024px
  "lg:[--card-w:210px] lg:[--sep-w:18px]",

  // Derived default (desktop): 3 cards wide
  "[--show-w:calc(var(--card-w)*3+var(--sep-w)*3)]",

  // Override for phones: only 2 cards wide
  "max-sm:[--show-w:calc(var(--card-w)*2+var(--sep-w)*2)]",
].join(" ")
}
    >
      <div id="section-services-anchor" className="absolute -top-0" />
      <Image
        src={ILLUSTRATION_SRC}
        alt=""
        width={500}
        height={500}
        priority
        className="pointer-events-none select-none absolute right-[8%] top-1/3 -translate-y-1/2 opacity-90 max-h-[50%] w-auto hidden md:block"
      />

      {/* Headings */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-lg text-white/60 font-bold tracking-[0.375rem] uppercase font-display"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("servicesTitle")}
        </motion.h1>
        <motion.h2
          className="text-white text-[96px] leading-none md:text-[180px] font-display"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("angleText")}
        </motion.h2>
      </motion.div>

      {/* Showcase: width = 3 × card width, always */}
      <div className="relative z-10 mt-6 md:mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={SERVICES[currentCard]?.id ?? "placeholder"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={[
              "mx-auto h-[220px] rounded-xl overflow-hidden",
              "shadow-[0_8px_24px_rgba(0,0,0,0.55)] ",
              "w-[var(--show-w)] bg-black/30",
            ].join(" ")}
          >
            <motion.div
              // subtle parallax driven by dragOffset
              style={{
                x: dragOffset * -40, // tweak: -20 to -60 looks good
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
              className="relative w-full h-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={SERVICES[currentCard].previewSrc}
                  alt={t(`services.${SERVICES[currentCard].id}.title`)}
                  fill
                  className="object-fit sm:object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>


        </AnimatePresence>

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -bottom-4 flex items-center justify-center pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/icons-red/arrow-down.svg"
            alt=""
            width={60}
            height={60}
            className="object-contain max-h-24"
          />
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative z-10 mt-16 w-full px-[2vw]">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: true,
            containScroll: "trimSnaps",
            dragFree: false,
            skipSnaps: false,
            slidesToScroll: 1,
          }}
        >
          {/* Remove default track gutters to avoid seam drift */}
          <CarouselContent className="!ml-0 !px-0 flex items-stretch gap-0">
            {slides.map((slide, idx) => {
              if (slide.type === "sep") {
                return (
                  <CarouselItem
                    key={`sep-${idx}`}
                    // Fixed separator width via CSS var; no margins/padding
                    className="!pl-0 !ml-0 !mr-0 p-0 m-0 basis-[var(--sep-w)] grow-0 shrink-0"
                  >
                    <div className="flex h-full items-center justify-center">
                      <motion.div
                        aria-hidden
                        initial={{ opacity: 0, scaleY: 0.8 }}
                        animate={{ opacity: 0.6, scaleY: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="w-px h-full bg-white/30"
                      />
                    </div>
                  </CarouselItem>
                );
              }

              const i = slide.index;
              const s = slide.service;
              const active = i === currentCard;

              // Stagger entrance relative to center
              const middle = Math.floor(SERVICES.length / 2);
              const offset = Math.abs(i - middle);

              return (
                <CarouselItem
                  key={s.id + idx}
                  // Card width is *exactly* var(--card-w)
                  className="!pl-0 !ml-0 !mr-0 p-0 m-0 basis-[var(--card-w)] grow-0 shrink-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: offset * 0.12,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="relative flex justify-center"
                  >
                    <ServiceCard
                      title={t(`services.${s.id}.title`)}
                      blurb={t(`services.${s.id}.blurb`)}
                      iconSrc={s.iconSrc}
                      active={active}
                      onClick={() => scrollToCard(i)}
                    />
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      <PaginationDots
        total={SERVICES.length}
        current={currentCard}
        onChange={scrollToCard}
        className="mt-6"
      />
    </section>
  );
}

function ServiceCard({
  title,
  blurb,
  iconSrc,
  active,
  onClick,
}: {
  title: string;
  blurb: string;
  iconSrc: `/icons/${string}`;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full"
    >
      <Card
        className="h-full cursor-pointer border-0 relative overflow-visible bg-transparent"
        onClick={onClick}
      >
        <CardContent
          className={[
            "relative p-2 text-center transition-colors rounded-md",
            active
              ? "bg-white/15 shadow-lg ring-1 ring-white/20"
              : "bg-transparent hover:bg-white/5",
          ].join(" ")}
        >
          <div className="mx-auto mb-2 flex justify-center text-white/80">
            <Image src={iconSrc} alt="" width={24} height={24} className="opacity-90" />
          </div>
          {/* <div className="text-[11px] leading-4 font-extrabold font-display uppercase tracking-tight text-red-500"> */}
          <div className="text-[10px] leading-4 font-extrabold font-display uppercase tracking-tight text-red-500">

            {title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
          <div className="mt-2 text-[10px] sm:text-[11px] leading-4 text-white/70 font-legacy">{blurb}</div>
          
        </CardContent>
      </Card>
    </motion.div>
  );
}
