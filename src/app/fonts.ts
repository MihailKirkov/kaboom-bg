import localFont from "next/font/local";

// Display / Headline (prefer a variable font if available)
export const kaboomDisplay = localFont({
    src: [
        // variable first (smooth weight transitions)
        { path: "../../public/fonts/Unbounded-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
        // fallback heavy static
        // { path: "../../public/fonts/Montserrat-ExtraBold.ttf", weight: "800", style: "normal" }
    ],
    variable: "--font-display",
    display: "swap",
    preload: true
});

// Body text (proprietary example — ensure you’re licensed)
export const kaboomSans = localFont({
    src: [
        { path: "../../public/fonts/MyriadPro-Regular.otf", weight: "400", style: "normal" },
        { path: "../../public/fonts/MyriadPro-Bold.otf",    weight: "700", style: "normal" }
    ],
    variable: "--font-sans",
    display: "swap",
    preload: true,
    // sensible fallbacks
    fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"]
});

// Optional: a “legacy”
export const kaboomLegacy = localFont({
    src: [
        { path: "../../public/fonts/verdana.ttf",  weight: "400", style: "normal" },
        { path: "../../public/fonts/verdanab.ttf", weight: "700", style: "normal" }
    ],
    variable: "--font-verdana",
    display: "swap",
    preload: false
});

export const verdana = localFont({
    src: [
        { path: "../../public/fonts/verdana.ttf",  weight: "400", style: "normal" },
        { path: "../../public/fonts/verdanab.ttf", weight: "700", style: "normal" }
    ],
    variable: "--font-verdana",
    display: "swap",
    preload: false
});

export const montserrat = localFont({
    src: [
        { path: "../../public/fonts/Montserrat-ExtraBold.ttf", weight: "800", style: "normal" },
    ],
    variable: "--font-montserrat",
    display: "swap",
    preload: true
});
