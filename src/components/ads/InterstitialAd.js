"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Google AdSense Interstitial / Full-Screen Ad
 *
 * Shows a 5-second forced countdown, then allows the user to close.
 * The ad slot renders a 300×600 "half page" AdSense unit.
 *
 * Replace the values below with your own from AdSense:
 *   data-ad-client  → your Publisher ID  (ca-pub-XXXXXXXXXXXXXXXX)
 *   data-ad-slot    → your Ad Unit slot  (XXXXXXXXXX)
 */
export default function InterstitialAd({ onClose }) {
  const [countdown, setCountdown] = useState(5);
  const pushed = useRef(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Push ad once after component mounts
  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense InterstitialAd error:', e);
    }
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'blur(15px)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Close Button / Countdown */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {countdown > 0 ? (
          <span
            style={{
              color: 'var(--text-secondary)',
              background: 'rgba(255,255,255,0.1)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '14px',
            }}
          >
            Ad closes in {countdown}s
          </span>
        ) : (
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid var(--glass-border)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            aria-label="Close ad"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* AdSense 300×600 Half Page Unit */}
      <div
        className="interstitial-ad-wrapper"
        style={{
          width: '300px',
          maxWidth: '100%',
          minHeight: '250px',
          maxHeight: '80vh',
          background: 'rgba(20,20,20,0.8)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-height: 700px) {
          .interstitial-ad-wrapper {
            min-height: 250px !important;
            height: auto !important;
          }
        }
      `}} />
    </div>
  );
}
