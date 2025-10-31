export type Service = {
  id: string;
  iconSrc: `/icons/${string}`;
  iconRedSrc: `/icons-red/${string}`;
  previewSrc?: `/previews/${string}`;
};

export const SERVICES: Service[] = [
  { id: "strategy", iconSrc: "/icons/pawn.svg", iconRedSrc: "/icons-red/pawn.svg" },
  { id: "ai", iconSrc: "/icons/ai.svg", iconRedSrc: "/icons-red/ai.svg" },
  { id: "targeting", iconSrc: "/icons/ad.svg", iconRedSrc: "/icons-red/ad.svg" },
  { id: "email", iconSrc: "/icons/email-marketing.svg", iconRedSrc: "/icons-red/email-marketing.svg" },
  { id: "google", iconSrc: "/icons/google-ads.svg", iconRedSrc: "/icons-red/google-ads.svg" },
  { id: "design", iconSrc: "/icons/design.svg", iconRedSrc: "/icons-red/design.svg" },
  { id: "tv", iconSrc: "/icons/balloons.svg", iconRedSrc: "/icons-red/balloons.svg" },
  { id: "awards", iconSrc: "/icons/video.svg", iconRedSrc: "/icons-red/video.svg" }
];
