"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Tv } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Favourites', path: '/favorites', icon: Heart },
    { name: 'TV Series', path: '/tv', icon: Tv },
  ];

  return (
    <nav className="glass" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '12px 20px',
      paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
      zIndex: 1000,
      borderTop: '1px solid var(--glass-border)',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: 'none'
    }}>
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        
        // Use a native <a> tag for Home to force a full reload and show the splash screen
        const NavLink = item.path === '/' ? 'a' : Link;
        
        return (
          <NavLink href={item.path} key={item.name} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: isActive ? 'var(--primary-red)' : 'var(--text-secondary)',
            transition: 'color 0.2s ease',
            textDecoration: 'none'
          }}>
            <item.icon size={24} style={{ marginBottom: '4px' }} strokeWidth={isActive ? 2.5 : 2} />
            <span style={{ fontSize: '12px', fontWeight: isActive ? 600 : 400 }}>{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
