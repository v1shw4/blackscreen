"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import InterstitialAd from '@/components/ads/InterstitialAd';

export default function WatchClient({ id }) {
  const [adDismissed, setAdDismissed] = useState(false);

  return (
    <>
      <Header />
      <div className="watch-container" style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 70px)' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 768px) {
            .watch-container { height: auto !important; }
            .player-wrapper { 
              height: auto !important; 
              aspect-ratio: 16/9 !important;
            }
            .back-link-container {
              padding: 12px 16px !important;
            }
          }
        `}} />
        <div className="back-link-container" style={{ padding: '16px 20px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-secondary)',
              fontSize: '14px',
              transition: 'color 0.2s ease',
            }}
            className="back-link"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div style={{
          flex: 1,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          paddingBottom: '20px',
        }}>
          <div className="glass-panel player-wrapper" style={{
            width: '100%',
            height: 'calc(100vh - 200px)',
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
          }}>
            {/* Interstitial ad shown before the movie loads */}
            {!adDismissed && (
              <InterstitialAd onClose={() => setAdDismissed(true)} />
            )}

            {/* Movie iframe — always mounted so it preloads behind the ad */}
            <iframe
              src={`https://moviesapi.to/movie/${id}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                visibility: adDismissed ? 'visible' : 'hidden',
              }}
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </>
  );
}
