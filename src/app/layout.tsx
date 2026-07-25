import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

const title = 'SERPHouse';
const description = 'SERP API documentation — access search results from Google, Bing, Yahoo, and more through a unified REST API. Build SEO tools, monitor rankings, and automate competitive research.';

export const metadata: Metadata = {
  title: {
    template: `%s — ${title}`,
    default: `${title} — SERP API Documentation`,
  },
  description,
  metadataBase: new URL('https://serphouse.com'),
  openGraph: {
    title: {
      template: `%s — ${title}`,
      default: `${title} — SERP API Documentation`,
    },
    description,
    siteName: title,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@serphouse',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
