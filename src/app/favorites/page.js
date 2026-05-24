import FavoritesClient from '@/components/FavoritesClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blackscreen.watch';

export const metadata = {
  title: 'My Favourites',
  description:
    'Your saved movies on BlackScreen. Access all your favourite films in one place — no account needed.',
  alternates: { canonical: `${SITE_URL}/favorites` },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'My Favourites · BlackScreen',
    description: 'Your saved movies on BlackScreen.',
    url: `${SITE_URL}/favorites`,
    type: 'website',
  },
};

export default function Favorites() {
  return <FavoritesClient />;
}
