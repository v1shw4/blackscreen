import Header from '@/components/Header';
import { Tv } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blackscreen.watch';

export const metadata = {
  title: 'TV Series',
  description:
    'TV Series are coming soon to BlackScreen. Stay tuned for the best streaming experience of your favourite shows.',
  alternates: { canonical: `${SITE_URL}/tv` },
  openGraph: {
    title: 'TV Series · BlackScreen',
    description: 'TV Series coming soon to BlackScreen — stay tuned!',
    url: `${SITE_URL}/tv`,
    type: 'website',
  },
};

export default function TVSeries() {
  return (
    <>
      <Header />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        flex: 1,
        height: 'calc(100vh - 150px)',
      }}>
        <div className="glass-panel" style={{
          padding: '60px 40px',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}>
          <div style={{
            background: 'rgba(229, 9, 20, 0.1)',
            padding: '24px',
            borderRadius: '50%',
            boxShadow: '0 0 30px rgba(229, 9, 20, 0.2)',
          }}>
            <Tv size={64} color="var(--primary-red)" />
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>
            TV Series
          </h2>

          <div style={{
            background: 'var(--primary-red)',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            Coming Soon in Beta
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            We&apos;re working hard to bring you the best TV series experience. Stay tuned for updates!
          </p>
        </div>
      </div>
    </>
  );
}
