export type ClientReview = {
  id: string;
  name: string;
  fullName: string;
  avatar: string; // image path from /public/images/clients/
  quote: string;
};

export const CLIENT_REVIEWS = [
  { id: "review-1", avatar: "/images/clients/MagdalenaAndonova.webp" },
  { id: "review-2", avatar: "/images/clients/AndonAndonov.webp" },
  { id: "review-3", avatar: "/images/clients/MikeBeottcher.webp" },
  { id: "review-4", avatar: "/images/clients/LauraZimmermann.webp" },
  { id: "review-5", avatar: "/images/clients/ReginaTessmann.webp" },
  { id: "review-6", avatar: "/images/clients/NikolaIvanov.webp" }
];