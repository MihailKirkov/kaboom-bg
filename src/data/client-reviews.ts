// /data/client-reviews.ts

export type ClientReview = {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string; // image path from /public/images/clients/
  quote: string;
};

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: "review-1",
    name: "Магдалена Андонова",
    position: "Маркетинг мениджър",
    company: "ERA Недвижими Имоти",
    avatar: "/images/clients/magdalena.png",
    quote:
      "Малко обяснително текстче към този текстови блок. Малко обяснително текстче към този текстови блок.",
  },
  {
    id: "review-2",
    name: "Иван Петров",
    position: "CEO",
    company: "TechNova",
    avatar: "/images/clients/ivan.png",
    quote:
      "Работата с Kaboom беше невероятна. Те предоставиха точно това, от което имахме нужда.",
  },
  {
    id: "review-3",
    name: "Елица Георгиева",
    position: "Директор Маркетинг",
    company: "FreshCorp",
    avatar: "/images/clients/elitsa.png",
    quote:
      "Креативен екип с професионално отношение. Препоръчвам ги силно!",
  },
];
