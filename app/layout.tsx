import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { JetBrains_Mono } from 'next/font/google';
import { Header, Footer, Sidebar } from '@/components/Chrome';
import './globals.css';
import './logo.css';
import './legal.css';
import './insurance.css';

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

const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--mono', display: 'swap' });

export const viewport: Viewport = { themeColor: '#04070d', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>
        <div className="app">
          <Sidebar />
          <div className="pane">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </div>
        <div className="scan" aria-hidden />
        <Analytics />
      </body>
    </html>
  );
}
