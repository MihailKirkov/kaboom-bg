
import Image from "next/image";
import { useState } from "react";

const FALLBACK_DATA_URI =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200">
        <rect width="100%" height="100%" fill="#f5f5f5"/>
        <g fill="#f3f3f3" stroke="#ccc" stroke-width="10" stroke-dasharray="10,10">
            <rect x="5" y="10" width="310" height="180"/>
        </g>
    </svg>`
);


export default function SafeImage(
    props: Omit<React.ComponentProps<typeof Image>, "onError" | "src"> & {
        src: `/images/showcase/${string}`;
    }
) {
    const { src, alt, ...rest } = props;
    const [fallback, setFallback] = useState<string | null>(null);

    return (
        <Image
        src={fallback ?? src}
        alt={alt}
        onError={() => setFallback(FALLBACK_DATA_URI)}
        {...rest}
        />
    );
}