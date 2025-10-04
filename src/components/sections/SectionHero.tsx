'use client';

import SectionWrapper from '@/components/layout/section-wrapper';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function SectionHero() {
  const t = useTranslations('SectionHero');

  return (
    <SectionWrapper
      background={
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/section-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      }
    >
      <div className="flex flex-col items-center gap-y-20 text-center">
        {/* Headings */}
        <motion.div
          className="flex flex-col gap-y-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }} // re-animates when visible again
        >
          <motion.h1
            className="font-display text-muted text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {t('nooneWorksLikeUs')}
          </motion.h1>

          <motion.h2
            className="font-display font-extrabold text-red-600 text-8xl"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {t('weDare')}
          </motion.h2>
        </motion.div>

        {/* Text block */}
        <motion.div
          className="max-w-md text-white text-lg leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Малко обяснително текстче към този текстови блок. Малко обяснително
          текстче към този текстови блок.Малко обяснително текстче към този
          текстови блок.
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
