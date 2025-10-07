'use client';

import Image from 'next/image';
import SectionWrapper from '@/components/layout/section-wrapper';
import { Mail, Phone } from 'lucide-react';

export default function SectionContactUs() {
  return (
    <SectionWrapper
      className="bg-black text-white"
      aria-label="Свържете се с нас"
    >
      <div className="flex flex-col items-center text-center gap-6">
        <h2 className="uppercase tracking-[0.4em] text-muted text-xs font-bold">
          Свържете се с нас
        </h2>

        <h1 className="text-4xl md:text-6xl font-display font-extrabold">
          LET’S GO!
        </h1>

        <Image
          src="/icons-red/flag.svg"
          alt="Red Flag"
          width={24}
          height={24}
          className="text-red-600"
        />

        <div className="text-sm leading-relaxed mt-2 space-y-1 text-white/80">
          <p>OFFICE@KABOOM.BG</p>
          <p>+359 877 199 199</p>
          <p>ЧЕРКОВНА 79, ОБОРИЩЕ, СОФИЯ</p>
        </div>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <a
            href="tel:+359877199199"
            className="flex items-center gap-2 bg-black text-white border border-white rounded-full px-4 py-2 text-sm font-bold hover:bg-white hover:text-black transition"
          >
            <Phone size={16} />
            ОБАДЕТЕ СЕ
          </a>
          <a
            href="mailto:office@kaboom.bg"
            className="flex items-center gap-2 bg-black text-white border border-white rounded-full px-4 py-2 text-sm font-bold hover:bg-white hover:text-black transition"
          >
            <Mail size={16} />
            ПИШЕТЕ НИ
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
