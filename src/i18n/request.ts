import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';

// If you also define routing (see step 4), you can import it here
const locales = ['en', 'de', 'bg'] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale; // may be undefined
  const locale: Locale = hasLocale(locales, requested) ? (requested as Locale) : 'en';

  return {
    locale,
    // load messages from project-root /messages
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
