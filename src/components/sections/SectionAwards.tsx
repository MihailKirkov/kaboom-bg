"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionWrapperFullWidth from "@/components/layout/section-wrapper-full-width";
import { AWARDS } from "@/data/awards";
import { FORMATS } from "@/data/formats";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

// Embla carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import InfiniteScroller from "../shared/infinite-scroller";

// -------------------- YOUTUBE TYPES -------------------------

// Player state enum
export interface YTPlayerState {
  UNSTARTED: -1;
  ENDED: 0;
  PLAYING: 1;
  PAUSED: 2;
  BUFFERING: 3;
  CUED: 5;
}

// Event delivered to state change callback
export interface YTPlayerEvent {
  data: number;
  target: YTPlayer;
}

// Player instance
export interface YTPlayer {
  getPlayerState(): number;
}

// Player constructor
export interface YTPlayerConstructor {
  new (
    element: HTMLElement | string,
    options?: {
      events?: {
        onStateChange?: (event: YTPlayerEvent) => void;
      };
    }
  ): YTPlayer;
}

// Extend window with YT API
declare global {
  interface Window {
    YT?: {
      Player: YTPlayerConstructor;
      PlayerState: YTPlayerState;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

// ---------------------------------------------------------------------------

export default function SectionAwardsAndFormats() {
  const t = useTranslations("SectionAwardsAndFormats");

  const heading2Lines = t("awards.heading2").split("\n");

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [ytReady, setYtReady] = useState(false);

  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Typed as YTPlayer[]
  const playersRef = useRef<YTPlayer[]>([]);
  const isVideoPlayingRef = useRef(false);

  // ---------------------------------------------------------------------------
  // Load YouTube API
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.YT && window.YT.Player) {
      setYtReady(true);
      return;
    }

    window.onYouTubeIframeAPIReady = () => setYtReady(true);

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  // ---------------------------------------------------------------------------
  // Auto-scroll logic
  // ---------------------------------------------------------------------------
  const stopAuto = () => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
      autoTimer.current = null;
    }
  };

  const startAuto = () => {
    if (!api) return;
    if (isVideoPlayingRef.current) return;

    stopAuto();

    autoTimer.current = setInterval(() => {
      if (!isVideoPlayingRef.current) api.scrollNext();
    }, 5000);
  };

  useEffect(() => {
    if (!api) return;

    startAuto();

    api.on("pointerDown", stopAuto);
    api.on("pointerUp", startAuto);

    return () => {
      stopAuto();
      api.off("pointerDown", stopAuto);
      api.off("pointerUp", startAuto);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  // ---------------------------------------------------------------------------
  // Create YouTube players after API + carousel ready
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!api) return;
    if (!ytReady) return;
    if (!window.YT || !window.YT.Player) return;

    const iframes = document.querySelectorAll(
      "[data-format-video]"
    ) as NodeListOf<HTMLIFrameElement>;

    playersRef.current = [];

    iframes.forEach((iframe) => {
      const player = new window.YT!.Player(iframe, {
        events: {
          onStateChange: (event: YTPlayerEvent) => {
            const isPlaying =
              event.data === window.YT!.PlayerState.PLAYING;

            if (isPlaying) {
              isVideoPlayingRef.current = true;
              stopAuto();
              return;
            }

            // check if any player still plays
            const stillPlaying = playersRef.current.some((p) => {
              try {
                return (
                  p.getPlayerState() === window.YT!.PlayerState.PLAYING
                );
              } catch {
                return false;
              }
            });

            isVideoPlayingRef.current = stillPlaying;
            if (!stillPlaying) startAuto();
          },
        },
      });

      playersRef.current.push(player);
    });
  }, [api, ytReady]);

  // ---------------------------------------------------------------------------
  // Arrows
  // ---------------------------------------------------------------------------
  const handlePrev = () => api?.scrollPrev();
  const handleNext = () => api?.scrollNext();

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <SectionWrapperFullWidth
      className="bg-black text-white text-center pt-12"
      aria-label={t("ariaLabel")}
    >
      {/* Awards Header */}
      <h2 className="text-[#4c4c4c] uppercase tracking-[0.425rem] text-xs font-bold mb-2 font-display">
        {t("awards.heading1")}
      </h2>

      <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-light mb-12 tracking-wider">
        {heading2Lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < heading2Lines.length - 1 && <br />}
          </span>
        ))}
      </h3>

      {/* Awards Logos */}
<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden mb-12">
  <InfiniteScroller
    items={AWARDS.map(a => ({
      id: a.id,
      src: a.logo,
      alt: a.name,
    }))}
    baseSpeed={40}
    accelSpeed={140}
    gap={32}
    height={120}
  />
</div>
      
      <div className="bg-gradient-to-b from-zinc-900 to-black pt-6 md:pt-8">
{/* Formats Header */}
        <h2 className="text-[#4c4c4c] uppercase tracking-[0.425rem] text-xs font-bold mb-2 font-display">
          {t("formats.heading1")}
        </h2>

        <h3 className="text-3xl font-display text-[#ff0000] font-extrabold mb-4 tracking-[0.125rem]">
          {t("formats.heading2")}
        </h3>

        {/* Width limiter */}
        <div className="w-full flex justify-center">
          <div className="w-[70vw] sm:w-[80vw] md:w-[70vw] lg:w-[65vw] xl:w-[75vw]">

            {/* Arrows + text */}
            <div className="flex justify-center items-center md:px-4 lg:px-16 xl:px-32">
              <button
                onClick={handlePrev}
                aria-label={t("formats.prev")}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <Image src="/icons/arrow-left.svg" alt="" width={24} height={24} />
              </button>

              <p className="text-white text-default max-w-sm mx-auto text-balance">
                {t("formats.description")}
              </p>

              <button
                onClick={handleNext}
                aria-label={t("formats.next")}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <Image src="/icons/arrow-right.svg" alt="" width={24} height={24} />
              </button>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden w-full py-2 sm:py-4 md:py-8 lg:py-10">
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                  dragFree: false,
                  skipSnaps: false,
                  containScroll: false,
                }}
              >
                <CarouselContent className="flex gap-4 px-2">
                  {FORMATS.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="basis-[100%] sm:basis-[50%] lg:basis-[33%] xl:basis-[20%] flex-shrink-0 px-2 py-10"

                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="aspect-[9/16] rounded-xl overflow-hidden bg-black/40 border border-white/10 shadow-lg pointer-events-auto"
                      >
                        <iframe
                          data-format-video
                          src={`https://www.youtube.com/embed/${item.youtubeId}?mute=1&playsinline=1`}
                          title={t(`formats.items.${item.id}.title`)}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapperFullWidth>
  );
}
