'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import SafeImage from '@/components/shared/safe-image';
import { SHOWCASE_ITEMS } from '@/data/showcase';
import { motion } from 'framer-motion';

type Props = {
  item: typeof SHOWCASE_ITEMS[number];
  onOpen: () => void;
  index?: number; // optional index for stagger
};

export default function ShowcaseCard({ item, onOpen, index = 0 }: Props) {
  const animationDelay = index * 0.08; // 80ms between each card

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          onClick={onOpen}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16, delay: animationDelay }}
          className="h-max bg-black/30 border border-white/10 rounded-xl aspect-1 flex flex-col items-center justify-start gap-2 p-4 hover:bg-white/5 text-center"
        >
          <div className="w-full h-40 relative mb-4">
            <SafeImage
              src={item.imageSrc}
              alt={item.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <div className="text-md leading-5 px-2 text-white font-medium">{item.title}</div>
        </motion.button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <div className="text-lg font-bold mb-2">{item.title}</div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </DialogContent>
    </Dialog>
  );
}
