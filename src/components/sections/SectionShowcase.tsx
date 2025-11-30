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
import PaginationDots from '@/components/shared/pagination-dots';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

const GRID_WIDTH_CLASSES =
  "w-[min(70dvw,300px)] sm:w-[max(55dvw,_400px)] lg:w-[max(30dvw,_550px)]";

export default function SectionShowcase() {
  const t = useTranslations('SectionShowcase');

  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [selectedItem, setSelectedItem] =
    useState<typeof SHOWCASE_ITEMS[number] | null>(null);

  const [cardHeight, setCardHeight] = useState<number>(0);

  const gridRef = useRef<HTMLDivElement>(null);
  const [stableHeight, setStableHeight] = useState<number>(0);

  // Responsive cardsPerPage
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setCardsPerPage(2);
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

  const LOGICAL_GROUP_SIZE = 6;

  const pageTitles = useMemo(
    () => [t('centerTitle#1'), t('centerTitle#2'), t('centerTitle#3')],
    [t]
  );

  const logicalGroupIndex = useMemo(() => {
    return Math.floor((currentPage * cardsPerPage) / LOGICAL_GROUP_SIZE);
  }, [currentPage, cardsPerPage]);

  const totalPages = pages.length;
  const currentItems = pages[currentPage] || [];

  const close = useCallback(() => setSelectedItem(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const handlePageChange = (i: number) => {
    setCurrentPage(i);
    setSelectedItem(null);
  };

  // Measure container height for each page
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
        `grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 md:px-0 ${GRID_WIDTH_CLASSES}`;

      page.forEach((item) => {
        const card = document.createElement('div');
        card.className =
          'bg-black/90 border border-white/50 rounded-xl flex flex-col items-center justify-start gap-2 p-2 text-center';
        const img = document.createElement('div');
        img.className = 'bg-white/10 rounded h-[130px] sm:h-[110px] lg:h-[130px]';
        const text = document.createElement('div');
        text.textContent = t(`items.${item.id}.title`);
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
  }, [cardsPerPage, t]);

  // MEASURE ALL CARDS EXACTLY (correct solution)
  useLayoutEffect(() => {
    const measure = document.getElementById("showcase-measure");
    if (!measure) return;

    let max = 0;

    const cards = measure.querySelectorAll(".showcase-measure-card");
    cards.forEach((node) => {
      const h = (node as HTMLElement).offsetHeight;
      if (h > max) max = h;
    });

    setCardHeight(max);
  }, [t]);

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
    <>
      {/* Hidden measurement cards */}
      <div
        id="showcase-measure"
        className="fixed top-0 left-0 opacity-0 pointer-events-none z-[-1]"
      >
        <div className={`grid gap-6 ${GRID_WIDTH_CLASSES} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
          {SHOWCASE_ITEMS.map((item) => (
            <ShowcaseCard
              key={item.id}
              item={{
                ...item,
                title: t(`items.${item.id}.title`),
              }}
              measurementMode
            />
          ))}
        </div>
      </div>

      <SectionWrapper
        className="relative bg-[linear-gradient(to_bottom,_#ff0000_0%,_#ff0000_30%,_rgba(0,0,0,0.5)_50%,_#000000_100%)]"
        innerClassName="h-full"
        aria-label={t('ariaLabel')}
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
        <div className="text-center space-y-8 mt-8">
          <h1 className="text-sm uppercase tracking-[0.4em] text-[#4c4c4c] font-semibold font-display">
            {t('heading1')}
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-black font-display">
            {t('heading2')}
          </h2>

          <div className="mt-2 w-full flex items-center justify-between max-w-4xl mx-auto px-0 sm:px-2 md:px-4">
            <button
              onClick={() =>
                handlePageChange((currentPage - 1 + totalPages) % totalPages)
              }
              aria-label={t('prev')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:-translate-x-2 hover:scale-115 transition cursor-pointer"
            >
              <Image
                src="/icons/arrow-left.svg"
                alt=""
                width={30}
                height={50}
                className="object-contain max-h-24"
              />
            </button>

            <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display font-light text-white tracking-[0.25rem] text-center">
              {pageTitles[logicalGroupIndex] || ''}
            </h3>

            <button
              onClick={() =>
                handlePageChange((currentPage + 1) % totalPages)
              }
              aria-label={t('next')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:translate-x-2 hover:scale-115 transition cursor-pointer"
            >
              <Image
                src="/icons/arrow-right.svg"
                alt=""
                width={30}
                height={50}
                className="object-contain max-h-24"
              />
            </button>
          </div>
        </div>

        <div className={`relative mt-12 mx-auto ${GRID_WIDTH_CLASSES}`}>
          <motion.div
            ref={gridRef}
            layout
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              minHeight: stableHeight ? `${stableHeight}px` : undefined,
            }}
            className="grid gap-6 px-2 md:px-12 lg:px-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr mb-6 lg:mb-4"
          >
            {currentItems.map((item, i) => (
              <ShowcaseCard
                key={item.id}
                item={{
                  ...item,
                  title: t(`items.${item.id}.title`),
                  description: t(`items.${item.id}.description`),
                }}
                index={i}
                onOpen={() => setSelectedItem(item)}
                cardHeight={cardHeight}
              />
            ))}
          </motion.div>

          <ShowcaseDialog selectedItem={selectedItem} onClose={close} t={t} />
        </div>
      </SectionWrapper>
    </>
  );
}

type ShowcaseDialogProps = {
  selectedItem: ShowcaseItem | null;
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
};

function ShowcaseDialog({ selectedItem, onClose, t }: ShowcaseDialogProps) {
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
            className="relative z-10 h-full w-full p-1 md:p-2 flex flex-col items-center justify-start gap-4 text-white border-1 border-white/50 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-[50%] md:h-[60%] lg:h-[72.5%] relative">
              <video
                src={selectedItem.videoSrc}
                className="absolute inset-0 w-full h-full object-fill rounded"
                autoPlay
                playsInline
                loop
                muted
              />
            </div>

            <div className='flex flex-col justify-start items-center gap-4 px-2 w-full h-auto'>
              <h4 className="text-default font-montserrat font-extrabold text-center text-[#ff0000] uppercase">
                {t(`items.${selectedItem.id}.title`)}
              </h4>
              <p className="max-w-prose text-center text-white text-default font-verdana">
                {t(`items.${selectedItem.id}.description`)}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label={t('close')}
              className="absolute bottom-0 -translate-x-1/2 left-1/2 translate-y-4 h-8 w-8 rounded-full bg-black border-1 border-white/50 text-white grid place-items-center hover:bg-[#ff0000] hover:border-red-600 font-display font-extrabold text-xl transition"
            >
              X
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type ShowcaseCardProps = {
  item: typeof SHOWCASE_ITEMS[number] & {
    title: string;
    description?: string;
  };
  onOpen?: () => void;
  index?: number;
  cardHeight?: number;
  measurementMode?: boolean;
};

function ShowcaseCard({
  item,
  onOpen,
  index = 0,
  cardHeight,
  measurementMode = false,
}: ShowcaseCardProps) {
  const animationDelay = index * 0.08;
  const [hovered, setHovered] = useState(false);

  // --- MEASUREMENT MODE (static, simplified) ---
  if (measurementMode) {
    return (
      <div
        className="showcase-measure-card bg-black/90 border border-white/50 rounded-xl flex flex-col items-center justify-start gap-2 pt-2 px-2 text-center"
      >
        <div className="w-full h-[130px] sm:h-[110px] lg:h-[130px] rounded bg-white/10" />
        <div className="text-default leading-3 sm:leading-4 md:leading-5 text-white flex-1 flex items-center justify-center px-2 text-balance">
          {item.title}
        </div>
      </div>
    );
  }

  // --- REAL CARD ---
  return (
    <motion.button
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.01,
        borderColor: 'rgba(239, 68, 68, 1)',
        transition: { delay: 0 },
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay: animationDelay }}
      className="bg-black/90 border border-white/50 rounded-xl flex flex-col items-center justify-start gap-2 pt-2 px-2 text-center"
      style={{
        minHeight: cardHeight ? `${cardHeight}px` : undefined,
      }}
    >
      <div className="w-full h-[130px] sm:h-[110px] lg:h-[130px] relative rounded overflow-hidden">
        {!hovered ? (
          <Image
            src={item.previewSrc}
            alt={item.title}
            fill
            className="object-fit"
          />
        ) : (
          <video
            src={item.videoSrc}
            className="absolute inset-0 w-full h-full object-fill"
            autoPlay
            playsInline
            loop
            muted
          />
        )}
      </div>

      <div className="text-default leading-3 sm:leading-4 md:leading-5 px-2 text-white flex-1 flex items-center justify-center text-balance">
        {item.title}
      </div>
    </motion.button>
  );
}
