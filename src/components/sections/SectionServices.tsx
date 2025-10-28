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
 * Sizing rules (desktop):
 * - Card width: md: 220px, lg+: 240px
 * - Separator width: md: 24px, lg+: 28px
 * - Showcase width: exactly 3 * card width (md: 660px, lg+: 720px)
 */
const CARD_W_MD = 220;
const CARD_W_LG = 240;
const SEP_W_MD = 24;
const SEP_W_LG = 28;

export default function SectionServices() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const t = useTranslations("SectionServices");

  // Build interleaved slides: card, sep, card, sep, ...
  const slides = useMemo(
    () =>
      SERVICES.flatMap((s, i) => [
        { type: "card" as const, service: s, index: i },
        { type: "sep" as const, key: `sep-${i}` },
      ]),
    []
  );
  // Even indices are cards, odd are separators.
  const snapCount = slides.length; // = SERVICES.length * 2

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const snap = api.selectedScrollSnap();
      // Map to nearest *card* (even) snap.
      const cardSnap = snap % 2 === 0 ? snap : snap - 1;
      const cardIndex = (cardSnap / 2 + SERVICES.length) % SERVICES.length;
      setCurrentCard(cardIndex);
    };

    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Helpers to ensure we always scroll to a card (even snap).
  const scrollToCard = (i: number) => api?.scrollTo((i * 2) % snapCount);

  return (
    <section
      className="relative overflow-hidden flex flex-col items-center justify-start pt-24 md:pt-28 pb-20 md:pb-24 min-h-screen bg-black"
      aria-label={t("ariaLabel")}
    >
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

      {/* Service Image / Showcase (width = 3 * card width on desktop) */}
      <div className="relative z-10 mt-6 md:mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={SERVICES[currentCard]?.id ?? "placeholder"}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={[
              "mx-auto h-[220px] rounded-xl bg-zinc-800/90 shadow-[0_8px_24px_rgba(0,0,0,0.5)] ring-1 ring-white/10 flex items-center justify-center",
              // mobile/tablet fluid width, desktop exact match to 3 cards
              "w-[min(92vw,660px)] md:w-[660px] lg:w-[720px]",
            ].join(" ")}
          >
            <span className="text-center">
              IMAGE #{currentCard + 1}
              <br />
              {t(`services.${SERVICES[currentCard].id}.title`)}
            </span>
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
      <div className="relative z-10 mt-16 w-full">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: true,
            containScroll: "trimSnaps",
            dragFree: false,
            skipSnaps: false,
          }}
        >
          <CarouselContent className="px-[3vw] flex items-center">
            {slides.map((slide, idx) => {
              const isCard = slide.type === "card";
              if (!isCard) {
                // Separator slide
                return (
                  <CarouselItem
                    key={`sep-${idx}`}
                    // narrow fixed width; centered vertical line
                    className="basis-[16px] md:basis-[24px] lg:basis-[28px] p-0 m-0"
                  >
                    <div className="flex h-full items-center justify-center">
                      <motion.div
                        aria-hidden
                        initial={{ opacity: 0, scaleY: 0.8 }}
                        animate={{ opacity: 0.6, scaleY: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="w-px h-16 bg-white/30"
                      />
                    </div>
                  </CarouselItem>
                );
              }

              const i = slide.index;
              const s = slide.service;
              const active = i === currentCard;

              // Stagger entrance (relative to center)
              const middle = Math.floor(SERVICES.length / 2);
              const offset = Math.abs(i - middle);

              return (
                <CarouselItem
                  key={s.id}
                  // fixed card widths -> showcase width can match 3x
                  className="p-0 m-0 basis-[70%] sm:basis-[55%] md:basis-[220px] lg:basis-[240px]"
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
            "relative p-2 text-center transition-colors",
            active
              ? "bg-white/15 shadow-lg ring-1 ring-white/20"
              : "bg-transparent hover:bg-white/5",
          ].join(" ")}
        >
          <div className="mx-auto mb-2 flex justify-center text-white/80">
            <Image src={iconSrc} alt="" width={24} height={24} className="opacity-90" />
          </div>
          <div className="text-[11px] leading-4 font-extrabold font-display uppercase tracking-tight text-red-500">
            {title}
          </div>
          <div className="mt-2 text-[11px] leading-4 text-white/70">{blurb}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
