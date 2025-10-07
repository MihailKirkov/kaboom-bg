'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

import SectionHero from '@/components/sections/SectionHero';
import SectionServices from '@/components/sections/SectionServices';
import SectionShowcase from '@/components/sections/SectionShowcase';
import SectionWhyUs from '@/components/sections/SectionWhyUs';
import SectionTestimonials from '@/components/sections/SectionTestimonials';
import SectionAwards from '@/components/sections/SectionAwards';
import SectionContactUs from '@/components/sections/SectionContactUs';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  const contactRef = useRef<HTMLElement | null>(null);

  // Global scroll position
  const { scrollY } = useScroll();

  // Adjust range manually: tweak these numbers!
  const y = useTransform(scrollY, [1000, 2500], [-700, 0]); // You may want [1000, 2500] instead

  return (
    <>
      <SectionHero />
      <SectionServices />
      <SectionShowcase />
      <SectionWhyUs />
      <SectionTestimonials />

      <div className="relative overflow-hidden">
        {/* 🔥 Animated SVG */}
        <motion.div
          style={{ y }}
          className="absolute bottom-0 right-0 z-10 pointer-events-none 
                     w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] 
                     md:w-[500px] md:h-[650px] lg:w-[600px] lg:h-[750px]
                     xl:w-[700px] xl:h-[900px] translate-x-10 sm:translate-x-16 md:translate-x-20"
        >
          <Image
            src="/images/art-figure.svg"
            alt="Kaboom hero figure"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Sections */}
        <SectionAwards />
        <section ref={contactRef}>
          <SectionContactUs />
        </section>
      </div>

      <Footer scrollToRef={contactRef} />
    </>
  );
}
