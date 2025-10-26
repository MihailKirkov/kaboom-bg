'use client';

import Image from 'next/image';
import SectionWrapper from '@/components/layout/section-wrapper';
import { Mail, Phone } from 'lucide-react';

export default function SectionContactUs() {
  return (
    <SectionWrapper
      className="bg-yellow text-white"
      aria-label="Свържете се с нас"
    >
      <div className="flex flex-col items-center text-center gap-6">
        <h2 className="uppercase tracking-[0.4em] text-muted text-xs font-bold font-display">
          Свържете се с нас
        </h2>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold">
          LET’S GO!
        </h1>

        <Image
          src="/icons-red/flag.svg"
          alt="Red Flag"
          width={32}
          height={32}
          className="text-red-600"
        />

        <div className="text-sm leading-relaxed mt-2 space-y-1 text-white/80 font-display font-thin">
          <p>OFFICE@KABOOM.BG</p>
          <p>+359 877 199 199</p>
          <p>ЧЕРКОВНА 79, ОБОРИЩЕ, СОФИЯ</p>
        </div>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <a
            href="tel:+359877199199"
            className="flex items-center gap-2 bg-[rgb(30,30,30)]  rounded-md px-4 py-1 border border-[rgb(30,30,30)]
              text-xs font-thin font-montserrat text-red-600 tracking-wide
              hover:border-red-600 transition"
          >
            <Image
              src="/icons/phone.svg"
              alt="Phone"
              width={24}
              height={24}
            />
            ОБАДЕТЕ СЕ
          </a>
          <a
            href="mailto:office@kaboom.bg"
            className="flex items-center gap-2 bg-[rgb(30,30,30)]  rounded-md px-4 py-1 border border-[rgb(30,30,30)]
              text-xs font-thin font-montserrat text-red-600 tracking-wide
              hover:border-red-600 transition"
          >
            <Image
              src="/icons/mail.svg"
              alt="Mail"
              width={24}
              height={24}
            />
            ПИШЕТЕ НИ
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
