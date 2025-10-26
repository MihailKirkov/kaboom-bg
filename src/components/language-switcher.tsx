'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {locales, Locale} from '@/i18n';
import {usePathname, useRouter} from '@/i18n/navigation';
import {
  AnimatePresence,
  motion,
  useReducedMotion
} from 'framer-motion';
import type {Variants, Transition} from 'framer-motion';

type Props = { current: Locale };

function makeRowVariants(reduce: boolean): Variants {
  const showT: Transition = reduce
    ? {duration: 0}
    : {type: 'spring', stiffness: 300, damping: 24, delayChildren: 0.05, staggerChildren: 0.07};

  const exitT: Transition = reduce
    ? {duration: 0}
    : {staggerChildren: 0.06, staggerDirection: -1};

return {
  hidden: { opacity: 0, y: -4 }, // slight upward motion if you want
  show: { opacity: 1, y: 0, transition: showT },
  exit: { opacity: 0, y: -4, transition: exitT },
};

}

function makeItemVariants(reduce: boolean): Variants {
  const showT: Transition = reduce
    ? {duration: 0}
    : {type: 'spring', stiffness: 500, damping: 30};

  return {
    hidden: {opacity: 0, x: -6, scale: reduce ? 1 : 0.9},
    show: {opacity: 1, x: 0, scale: 1, transition: showT},
    exit: {opacity: 0, x: -6, scale: reduce ? 1 : 0.95},
  };
}

export default function LangSwitcher({current}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // coerce to boolean (fixes: boolean | null)
  const prefersReducedMotion = useReducedMotion() ?? false;

  const others = useMemo(
    () => (locales as readonly Locale[]).filter((l) => l !== current),
    [current]
  );

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Escape') setOpen(false);
    if ((e.key === 'Enter' || e.key === ' ') && !open) {
      e.preventDefault();
      setOpen(true);
    }
  }

  function changeLocale(next: Locale) {
    router.push(pathname, {locale: next});
    setOpen(false);
  }

  const rowVariants = makeRowVariants(prefersReducedMotion);
  const itemVariants = makeItemVariants(prefersReducedMotion);

  return (
    <div ref={rootRef} className="relative inline-flex flex-col md:flex-row items-center">
      {/* Current language button */}
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={[
          'flex items-center justify-center',
          'h-7 w-7 rounded-full',
          'text-xs font-extrabold font-display',
          'bg-white border border-white/20 text-black',
          'backdrop-blur-sm',
          'transition-all',
          open ? 'bg-red-500! text-white' : 'hover:bg-white/80',
        ].join(' ')}
      >
        {current.toUpperCase()}
      </button>

      {/* Sliding options row (staggered children) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="lang-row"
            variants={rowVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute flex
              top-full left-[50%] translate-x-[-50%] mt-1.5 flex-col items-center
              md:left-full md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:mt-0 md:ml-2 md:flex-row md:items-start gap-1.5"
            role="menu"
            aria-label="Choose language"
          >
            {others.map((l) => (
              <motion.button
                key={l}
                role="menuitemradio"
                aria-checked={false}
                variants={itemVariants}
                onClick={() => changeLocale(l)}
                className={[
                  'h-8 w-8 rounded-full',
                  'flex items-center justify-center',
                  'text-sm font-extrabold font-display',
                  'bg-white border border-white/20 text-black',
                  'hover:border-white/40 hover:bg-black/60 hover:text-white transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-white/40',
                ].join(' ')}
              >
                {l.toUpperCase()}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
