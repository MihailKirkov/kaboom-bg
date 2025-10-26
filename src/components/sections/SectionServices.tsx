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
import { SERVICES } from "@/data/services";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import PaginationDots from "../shared/pagination-dots";

const ILLUSTRATION_SRC = "/images/section-services.svg";

// Variants
const containerVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 16 } },
};

export default function SectionServices() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(4);

  useEffect(() => {
    if (!api) return () => {};
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <section
      className="relative overflow-hidden flex flex-col items-center justify-start pt-24 md:pt-28 pb-20 md:pb-24 min-h-screen bg-black"
      aria-label="Услуги"
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
          className="text-lg text-white/60 font-bold tracking-[0.375rem] uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Услуги
        </motion.h1>
        <motion.h2
          className="font-display text-white text-[96px] leading-none md:text-[180px]"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          360°
        </motion.h2>
      </motion.div>

      {/* Service Image / Showcase */}
      <div className="relative z-10 mt-6 md:mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={SERVICES[current]?.id ?? "placeholder"}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto h-[220px] w-[min(92vw,660px)] rounded-xl bg-zinc-800/90 shadow-[0_8px_24px_rgba(0,0,0,0.5)] ring-1 ring-white/10 flex items-center justify-center"
          >
            <span className="text-center">
              IMAGE #{current + 1} <br /> {SERVICES[current]?.title}
            </span>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -bottom-6 flex items-center justify-center pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* <ChevronDown className="h-16 w-16 text-red-500" /> */}
          
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
            {SERVICES.map((s, i) => {
              const middle = Math.floor(SERVICES.length / 2);
              const offset = Math.abs(i - middle);

              return (
                <CarouselItem
                  key={s.id}
                  className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/6 p-0 m-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: offset * 0.15,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="relative flex justify-center" style={{width:'200px'}}
                  >
                    <ServiceCard
                      title={s.title}
                      blurb={s.blurb}
                      iconSrc={s.iconSrc}
                      active={i === current}
                      onClick={() => api?.scrollTo(i)}
                    />

                    {/* Separator lines */}
                      <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-[2px] h-16 bg-white/20 pointer-events-none" />
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      <PaginationDots
        total={SERVICES.length}
        current={current}
        onChange={(i) => api?.scrollTo(i)}
        className="mt-6"
      />
    </section>
  );
}

function ServiceCard({ title, blurb, iconSrc, active, onClick }: {
  title: string;
  blurb: string;
  iconSrc: `/icons/${string}`;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
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
