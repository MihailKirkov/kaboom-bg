'use client';

import { useEffect, useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import clsx from 'clsx';
import { RefObject } from 'react';

type FooterProps = {
    scrollToRef?: RefObject<HTMLElement | null>;
};

export default function Footer({ scrollToRef }: FooterProps) {
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
                <span className="text-lg md:text-2xl tracking-wider font-unbounded font-extrabold pointer-none pointer-events-none" >
                    LET’S GO!
                </span>

                <div className="flex items-center gap-2 md:gap-4">
                    <a
                        href="tel:+359000000000"
                        className="flex items-center gap-1 bg-black text-white rounded px-3 py-1 text-sm md:text-base transition-all hover:bg-white hover:text-black"
                    >
                        <Phone size={14} />
                    </a>

                    <a
                        href="mailto:contact@kaboom.bg"
                        className="flex items-center gap-1 bg-black text-white rounded px-3 py-1 text-sm md:text-base transition-all hover:bg-white hover:text-black"
                    >
                        <Mail size={14} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
