'use client';

import SectionWrapper from '@/components/layout/section-wrapper';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function SectionHero() {
  const t = useTranslations('SectionHero');

  const textLines = t('textBlock').split('\n');

  return (
    <SectionWrapper
      background={
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/Hero_Video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/70" />
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
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h1
            className="font-display text-muted text-sm tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {t('nooneWorksLikeUs')}
          </motion.h1>

          <motion.h2
            className="font-display font-extrabold text-red-600 text-6xl sm:text-7xl md:text-8xl"
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
          className="max-w-md text-white text-md md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {textLines.map((line, index) => (
            <span key={index}>
              {line}
              {index !== textLines.length - 1 && <br />}
            </span>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
