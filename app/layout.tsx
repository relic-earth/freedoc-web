import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Header, Footer } from '@/components/Chrome';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://freedoc.live'),
  title: 'FreeDoc — Should I go to the ER? Free symptom check',
  description: 'Answer a few quick questions and get a clear answer: treat at home, see a doctor, urgent care today, or the ER now. Free, private, no account.',
  openGraph: {
    title: 'FreeDoc — Should I go to the ER?',
    description: 'A clear answer in 60 seconds. Free, private, no account.',
    url: 'https://freedoc.live',
    siteName: 'FreeDoc',
    images: [{ url: '/api/og', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/api/og'] },
};

export const viewport: Viewport = { themeColor: '#fbfaf7', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
