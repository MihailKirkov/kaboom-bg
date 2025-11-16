export type Service = {
  id: string;
  iconSrc: `/icons/${string}`;
  iconRedSrc: `/icons-red/${string}`;
  previewSrc: `/images/services/${string}`;
};

export const SERVICES: Service[] = [
  { id: "strategy", iconSrc: "/icons/pawn.svg", iconRedSrc: "/icons-red/pawn.svg", previewSrc:"/images/services/01_Marketing_Strategy.webp" },
  { id: "ai", iconSrc: "/icons/ai.svg", iconRedSrc: "/icons-red/ai.svg", previewSrc:"/images/services/02_AI.webp" },
  { id: "targeting", iconSrc: "/icons/ad.svg", iconRedSrc: "/icons-red/ad.svg", previewSrc:"/images/services/03_Targeted_Campaigns.webp" },
  { id: "email", iconSrc: "/icons/email-marketing.svg", iconRedSrc: "/icons-red/email-marketing.svg", previewSrc:"/images/services/04_Email_Marketing.webp" },
  { id: "google", iconSrc: "/icons/google-ads.svg", iconRedSrc: "/icons-red/google-ads.svg", previewSrc:"/images/services/05_Google_Ads.webp" },
  { id: "design", iconSrc: "/icons/web-design.svg", iconRedSrc: "/icons-red/design.svg", previewSrc:"/images/services/06_Graphic_Design.webp" },
  { id: "tv", iconSrc: "/icons/balloons.svg", iconRedSrc: "/icons-red/balloons.svg", previewSrc:"/images/services/07_TVCs.webp" },
  { id: "awards", iconSrc: "/icons/video.svg", iconRedSrc: "/icons-red/video.svg", previewSrc:"/images/services/08_Award_winning_Video.webp" },
];
