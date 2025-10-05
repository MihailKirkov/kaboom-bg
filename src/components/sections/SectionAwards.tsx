'use client';

import { useState } from 'react';
import Image from 'next/image';
import SectionWrapperFullWidth from '@/components/layout/section-wrapper-full-width';
import { AWARDS } from '@/data/awards';
import { FORMATS } from '@/data/formats';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SectionAwardsAndFormats() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(FORMATS.length / itemsPerPage);
  const visibleFormats = FORMATS.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <SectionWrapperFullWidth
      className="bg-black text-white text-center py-20"
      aria-label="Награди и Формати"
    >
      {/* Awards Header */}
      <h2 className="text-muted uppercase tracking-[0.3em] text-sm font-bold mb-2">
        НАГРАДИ
      </h2>
      <h3 className="text-4xl font-display font-light mb-12">
        Журито <span className="font-normal">ни обича</span>
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
      <h2 className="text-muted uppercase tracking-[0.3em] text-sm font-bold mb-2">
        НАШИТЕ ФОРМАТИ
      </h2>
      <h3 className="text-4xl font-display text-red-600 font-extrabold mb-4">
        KABOOM ORIGINALS
      </h3>
      <div className="flex justify-center items-center gap-6 mb-10">
        <button
          onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
        >
          <ChevronLeft size={24} />
        </button>

        <p className="text-white/80 text-sm max-w-xl ">
          Малко обяснително текстче към този текстови блок. Малко обяснително текстче към този текстови блок.
        </p>

        <button
          onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Format Items (YouTube Videos) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-[max(640px,50dvw)] mx-auto">
        {visibleFormats.map((item) => (
          <div key={item.id} className="space-y-4">
            <div className="aspect-video max-w-[600px] rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                title={item.title}
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
