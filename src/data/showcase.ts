export type ShowcaseItem = {
  id: string;
  previewSrc: `/images/showcase/small/${string}`;
  videoSrc: `/videos/showcase/big/${string}`;
};

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  { id: "01", previewSrc: "/images/showcase/small/Layer 1.png", videoSrc: "/videos/showcase/big/Section_3_Element_1.mp4" },
  { id: "02", previewSrc: "/images/showcase/small/Layer 2.png", videoSrc: "/videos/showcase/big/Section_3_Element_2.mp4" },
  { id: "03", previewSrc: "/images/showcase/small/Layer 3.png", videoSrc: "/videos/showcase/big/Section_3_Element_3.mp4" },
  { id: "04", previewSrc: "/images/showcase/small/Layer 4.png", videoSrc: "/videos/showcase/big/Section_3_Element_4.mp4" },
  { id: "05", previewSrc: "/images/showcase/small/Layer 5.png", videoSrc: "/videos/showcase/big/Section_3_Element_5.mp4" },
  { id: "06", previewSrc: "/images/showcase/small/Layer 6.png", videoSrc: "/videos/showcase/big/Section_3_Element_6.mp4" },
  { id: "07", previewSrc: "/images/showcase/small/Layer 7.png", videoSrc: "/videos/showcase/big/Section_3_Element_7.mp4" },
  { id: "08", previewSrc: "/images/showcase/small/Layer 8.png", videoSrc: "/videos/showcase/big/Section_3_Element_8.mp4" },
  { id: "09", previewSrc: "/images/showcase/small/Layer 9.png", videoSrc: "/videos/showcase/big/Section_3_Element_9.mp4" },
  { id: "10", previewSrc: "/images/showcase/small/Layer 10.png", videoSrc: "/videos/showcase/big/Section_3_Element_10.mp4" },
  { id: "11", previewSrc: "/images/showcase/small/Layer 11.png", videoSrc: "/videos/showcase/big/Section_3_Element_11.mp4" },
  { id: "12", previewSrc: "/images/showcase/small/Layer 12.png", videoSrc: "/videos/showcase/big/Section_3_Element_12.mp4" },
  { id: "13", previewSrc: "/images/showcase/small/Layer 13.png", videoSrc: "/videos/showcase/big/Section_3_Element_13.mp4" },
  { id: "14", previewSrc: "/images/showcase/small/Layer 14.png", videoSrc: "/videos/showcase/big/Section_3_Element_14.mp4" },
  { id: "15", previewSrc: "/images/showcase/small/Layer 15.png", videoSrc: "/videos/showcase/big/Section_3_Element_15.mp4" },
  { id: "16", previewSrc: "/images/showcase/small/Layer 16.png", videoSrc: "/videos/showcase/big/Section_3_Element_16.mp4" },
  { id: "17", previewSrc: "/images/showcase/small/Layer 17.png", videoSrc: "/videos/showcase/big/Section_3_Element_17.mp4" },
  { id: "18", previewSrc: "/images/showcase/small/Layer 18.png", videoSrc: "/videos/showcase/big/Section_3_Element_18.mp4" },
];

export function chunkToPages<T>(arr: T[], size = 6): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
}

export function chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}
