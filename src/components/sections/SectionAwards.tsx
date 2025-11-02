'use client';

import { useState } from 'react';
import Image from 'next/image';
import SectionWrapperFullWidth from '@/components/layout/section-wrapper-full-width';
import { AWARDS } from '@/data/awards';
import { FORMATS } from '@/data/formats';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function SectionAwardsAndFormats() {
  const t = useTranslations('SectionAwardsAndFormats');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(FORMATS.length / itemsPerPage);
  const visibleFormats = FORMATS.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const heading2Lines = t('awards.heading2').split('\n');

  return (
    <SectionWrapperFullWidth
      className="bg-black text-white text-center py-20"
      aria-label={t('ariaLabel')}
    >
      {/* Awards Header */}
      <h2 className="text-muted uppercase tracking-[0.3em] text-sm font-bold mb-2 font-display">
        {t('awards.heading1')}
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
      <div className="flex flex-wrap justify-center gap-10 items-center mb-20 px-6">
        {AWARDS.map((award) => (
          <Image
            key={award.id}
            src={award.logo}
            alt={award.name}
            width={140}
            height={80}
            className="object-contain max-h-24"
          />
        ))}
      </div>

      {/* Formats Header */}
      <h2 className="text-muted uppercase tracking-[0.3em] text-sm font-bold mb-2 font-display">
        {t('formats.heading1')}
      </h2>
      <h3 className="text-4xl font-display text-red-600 font-extrabold mb-4">
        {t('formats.heading2')}
      </h3>
      <div className="flex justify-center items-center gap-6 mb-10">
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
          }
          className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
          aria-label={t('formats.prev')}
        >
          <ChevronLeft size={24} />
        </button>

        <p className="text-white/80 text-sm max-w-xl text-balance">
          {t('formats.description')}
        </p>

        <button
          onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
          aria-label={t('formats.next')}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Format Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-[max(640px,50dvw)] mx-auto">
        {visibleFormats.map((item) => (
          <div key={item.id} className="space-y-4">
            <div className="aspect-video max-w-[600px] rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                title={t(`formats.items.${item.id}.title`)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapperFullWidth>
  );
}
