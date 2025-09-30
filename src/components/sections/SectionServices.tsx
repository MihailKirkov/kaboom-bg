"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SERVICES } from "@/data/services";
import { ChevronDown } from "lucide-react";

const ILLUSTRATION_SRC = "/illustrations/services-sketch.svg"; // place in /public/illustrations/

export default function SectionServices() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(3);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <section
      className="relative overflow-hidden flex flex-col items-center justify-start md:justify-center pt-24 md:pt-28 pb-20 md:pb-24"
      style={{ minHeight: "calc(100vh - 64px - 64px)" }}
      aria-label="Услуги"
    >
      {/* Right-side red illustration */}
      <Image
        src={ILLUSTRATION_SRC}
        alt=""
        width={900}
        height={900}
        priority
        className="pointer-events-none select-none absolute right-[-6%] top-1/2 -translate-y-1/2 opacity-80 max-h-[72%] w-auto hidden md:block"
      />

      {/* Heading */}
      <div className="relative z-10 flex flex-col items-center mt-2 md:mt-0">
        <span className="mb-2 rounded-md border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.35em] uppercase">
          Услуги
        </span>
        <h2 className="font-display text-white text-[96px] leading-none md:text-[180px]">
          360°
        </h2>
      </div>

      {/* Center preview box (placeholder for image/video) */}
      <div className="relative z-10 mt-6 md:mt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={SERVICES[current]?.id ?? "placeholder"}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto h-[220px] w-[min(92vw,860px)] rounded-xl bg-zinc-800/80 shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
          >
            {/* In the future swap this with an <Image src={SERVICES[current].previewSrc!} .../> */}
          </motion.div>
        </AnimatePresence>
        <div className="mx-auto -mt-3 flex items-center justify-center">
          <ChevronDown className="h-5 w-5 text-red-500" />
        </div>
      </div>

      {/* Carousel (whole strip moves) */}
      <div className="relative z-10 mt-8 w-full">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            containScroll: "trimSnaps",
            dragFree: false,
            skipSnaps: false,
          }}
        >
          <CarouselContent className="px-[3vw]">
            {SERVICES.map((s, i) => (
              <CarouselItem
                key={s.id}
                className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6 2xl:basis-1/8"
              >
                <ServiceCard
                  title={s.title}
                  blurb={s.blurb}
                  iconSrc={s.iconSrc}
                  onClick={() => api?.scrollTo(i)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2 md:left-6 border-white/20 text-white/80 hover:text-white hover:border-white/40" />
          <CarouselNext className="right-2 md:right-6 border-white/20 text-white/80 hover:text-white hover:border-white/40" />
        </Carousel>
      </div>

      {/* Dots */}
      <nav className="relative z-10 mt-6 flex items-center gap-2" aria-label="Пейджинг">
        {SERVICES.map((_, i) => (
          <button
            key={i}
            aria-label={`Към слайд ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={[
              "h-2 rounded-full transition-all",
              i === current ? "w-8 bg-red-600" : "w-2 bg-white/30 hover:bg-white/60",
            ].join(" ")}
          />
        ))}
      </nav>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

/** Single tile/card */
function ServiceCard({
  title,
  blurb,
  iconSrc,
  onClick,
}: {
  title: string;
  blurb: string;
  iconSrc: `/icons/${string}`;
  onClick: () => void;
}) {
  return (
    <Card
      className="h-full rounded-xl border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-colors"
      onClick={onClick}
    >
      <CardContent className="relative p-4 text-center">
        <div className="mx-auto mb-2 text-white/80">
          <Image
            src={iconSrc}
            alt=""
            width={24}
            height={24}
            className="opacity-90"
            priority={false}
          />
        </div>

        <div className="text-[11px] leading-4 font-extrabold font-display uppercase tracking-tight text-red-500">
          {title}
        </div>

        <div className="mt-2 text-[11px] leading-4 text-white/70">{blurb}</div>

        {/* Hairline sides for the grid look */}
        <span className="absolute inset-y-3 left-0 w-px bg-white/10" />
        <span className="absolute inset-y-3 right-0 w-px bg-white/10" />
      </CardContent>
    </Card>
  );
}
