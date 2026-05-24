const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blackscreen.watch';

export default function sitemap() {
  const now = new Date().toISOString();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/tv`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/favorites`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
