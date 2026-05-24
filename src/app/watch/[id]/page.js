import WatchClient from '@/components/WatchClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blackscreen.watch';

export async function generateMetadata({ params }) {
  const { id } = await params;

  let movieTitle = null;
  try {
    const res = await fetch(
      `https://moviesapi.to/api/movie/${id}`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data = await res.json();
      movieTitle = data?.data?.orig_title || data?.data?.title || null;
    }
  } catch {
    // fall back to generic title
  }

  const title = movieTitle ? `Watch ${movieTitle}` : 'Watch Movie';
  const description = movieTitle
    ? `Stream ${movieTitle} for free on BlackScreen — no sign-up needed.`
    : 'Stream this movie for free on BlackScreen — no sign-up needed.';

  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: { canonical: `${SITE_URL}/watch/${id}` },
    openGraph: {
      title: `${title} · BlackScreen`,
      description,
      url: `${SITE_URL}/watch/${id}`,
      type: 'video.movie',
    },
    twitter: {
      card: 'summary',
      title: `${title} · BlackScreen`,
      description,
    },
  };
}

export default async function WatchPage({ params }) {
  const { id } = await params;
  return <WatchClient id={id} />;
}
