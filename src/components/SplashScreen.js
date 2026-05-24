"use client";

import { useEffect, useState } from 'react';

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Show splash for 2.5 seconds, then fade out
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 2500);

    const finishTimer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 3000); // 500ms for fade out transition

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  if (!visible) return null;

  const text = "BlackScreen";

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'var(--bg-black)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: opacity,
      transition: 'opacity 0.5s ease-out',
      flexDirection: 'column'
    }}>
      <div style={{ position: 'relative' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '4px',
          margin: 0,
          display: 'flex'
        }}>
          {text.split('').map((char, index) => (
            <span
              key={index}
              style={{
                color: 'transparent',
                background: 'linear-gradient(90deg, var(--primary-red) 0%, rgba(255,255,255,0.9) 50%, var(--primary-red) 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                animation: `shimmer 2s ease-in-out infinite`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animationFillMode: 'forwards',
                display: 'inline-block'
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          0% { background-position: -100% center; opacity: 0; filter: blur(4px); transform: translateY(10px); }
          20% { opacity: 1; filter: blur(0px); transform: translateY(0); }
          100% { background-position: 200% center; opacity: 1; filter: blur(0px); transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
