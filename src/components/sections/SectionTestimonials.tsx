'use client';

import { useEffect, useRef, useState } from 'react';
import { CLIENTS } from '@/data/clients';
import { CLIENT_REVIEWS } from '@/data/client-reviews';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import SectionWrapperFullWidth from '@/components/layout/section-wrapper-full-width';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PaginationDots from '@/components/shared/pagination-dots';

export default function SectionTestimonials() {
  const [speedUp, setSpeedUp] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate the list for seamless scrolling
  const logos = [...CLIENTS, ...CLIENTS];
  const [current, setCurrent] = useState(0);
  const total = CLIENT_REVIEWS.length;
  const review = CLIENT_REVIEWS[current];

  // Animation for logo marquee
  useEffect(() => {
    const baseDuration = 25;
    const duration = speedUp ? baseDuration / 3 : baseDuration;

    controls.start({
      x: ['0%', '-50%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          duration: duration,
        },
      },
    });
  }, [speedUp, controls]);

  return (
    <SectionWrapperFullWidth
      className="bg-gradient-to-b from-zinc-900 to-red-600 via-black"
      aria-label="Клиенти"
    >
      {/* Header */}
      <div className="mb-10 text-center space-y-4">
        <h1 className="text-muted uppercase tracking-[0.4em] text-sm font-bold">
          ЗАЩО KABOOM
        </h1>
        <h2 className="text-red-600 font-display text-4xl md:text-5xl font-extrabold leading-tight">
          НЕЗАВИСИМО <br /> ОТ БРАНША
        </h2>
        <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
          Малко обяснително текстче към този текстови блок. Малко обяснително текстче към този текстови блок.
        </p>
      </div>

      {/* Marquee */}
      <div
        ref={containerRef}
        onMouseEnter={() => setSpeedUp(true)}
        onMouseLeave={() => setSpeedUp(false)}
        onTouchStart={() => setSpeedUp(true)}
        onTouchEnd={() => setSpeedUp(false)}
        className="relative w-full overflow-hidden py-8"
      >
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-black via-transparent to-black" />

        <motion.div
          className="flex gap-12 px-6 py-4 w-max items-center"
          animate={controls}
        >
          {logos.map((client, i) => (
            <div key={`${client.id}-${i}`} className="flex-shrink-0">
              <Image
                src={client.logo}
                alt={client.name}
                width={100}
                height={40}
                className="object-contain max-h-[60px] grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Client Review */}
      <div className="flex flex-col items-center text-center px-4 py-24 relative">
        <Image
          src="/images/section-testimonial-bg.svg"
          alt="Illustration"
          width={600}
          height={600}
          className="absolute right-0 bottom-0 opacity-40 pointer-events-none hidden md:block"
        />

        <h2 className="text-xs uppercase tracking-[0.3em] text-white font-semibold mb-2">
          КЛИЕНТСКИ ОТЗИВИ
        </h2>
        <h3 className="text-2xl md:text-4xl font-display text-white font-extrabold">
          ГЛАС КЛИЕНТСКИ,<br /> ГЛАС БОЖИЙ
        </h3>

        <div className="mt-6 max-w-xl text-white text-sm leading-relaxed">
          {review.quote}
        </div>

        <div className="relative mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => setCurrent((p) => (p - 1 + total) % total)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
            aria-label="Предишен"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 relative rounded-full overflow-hidden border-2 border-white">
              <Image
                src={review.avatar}
                alt={review.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-white text-sm font-bold">{review.name}</p>
            <p className="text-white text-xs opacity-70">{review.position}</p>
          </div>

          <button
            onClick={() => setCurrent((p) => (p + 1) % total)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
            aria-label="Следващ"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <PaginationDots
          total={total}
          current={current}
          onChange={setCurrent}
          className="mt-6"
        />
      </div>
    </SectionWrapperFullWidth>
  );
}