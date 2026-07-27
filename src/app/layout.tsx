import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter, Geist } from 'next/font/google';
import type { Metadata } from 'next';
import { cn } from "@/lib/utils";
import { Banner } from 'fumadocs-ui/components/banner';
import Link from 'fumadocs-core/link';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  metadataBase: new URL('https://serpdoc.vercel.app'),
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
    <html lang="en" className={cn(inter.className, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Banner id="earlybird" variant="rainbow">
          Earlybird offer — <Link target='_blank' href="https://www.serphouse.com/pricing?utm=documentation" className="underline font-medium">grab 10% off your first month</Link>
        </Banner>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
