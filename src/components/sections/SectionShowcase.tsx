'use client';

import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import { SHOWCASE_ITEMS, ShowcaseItem } from '@/data/showcase';
import Image from 'next/image';
import SectionWrapper from '@/components/layout/section-wrapper';
import ShowcaseCard from '@/components/cards/showcase-card';
import PaginationDots from '@/components/shared/pagination-dots';
import { motion, AnimatePresence } from 'framer-motion';
import SafeImage from '@/components/shared/safe-image';

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

export default function SectionShowcase() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [selectedItem, setSelectedItem] =
    useState<typeof SHOWCASE_ITEMS[number] | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const [stableHeight, setStableHeight] = useState<number>(0);

  // 🔹 Responsive card count
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setCardsPerPage(2);
      else if (w < 1024) setCardsPerPage(4);
      else setCardsPerPage(6);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pages = useMemo(
    () => chunkArray(SHOWCASE_ITEMS, cardsPerPage),
    [cardsPerPage]
  );
  const totalPages = pages.length;
  const currentItems = pages[currentPage] || [];

  const close = useCallback(() => setSelectedItem(null), []);

  // 🔹 ESC closes dialog
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const handlePageChange = (i: number) => {
    setCurrentPage(i);
    setSelectedItem(null);
  };

  // 🔹 Measure tallest rendered page height (real card content, not dummy)
  useLayoutEffect(() => {
    const pagesArr = chunkArray(SHOWCASE_ITEMS, cardsPerPage);
    const tempHeights: number[] = [];

    const measureWrapper = document.createElement('div');
    measureWrapper.style.position = 'absolute';
    measureWrapper.style.visibility = 'hidden';
    measureWrapper.style.pointerEvents = 'none';
    measureWrapper.style.inset = '0';
    measureWrapper.style.zIndex = '-1';
    measureWrapper.style.width = '100vw';
    document.body.appendChild(measureWrapper);

    pagesArr.forEach((page) => {
      const grid = document.createElement('div');
      grid.className =
        'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 md:px-0 w-[80dvw] sm:w-[65dvw] lg:w-[max(40dvw,_550px)]';
      page.forEach((item) => {
        const card = document.createElement('div');
        card.className =
          'bg-black/90 border border-white/50 rounded-xl flex flex-col items-center justify-start gap-2 p-2 text-center';
        const img = document.createElement('div');
        img.style.height = '160px';
        img.className = 'bg-white/10 rounded';
        const text = document.createElement('div');
        text.textContent = item.title;
        text.className = 'text-md leading-5 px-2 text-white font-medium';
        card.appendChild(img);
        card.appendChild(text);
        grid.appendChild(card);
      });
      measureWrapper.appendChild(grid);
      tempHeights.push(grid.scrollHeight);
    });

    const maxH = Math.max(...tempHeights);
    setStableHeight(maxH);
    measureWrapper.remove();
  }, [cardsPerPage]);

  const pagination = (
    <div className="pointer-events-auto">
      <PaginationDots
        total={totalPages}
        current={currentPage}
        onChange={handlePageChange}
        className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 z-30"
        style={{ marginBottom: 'calc(var(--spacing) * 3)' }}
      />
    </div>
  );

  return (
    <SectionWrapper
      className="bg-gradient-to-b from-red-600/50 to-black/20 via-red-600/30 relative"
      innerClassName="h-full"
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
      footerContent={pagination}
      footerClassName="pointer-events-none"
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
            onClick={() =>
              handlePageChange((currentPage - 1 + totalPages) % totalPages)
            }
            aria-label="Предишен"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:-translate-x-2 hover:scale-115 transition cursor-pointer"
          >
            <Image
              src="/icons/arrow-left.svg"
              alt=""
              width={20}
              height={40}
              className="object-contain max-h-24"
            />
          </button>

          <h3 className="text-xl sm:text-3xl md:text-5xl font-display text-white tracking-[0.375rem] font-thin text-center">
            Софийска баница
          </h3>

          <button
            onClick={() =>
              handlePageChange((currentPage + 1) % totalPages)
            }
            aria-label="Следващ"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:translate-x-2 hover:scale-115 transition cursor-pointer"
          >
            <Image
              src="/icons/arrow-right.svg"
              alt=""
              width={20}
              height={40}
              className="object-contain max-h-24"
            />
          </button>
        </div>
      </div>

      {/* GRID WRAPPER */}
      <div className="relative mt-12 w-[80dvw] sm:w-[65dvw] lg:w-[max(40dvw,_550px)] mx-auto">
        <motion.div
          ref={gridRef}
          layout
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            minHeight: stableHeight ? `${stableHeight}px` : undefined,
          }}
          className="grid gap-6 px-2 md:px-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr mb-4 lg:mb-0"
        >
          {currentItems.map((item, i) => (
            <ShowcaseCard
              key={item.id}
              item={item}
              index={i}
              onOpen={() => setSelectedItem(item)}
            />
          ))}
        </motion.div>

        <ShowcaseDialog selectedItem={selectedItem} onClose={close} />
      </div>
    </SectionWrapper>
  );
}

type ShowcaseDialogProps = {
  selectedItem: ShowcaseItem | null;
  onClose: () => void;
};

function ShowcaseDialog({ selectedItem, onClose }: ShowcaseDialogProps) {
  return (
    <AnimatePresence>
      {selectedItem && (
        <motion.div
          key="services-overlay"
          role="dialog"
          aria-modal="true"
          className="absolute inset-0 z-20 rounded-xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black backdrop-blur-sm rounded-xl" />
          <div
            className="relative z-10 h-full w-full p-4 md:p-6 flex flex-col items-center justify-start gap-4 text-white border-1 border-white/50 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-[75%] relative">
              <SafeImage
                src={selectedItem.imageSrc}
                alt={selectedItem.title}
                fill
                className="object-cover rounded"
              />
            </div>

            <h4 className="text-xl md:text-lg font-bold mb-3 text-center text-red-600 uppercase">
              {selectedItem.title}
            </h4>
            <p className="max-w-prose text-center text-white/90 font-legacy font-thin">
              {selectedItem.description}
            </p>

            <button
              onClick={onClose}
              aria-label="Затвори"
              className="absolute bottom-0 -translate-x-1/2 left-1/2 translate-y-4 h-8 w-8 rounded-full bg-black border-1 border-white/50 text-white grid place-items-center hover:bg-red-500 font-display font-extrabold text-xl transition"
            >
              X
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
