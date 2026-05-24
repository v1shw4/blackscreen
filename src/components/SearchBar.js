"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import InterstitialAd from './ads/InterstitialAd';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [showAd, setShowAd] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length >= 3) {
      // 30% chance to show a full screen ad on search
      if (Math.random() < 0.3) {
        setShowAd(true);
      }
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 480px) {
          .search-input { 
            padding: 12px 16px 12px 40px !important; 
            font-size: 14px !important; 
          }
          .search-btn {
            padding: 6px 12px !important;
            font-size: 12px !important;
            right: 6px !important;
          }
          .search-icon {
            left: 12px !important;
          }
          .search-icon svg {
            width: 16px !important;
            height: 16px !important;
          }
        }
      `}} />
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Search movies (min 3 chars)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          style={{
            width: '100%',
            padding: '14px 20px 14px 48px',
            borderRadius: '30px',
            border: '1px solid var(--glass-border)',
            background: 'rgba(20, 20, 20, 0.6)',
            color: 'var(--text-primary)',
            fontSize: '16px',
            backdropFilter: 'blur(10px)',
            outline: 'none',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary-red)';
            e.target.style.boxShadow = '0 0 10px rgba(229, 9, 20, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--glass-border)';
            e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
          }}
        />
        <div className="search-icon" style={{ position: 'absolute', left: '16px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
          <Search size={20} />
        </div>
        <button
          type="submit"
          className="search-btn"
          style={{
            position: 'absolute',
            right: '8px',
            background: 'var(--primary-red)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = 'var(--primary-red-hover)'}
          onMouseLeave={(e) => e.target.style.background = 'var(--primary-red)'}
        >
          Search
        </button>
      </div>
      
      {showAd && (
        <InterstitialAd onClose={() => setShowAd(false)} />
      )}
    </form>
  );
}
