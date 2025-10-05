// data/formats.ts

export type FormatItem = {
  id: string;
  title: string;
  description: string;
  youtubeId: string; // YouTube video ID for embedding
};

export const FORMATS: FormatItem[] = [
  {
    id: '1',
    title: 'Kaboom Talks',
    description: 'Интервюта с интересни личности, без цензура.',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: '2',
    title: 'Real Reels',
    description: 'Истински истории. Реални хора. Емоции без филтър.',
    youtubeId: '3JZ_D3ELwOQ',
  },
  {
    id: '3',
    title: 'Brand Pulse',
    description: 'Разбиваме сърцето на всяка марка. Виж нейния пулс.',
    youtubeId: 'M7FIvfx5J10',
  },
  {
    id: '4',
    title: 'Behind the Boom',
    description: 'Поглед зад кулисите на всяко Kaboom произведение.',
    youtubeId: '6_b7RDuLwcI',
  },
  {
    id: '5',
    title: 'Creative Cuts',
    description: 'Най-добрите творчески експерименти на едно място.',
    youtubeId: 'C0DPdy98e4c',
  },
  {
    id: '6',
    title: 'Client Chronicles',
    description: 'Истории от първо лице за съвместната ни работа.',
    youtubeId: 'wZZ7oFKsKzY',
  },
  {
    id: '7',
    title: 'Motion Lab',
    description: 'Късометражки и визуални експерименти с движение.',
    youtubeId: 'YbJOTdZBX1g',
  },
  {
    id: '8',
    title: 'Sound & Vision',
    description: 'Формат, в който музиката среща визията.',
    youtubeId: 'hY7m5jjJ9mM',
  },
];
