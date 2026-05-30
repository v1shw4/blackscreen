'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      padding: '3rem 1rem 2rem 1rem',
      backgroundColor: 'transparent',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#aaa',
      textAlign: 'center',
      fontSize: '0.9rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <Link href="/privacy-policy" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#E50914'} onMouseOut={(e) => e.target.style.color = '#fff'}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#E50914'} onMouseOut={(e) => e.target.style.color = '#fff'}>
            Terms of Service
          </Link>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>Contact Us</p>
          <p style={{ margin: 0 }}>
            <a href="tel:+94770796435" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>+94 77 079 6435</a>
          </p>
          <p style={{ margin: 0 }}>
            <a href="mailto:contact@blackscreen.watch" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>contact@blackscreen.watch</a>
          </p>
          <p style={{ margin: 0 }}>
            <a href="https://www.blackscreen.watch" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>www.blackscreen.watch</a>
          </p>
        </div>

        <p style={{ margin: '1rem 0 0 0', fontSize: '0.8rem', opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} BlackScreen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
