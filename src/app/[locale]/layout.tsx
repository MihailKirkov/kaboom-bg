import type {Metadata} from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import { kaboomDisplay, kaboomSans, kaboomLegacy } from '@/app/fonts';

export const metadata: Metadata = {
  title: 'Kaboom.bg',
  description: 'description'
};

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  return (
    <html lang={locale} suppressHydrationWarning
      className={`${kaboomDisplay.variable} ${kaboomSans.variable} ${kaboomLegacy.variable}`}
    >
      <body className="antialiased bg-zinc-900 text-white" suppressHydrationWarning>
        <NextIntlClientProvider>
          <Header currentLocale={locale as any} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
// Optional: static rendering
export function generateStaticParams() {
  return routing.locales.map((l) => ({locale: l}));
}
