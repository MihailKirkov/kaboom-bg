'use client';

import { useEffect, useRef, useState } from 'react';
import { CLIENTS } from '@/data/clients';
import { CLIENT_REVIEWS } from '@/data/client-reviews';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import SectionWrapperFullWidth from '@/components/layout/section-wrapper-full-width';
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

  const pagination = (
    <div className="pointer-events-auto">
  
        <PaginationDots
          total={total}
          current={current}
          onChange={setCurrent}
        className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 z-30"
        style={{ marginBottom: 'calc(var(--spacing) * 3)' }}
        />
    </div>
  );

  return (
    <SectionWrapperFullWidth
      className="bg-gradient-to-b from-zinc-900 to-red-600 via-black/90 relative"
      aria-label="Клиенти"
      footerContent={pagination}
      footerClassName="pointer-events-none"
    >
      {/* Header */}
      <div className="mb-10 text-center space-y-4">
        <h1 className="text-muted uppercase tracking-[0.4em] text-sm font-bold font-display">
          ЗАЩО KABOOM
        </h1>
        <h2 className="text-red-600 font-display text-4xl md:text-5xl font-thin leading-tight">
          НЕЗАВИСИМО <br /> ОТ БРАНША
        </h2>
        <p className="text-white/80 text-sm max-w-sm mx-auto leading-relaxed font-legacy">
          От недвижими имоти до козметика, индустриален сектор и здравеопазване, дори екология. Какъвто и да е Вашият бизнес, от Kaboom ще получите от качество.
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

        <h2 className="text-xs uppercase tracking-[0.3em] text-red-600 font-semibold mb-2 font-display">
          КЛИЕНТСКИ ОТЗИВИ
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-white font-extrabold mt-2">
          ГЛАС КЛИЕНТСКИ,<br /> ГЛАС БОЖИЙ
        </h3>


        <div className="relative mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => setCurrent((p) => (p - 1 + total) % total)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
            aria-label="Предишен"
          >
            <Image
              src="/icons/arrow-left.svg"
              alt="Previous"
              width={24}
              height={24}
            />
          </button>

          <div className="flex flex-col items-center text-center">
              
            <div className="mt-6 max-w-[50dvw] text-white text-sm uppercase font-display font-thin tracking-wider">
              {review.quote}
            </div>
              {/* <Image
                src={review.avatar}
                alt={review.name}
                fill
                className="object-cover"
              /> */}
            {/* <p className="mt-3 text-white text-sm font-bold">{review.name}</p>
            <p className="text-white text-xs opacity-70">{review.position}</p> */}
          </div>

          <button
            onClick={() => setCurrent((p) => (p + 1) % total)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
            aria-label="Следващ"
          >
            <Image
              src="/icons/arrow-right.svg"
              alt="Previous"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </SectionWrapperFullWidth>
  );
}