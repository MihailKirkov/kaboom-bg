import { useTranslations } from 'next-intl';
import React from 'react';

const SectionHero = () => {
    const t = useTranslations('SectionHero');

    return (
        <section
            className="relative flex flex-col items-center justify-center text-center gap-y-20 overflow-hidden"
            style={{ minHeight: '100vh' }}
        >
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/videos/section-hero.mp4"
                autoPlay
                loop
                muted
                playsInline
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col gap-y-2">
                <h1 className="font-display text-muted text-sm">
                {t('nooneWorksLikeUs')}
                </h1>
                <h2 className="font-display font-extrabold text-red-600 text-8xl">
                {t('weDare')}
                </h2>
            </div>

            <div className="relative z-10 max-w-md mx-auto px-6 text-white text-lg leading-relaxed">
                Малко обяснително текстче към този текстови блок. Малко обяснително
                текстче към този текстови блок. Малко обяснително текстче към този
                текстови блок.
            </div>
        </section>
    );
};

export default SectionHero;
