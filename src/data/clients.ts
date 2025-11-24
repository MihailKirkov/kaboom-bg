export type Client = {
    id: string;
    name: string;
    logo: `/logos/${string}`; // Relative path to logo (in /public/logos)
};

export const CLIENTS: Client[] = [
    { id: "logo1", name: "Avene", logo: "/logos/avene.svg" },
    { id: "logo2", name: "Era", logo: "/logos/era.svg" },
    { id: "logo3", name: "Greenpeace", logo: "/logos/greenpeace.svg" },
    { id: "logo4", name: "Sofiiska Banitsa", logo: "/logos/sofiiska-banitsa.svg" },
    { id: "logo5", name: "Furterer", logo: "/logos/furterer.svg" },
    { id: "logo6", name: "LR Health & Beauty", logo: "/logos/LR.svg" },
    { id: "logo7", name: "Trastena", logo: "/logos/trastena.svg" },
    { id: "logo8", name: "Hill Clinic", logo: "/logos/hill-clinic.svg" },
    { id: "logo9", name: "Ducray", logo: "/logos/ducray.svg" },
    { id: "logo10", name: "Creditera.BG", logo: "/logos/creditera.svg" },
];
