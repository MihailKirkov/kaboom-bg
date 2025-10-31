'use client';

import SafeImage from '@/components/shared/safe-image';
import { SHOWCASE_ITEMS } from '@/data/showcase';
import { motion } from 'framer-motion';

type Props = {
  item: typeof SHOWCASE_ITEMS[number] & {
    title: string;
    description?: string;
  };
  onOpen: () => void;
  index?: number;
};

export default function ShowcaseCard({ item, onOpen, index = 0 }: Props) {
  const animationDelay = index * 0.08;

  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.01,
        borderColor: 'rgba(239, 68, 68, 1)',
        transition: { delay: 0 },
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16, delay: animationDelay }}
      className="h-full bg-black/90 border border-white/50 rounded-xl flex flex-col items-center justify-start gap-2 p-2 text-center"
    >
      <div className="w-full h-40 relative">
        <SafeImage
          src={item.imageSrc}
          alt={item.title}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="text-md leading-5 px-2 text-white font-medium">
        {item.title}
      </div>
    </motion.button>
  );
}
