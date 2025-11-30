import type {Metadata} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type {Locale as I18nLocale} from '@/i18n'; // your existing Locale type
import Header from '@/components/Header';
import '@/app/globals.css';
import {kaboomDisplay, kaboomSans, kaboomLegacy, montserrat, verdana} from '@/app/fonts';

export const metadata: Metadata = {
  title: 'Kaboom.bg',
  description: 'description'
};

type Props = {
  children: React.ReactNode;
  // Next.js 15: params is a Promise
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale: rawLocale} = await params;

  // Validate the locale coming from the URL
  if (!hasLocale(routing.locales, rawLocale)) {
    notFound(); // never returns
  }
  const locale = rawLocale as I18nLocale;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${kaboomDisplay.variable} ${kaboomSans.variable} ${kaboomLegacy.variable} ${montserrat.variable} ${verdana.variable}`}
    >
      <body className="antialiased bg-zinc-900 text-white" suppressHydrationWarning>
        {/* Messages are provided via src/i18n/request.ts through the plugin */}
        <NextIntlClientProvider>
          <Header currentLocale={locale} />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Pre-generate pages for each supported locale
export function generateStaticParams() {
  return routing.locales.map((l) => ({locale: l}));
}
