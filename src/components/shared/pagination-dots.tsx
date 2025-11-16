"use client";

import { motion } from "framer-motion";

type Props = {
    total: number;
    current: number;
    onChange: (index: number) => void;
    className?: string;
    navClassname?: string;
    style?: React.CSSProperties;
};

export default function PaginationDots({
    total,
    current,
    onChange,
    className = '',
    navClassname = '',
    style,
}: Props) {
    const baseInactive = 'bg-black hover:bg-white/50';
    const baseActive = 'bg-white hover:bg-white/70';

    return (
        <div className={`flex justify-center gap-2 ${className}`} style={style}>
            <nav 
                className={navClassname.length > 0 ? navClassname : `relative z-10 mt-6 flex items-center gap-2 bg-red-600 rounded-md py-1 px-2`} 
                aria-label="Пейджинг"
            >
                {Array.from({ length: total }).map((_, i) => {
                    const isActive = i === current;

                    return (
                        <motion.button
                            key={i}
                            onClick={() => onChange(i)}
                            aria-label={`Към страница ${i + 1}`}
                            initial={false}
                            animate={{
                                scale: isActive ? 1.25 : 1,
                                opacity: isActive ? 1 : 0.5,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}
                            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                                isActive ? baseActive : baseInactive
                            }`}
                        />
                    );
                })}
            </nav>
        </div>
    );
}
