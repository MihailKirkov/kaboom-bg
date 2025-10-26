// src/data/showcase.ts
export type ShowcaseItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: `/images/showcase/${string}`; // served from /public/images/showcase
};

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  { id: "01", title: "Фотография, стайлинг, анимация на продуктите", description: "Фотография, стайлинг, анимация на продуктите", imageSrc: "/images/showcase/01.jpg" },
  { id: "02", title: "Софийска баница лайв, Море от баница, Детекторна лъжата", description: "Софийска баница лайв, Море от баница, Детектор на лъжата", imageSrc: "/images/showcase/02.jpg" },
  { id: "03", title: "Цялостна идентичности дизайн, включително интериорни акценти", description: "Цялостна идентичност и дизайн, включително интериорни акценти", imageSrc: "/images/showcase/03.jpg" },
  { id: "04", title: "Рекламни кампании и съдържание в социалните мрежи", description: "Рекламни кампании и съдържание в социалните мрежи", imageSrc: "/images/showcase/04.jpg" },
  { id: "05", title: "Опаковки, брандировка на превозни средства", description: "Опаковки, брандировка на превозни средства", imageSrc: "/images/showcase/05.jpg" },
  { id: "06", title: "Извеждане на дигитална маркетингова стратегия, първата някога за фирмата", description: "Изграждане на дигитална маркетингова стратегия", imageSrc: "/images/showcase/06.jpg" },
  { id: "07", title: "Видео клипове", description: "Креатив, сценарий и продукция", imageSrc: "/images/showcase/07.jpg" },
  { id: "08", title: "Фотосесии", description: "Продуктова и лайфстайл фотография", imageSrc: "/images/showcase/08.jpg" },
  { id: "09", title: "Събития", description: "Организация и отразяване на събития", imageSrc: "/images/showcase/09.jpg" },
  { id: "10", title: "UI/UX", description: "Концепция, прототипиране и дизайн системи", imageSrc: "/images/showcase/10.jpg" },
  { id: "11", title: "Outdoor", description: "Билбордове и градско брандиране", imageSrc: "/images/showcase/11.jpg" },
  { id: "12", title: "PR и медии", description: "Планиране и разпространение", imageSrc: "/images/showcase/12.jpg" },
  { id: "13", title: "Анимации", description: "2D/3D motion за кампании", imageSrc: "/images/showcase/13.jpg" },
  { id: "14", title: "Copywriting", description: "Тонове, послания и слогани", imageSrc: "/images/showcase/14.jpg" },
  { id: "15", title: "Brand audit", description: "Анализ и препоръки за брандове", imageSrc: "/images/showcase/15.jpg" },
  { id: "16", title: "Еmail маркетинг", description: "Сегментация, автоматизации, A/B тестове", imageSrc: "/images/showcase/16.jpg" },
  { id: "17", title: "SEO/Content", description: "Оптимизация и съдържание", imageSrc: "/images/showcase/17.jpg" },
  { id: "18", title: "PPC", description: "Search, Display, Video кампании", imageSrc: "/images/showcase/18.jpg" },
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
