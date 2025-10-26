// components/layout/SectionWrapper.tsx

import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;           // Section wrapper (for layout/flex/bg)
  innerClassName?: string;      // Inner container (for width, text alignment, etc.)
  background?: ReactNode;       // Optional background image/video\
  footerContent?: ReactNode;    // content pinned at section bottom
  footerClassName?: string;
} & HTMLAttributes<HTMLElement>; // allows aria-label, id, etc.

export default function SectionWrapper({
  children,
  className,
  innerClassName,
  background,
  footerContent,
  footerClassName
}: Props) {
  return (
    <section
      className={clsx(
        "relative min-h-screen flex flex-col items-center justify-center text-center p-4",
        className
      )}
    >
      {/* Background Layer */}
      {background && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {background}
        </div>
      )}

      {/* Content Container */}
      <div
        className={clsx(
          "relative z-10 w-full max-w-6xl px-4 sm:px-6 mx-auto",
          innerClassName
        )}
      >
        {children}
      </div>
      {/* Footer Slot pinned to section bottom */}
      {footerContent && (
        <div
          className={clsx(
            "absolute inset-x-0 bottom-0 z-20 flex items-center justify-center",
            footerClassName
          )}
        >
          {footerContent}
        </div>
      )}
    </section>
  );
}
