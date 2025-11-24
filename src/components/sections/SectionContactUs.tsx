'use client';

import Image from 'next/image';
import SectionWrapper from '@/components/layout/section-wrapper';
import { useTranslations } from 'next-intl';

export default function SectionContactUs() {
  const tOthers = useTranslations("Others");
  const t = useTranslations("SectionContactUs");
  
  return (
    <SectionWrapper
      className="bg-black text-white"
      aria-label="Свържете се с нас"
    >
      <div className="flex flex-col items-center text-center gap-6">
        <h2 className="uppercase tracking-[0.4em] text-xs font-bold font-display text-[#4c4c4c]">
          {t('reachOut')}
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

        <div className="text-sm leading-relaxed tracking-wider mt-2 space-y-1 text-white font-display font-thin">
          <p>OFFICE@KABOOM.BG</p>
          <p>+359 877 199 199</p>
          <p>{t('address')}</p>
        </div>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <a
            href="tel:+359877199199"
            className="whitespace-nowrap flex items-center gap-2 bg-[rgb(30,30,30)] rounded-md px-4 py-1 border border-[rgb(30,30,30)]
            text-xs font-thin font-montserrat text-red-600 tracking-wide hover:border-red-600 transition min-w-[160px]"
          >
            <Image src="/icons/phone.svg" alt="Phone" width={24} height={24} className="w-6 h-6" />
            {tOthers('callUs')}
          </a>

          <a
            href="mailto:office@kaboom.bg"
            className="whitespace-nowrap flex items-center gap-2 bg-[rgb(30,30,30)] rounded-md px-4 py-1 border border-[rgb(30,30,30)]
            text-xs font-thin font-montserrat text-red-600 tracking-wide hover:border-red-600 transition min-w-[160px]"
          >
            <Image src="/icons/mail.svg" alt="Mail" width={24} height={24} className="w-6 h-6" />
            {tOthers('emailUs')}
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
