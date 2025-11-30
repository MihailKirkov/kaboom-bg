'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { RefObject } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type FooterProps = {
    scrollToRef?: RefObject<HTMLElement | null>;
};

export default function Footer({ scrollToRef }: FooterProps) {
    const tOthers = useTranslations('Others');
    const [atBottom, setAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        const nearBottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        setAtBottom(nearBottom);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToLastSection = () => {
        scrollToRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer
            className={clsx(
                'fixed bottom-0 left-0 right-0 z-50 bg-red-600 text-white font-bold p-1 h-max transition-transform duration-300',
                {
                'translate-y-full': atBottom, // hides footer
                'translate-y-0': !atBottom,   // shows footer
                }
            )}
        >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 h-full"
                onClick={scrollToLastSection}
            >
                <span className="text-xl sm:text-3xl md:text-4xl tracking-wider font-display font-extrabold cursor-pointer" >
                    LET’S GO!
                </span>

                <div className="flex items-center gap-2 md:gap-4">
                    <a
                        href="tel:+359000000000"
                        className="flex items-center justify-center bg-[rgb(30,30,30)] border border-[rgb(30,30,30)] text-red-600 
                                rounded-md w-max h-max py-2 px-4 transition-all hover:border-white/50 hover:text-white"
                    >
                        <Image
                            src="/icons/phone.svg"
                            alt="Phone"
                            width={20}
                            height={20}
                            className="w-5 h-5"
                        />
                        <span className="hidden md:inline-block text-xs font-montserrat px-2">{tOthers('callUs')}</span>
                    </a>

                    <a
                        href="mailto:contact@kaboom.bg"
                        className="flex items-center justify-center bg-[rgb(30,30,30)] border border-[rgb(30,30,30)] text-red-600 
                                rounded-md w-max h-max py-2 px-4 transition-all hover:border-white/50 hover:text-white"
                    >
                        <Image
                            src="/icons/mail.svg"
                            alt="Mail"
                            width={20}
                            height={20}
                            className="w-5 h-5"
                        />
                        <span className="hidden md:inline-block text-xs font-montserrat px-2">{tOthers('emailUs')}</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
