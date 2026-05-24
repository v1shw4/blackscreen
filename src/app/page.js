import HomeClient from '@/components/HomeClient';
import JsonLd from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blackscreen.watch';

export const metadata = {
  title: 'Discover & Watch Movies Free Online',
  description:
    'BlackScreen is your premium destination to discover and stream the latest movies for free. No sign-up required.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'BlackScreen — Discover & Watch Movies Free Online',
    description:
      'Stream the latest movies in HD for free. Sleek, premium, zero sign-up.',
    url: SITE_URL,
    type: 'website',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BlackScreen',
  url: SITE_URL,
  description: 'Free movie streaming platform with a premium experience.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <HomeClient />
    </>
  );
}
