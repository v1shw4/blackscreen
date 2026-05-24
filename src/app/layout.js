import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Script from "next/script";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blackscreen.watch';

export const viewport = {
  themeColor: '#E50914',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BlackScreen — Watch Movies Free Online',
    template: '%s · BlackScreen',
  },
  description:
    'BlackScreen is your premium destination to discover and stream the latest movies for free. Enjoy a sleek, ad-light experience with zero sign-up.',
  keywords: [
    'watch movies online',
    'free movies',
    'stream movies',
    'blackscreen',
    'movie streaming',
    'HD movies',
    'latest movies 2025',
  ],
  authors: [{ name: 'BlackScreen' }],
  creator: 'BlackScreen',
  publisher: 'BlackScreen',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'BlackScreen',
    title: 'BlackScreen — Watch Movies Free Online',
    description:
      'Discover and stream the latest movies for free on BlackScreen. Premium experience, zero sign-up.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BlackScreen — Watch Movies Free Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlackScreen — Watch Movies Free Online',
    description:
      'Discover and stream the latest movies for free on BlackScreen.',
    images: ['/og-image.png'],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense — replace publisher ID with your own */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4066137614961526"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <main style={{ paddingBottom: '70px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
