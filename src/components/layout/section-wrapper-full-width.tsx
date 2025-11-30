import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Props = {
    children: ReactNode;
    className?: string;           // Optional section-wide classes (background etc)
    background?: ReactNode;       // Optional background image/video
    footerContent?: ReactNode;    // content pinned at section bottom
    footerClassName?: string;
} & HTMLAttributes<HTMLElement>;

export default function SectionWrapperFullWidth({
    children,
    className,
    background,
    footerContent,
    footerClassName,
    ...rest
}: Props) {
    return (
        <section
            {...rest}
            className={clsx(
                "relative w-full overflow flex flex-col justify-center text-center",
                className
            )}
        >
            {/* Background Layer */}
            {background && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {background}
                </div>
            )}

            {/* Content (no max-width constraints) */}
            <div className="relative z-10 w-full">{children}</div>
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
