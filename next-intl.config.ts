// next-intl.config.ts
import {getRequestConfig} from 'next-intl/server';

const SUPPORTED = ['en', 'de', 'bg'] as const;
type Supported = typeof SUPPORTED[number];

export default getRequestConfig(async ({locale}) => {
  // 1) Guard undefined
  const incoming = typeof locale === 'string' ? locale : 'en';

  // 2) Validate against supported
  const safe: Supported = (SUPPORTED as readonly string[]).includes(incoming)
    ? (incoming as Supported)
    : 'en';

  return {
    locale: safe,
    messages: (await import(`./src/messages/${safe}.json`)).default
  };
});
