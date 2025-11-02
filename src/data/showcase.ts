export type ShowcaseItem = {
  id: string;
  imageSrc: `/images/showcase/${string}`;
};

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  { id: "01", imageSrc: "/images/showcase/01.jpg" },
  { id: "02", imageSrc: "/images/showcase/02.jpg" },
  { id: "03", imageSrc: "/images/showcase/03.jpg" },
  { id: "04", imageSrc: "/images/showcase/04.jpg" },
  { id: "05", imageSrc: "/images/showcase/05.jpg" },
  { id: "06", imageSrc: "/images/showcase/06.jpg" },
  { id: "07", imageSrc: "/images/showcase/07.jpg" },
  { id: "08", imageSrc: "/images/showcase/08.jpg" },
  { id: "09", imageSrc: "/images/showcase/09.jpg" },
  { id: "10", imageSrc: "/images/showcase/10.jpg" },
  { id: "11", imageSrc: "/images/showcase/11.jpg" },
  { id: "12", imageSrc: "/images/showcase/12.jpg" },
  { id: "13", imageSrc: "/images/showcase/13.jpg" },
  { id: "14", imageSrc: "/images/showcase/14.jpg" },
  { id: "15", imageSrc: "/images/showcase/15.jpg" },
  { id: "16", imageSrc: "/images/showcase/16.jpg" },
  { id: "17", imageSrc: "/images/showcase/17.jpg" },
  { id: "18", imageSrc: "/images/showcase/18.jpg" }
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
