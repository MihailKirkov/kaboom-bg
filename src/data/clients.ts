export type Client = {
    id: string;
    name: string;
    logo: `/logos/${string}`; // Relative path to logo (in /public/logos)
};

export const CLIENTS: Client[] = [
    { id: "logo1", name: "Клиент 1", logo: "/logos/placeholder.svg" },
    { id: "logo2", name: "Клиент 2", logo: "/logos/placeholder.svg" },
    { id: "logo3", name: "Клиент 3", logo: "/logos/placeholder.svg" },
    { id: "logo4", name: "Клиент 4", logo: "/logos/placeholder.svg" },
    { id: "logo5", name: "Клиент 5", logo: "/logos/placeholder.svg" },
    { id: "logo6", name: "Клиент 6", logo: "/logos/placeholder.svg" },
    { id: "logo7", name: "Клиент 7", logo: "/logos/placeholder.svg" },
    { id: "logo8", name: "Клиент 8", logo: "/logos/placeholder.svg" },
];
