export const locales = ['en', 'de', 'bg'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';