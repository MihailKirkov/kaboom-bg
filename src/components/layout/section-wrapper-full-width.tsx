import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Props = {
    children: ReactNode;
    className?: string;           // Optional section-wide classes (background etc)
    background?: ReactNode;       // Optional background image/video
} & HTMLAttributes<HTMLElement>;

export default function SectionWrapperFullWidth({
    children,
    className,
    background,
    ...rest
}: Props) {
    return (
        <section
            {...rest}
            className={clsx(
                "relative w-full overflow-hidden min-h-screen flex flex-col justify-center text-center",
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
        </section>
    );
}
