'use client';

import { useEffect, useMemo, useState } from 'react';
import { SHOWCASE_ITEMS } from '@/data/showcase';
import Image from 'next/image';
import SectionWrapper from '@/components/layout/section-wrapper';
import ShowcaseCard from '@/components/cards/showcase-card';
import PaginationDots from '@/components/shared/pagination-dots';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function SectionShowcase() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [selectedItem, setSelectedItem] = useState<typeof SHOWCASE_ITEMS[0] | null>(null);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) setCardsPerPage(3);
      else if (width < 1024) setCardsPerPage(4);
      else setCardsPerPage(6);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pages = useMemo(() => chunkArray(SHOWCASE_ITEMS, cardsPerPage), [cardsPerPage]);
  const totalPages = pages.length;
  const currentItems = pages[currentPage] || [];

  return (
    <SectionWrapper
      className="bg-gradient-to-b from-red-600/50 to-black/20 via-red-600/30"
      aria-label="Showcase"
      background={
        <Image
          src="/images/section-showcase.svg"
          alt=""
          fill
          priority
          className="object-cover opacity-60"
        />
      }
    >
      <div className="text-center space-y-6 mt-6">
        <h1 className="text-sm uppercase tracking-[0.4em] text-muted font-semibold">
          360 МАРКЕТИНГ
        </h1>
        <h2 className="text-2xl md:text-4xl font-extrabold text-black">
          НИКОЙ НЕ РАБОТИ КАТО НАС
        </h2>

        <div className="mt-2 w-full flex items-center justify-between max-w-4xl mx-auto px-4 md:px-0">
          <button
            onClick={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)}
            aria-label="Предишен"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-red-700 transition cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>

          <h3 className="text-4xl md:text-5xl font-display text-white font-bold tracking-[0.375rem]">
            Софийска баница
          </h3>

          <button
            onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
            aria-label="Следващ"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-red-700 transition cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="mt-12 w-full grid gap-6 px-2 md:px-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {currentItems.map((item, i) => (
          <ShowcaseCard key={item.id} item={item} index={i} onOpen={() => setSelectedItem(item)} />
        ))}
      </div>
        
      <PaginationDots
        total={totalPages}
        current={currentPage}
        onChange={setCurrentPage}
        className="mt-6"
      />
    </SectionWrapper>
  );
}