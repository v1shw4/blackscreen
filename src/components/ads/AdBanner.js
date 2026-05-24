"use client";

import React, { useEffect, useRef } from 'react';

/**
 * Google AdSense Banner Ad
 * Renders an auto-sized responsive display ad unit.
 *
 * Replace the values below with your own from AdSense:
 *   data-ad-client  → your Publisher ID  (ca-pub-XXXXXXXXXXXXXXXX)
 *   data-ad-slot    → your Ad Unit slot  (XXXXXXXXXX)
 */
export default function AdBanner({ style }) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    // Guard: only push once per mount, and only when adsbygoogle is available.
    if (pushed.current) return;
    pushed.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense AdBanner error:', e);
    }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '90px',
        margin: '20px 0',
        overflow: 'hidden',
        ...style,
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
