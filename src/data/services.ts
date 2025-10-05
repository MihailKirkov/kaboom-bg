// Central source of truth for Services
export type Service = {
  id: string;
  title: string;
  blurb: string;
  iconSrc: `/icons/${string}`;        // SVG path from /public/icons
  iconRedSrc: `/icons-red/${string}`;        // SVG path from /public/icons
  // Optionally, provide preview media for the center gray box (future)
  previewSrc?: `/previews/${string}`; // e.g. /previews/email.jpg
};

export const SERVICES: Service[] = [
  {
    id: "strategy",
    title: "МАРКЕТИНГОВА СТРАТЕГИЯ",
    iconSrc: "/icons/pawn.svg",
    iconRedSrc: "/icons-red/pawn.svg",
    blurb:
      "Малко обяснително текстче към този текстови блок. Малко обяснително текстче към този блок.",
  },
  {
    id: "ai",
    title: "МАЙСТОРСКИ AI (ИЗКУСТВЕН ИНТЕЛЕКТ)",
    iconSrc: "/icons/ai.svg",
    iconRedSrc: "/icons-red/ai.svg",
    blurb:
      "Малко обяснително текстче към този текстови блок.  Малко обяснително текстче към този блок.",
  },
  {
    id: "targeting",
    title: "ТАРГЕТИРАНИ РЕКЛАМНИ КАМПАНИИ",
    iconSrc: "/icons/ad.svg",
    iconRedSrc: "/icons-red/ad.svg",
    blurb:
      "Малко обяснително текстче към този текстови блок.  Малко обяснително текстче към този блок.",
  },
  {
    id: "email",
    title: "ЕФЕКТИВЕН ИМЕЙЛ-МАРКЕТИНГ",
    iconSrc: "/icons/email-marketing.svg",
    iconRedSrc: "/icons-red/email-marketing.svg",
    blurb:
      "Малко обяснително текстче към този текстови блок.  Малко обяснително текстче към този блок.",
  },
  {
    id: "google",
    title: "РЕКЛАМА В GOOGLE (SEARCH, YOUTUBE, DISPLAY)",
    iconSrc: "/icons/google-ads.svg",
    iconRedSrc: "/icons-red/google-ads.svg",
    blurb:
      "Малко обяснително текстче към този текстови блок.  Малко обяснително текстче към този блок.",
  },
  {
    id: "design",
    title: "ГРАФИЧЕН И УЕБ-ДИЗАЙН НА СВЕТОВНО НИВО",
    iconSrc: "/icons/design.svg",
    iconRedSrc: "/icons-red/design.svg",
    blurb:
      "Малко обяснително текстче към този текстови блок.  Малко обяснително текстче към този блок.",
  },
  {
    id: "tv",
    title: "TV, РАДИО, OOH И BTL-КАМПАНИИ",
    iconSrc: "/icons/balloons.svg",
    iconRedSrc: "/icons-red/balloons.svg",
    blurb:
      "Малко обяснително текстче към този текстови блок.  Малко обяснително текстче към този блок.",
  },
  {
    id: "awards",
    title: "МЕЖДУНАРОДНИ НАГРАДИ ЗА ВИДЕО",
    iconSrc: "/icons/video.svg",
    iconRedSrc: "/icons-red/video.svg",
    blurb:
      "Малко обяснително текстче към този текстови блок.  Малко обяснително текстче към този блок.",
  },
];
