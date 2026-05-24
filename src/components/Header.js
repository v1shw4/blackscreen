import Link from 'next/link';

export default function Header() {
  return (
    <header className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '12px 20px',
      borderBottom: '1px solid var(--glass-border)',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 480px) {
          .header-title { font-size: 22px !important; }
          .header-tagline { font-size: 10px !important; }
        }
      `}} />
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 className="header-title" style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--primary-red)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          margin: 0,
          textShadow: '0 2px 10px rgba(229, 9, 20, 0.4)',
          transition: 'font-size 0.3s ease',
        }}>
          BlackScreen
        </h1>
        <span className="header-tagline" style={{
          color: '#fff',
          fontSize: '12px',
          fontWeight: 300,
          marginTop: '2px',
          letterSpacing: '0.5px',
          textAlign: 'center',
          transition: 'font-size 0.3s ease',
        }}>
          Easiest go for your favourite show
        </span>
      </Link>
    </header>
  );
}
