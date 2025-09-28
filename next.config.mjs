import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(); // uses src/i18n/request.ts by default

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your Next config here
};

export default withNextIntl(nextConfig);