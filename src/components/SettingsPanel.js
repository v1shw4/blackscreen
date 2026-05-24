"use client";

import { useState, useEffect, useRef } from 'react';
import { X, Trash2, Info } from 'lucide-react';

export default function SettingsPanel({ isOpen, onClose }) {
  const [clearStatus, setClearStatus] = useState(null); // null | 'loading' | 'done' | 'error'
  const panelRef = useRef(null);

  // Clear all favourites via API
  const handleClearFavourites = async () => {
    if (!confirm('Remove all saved favourites? This cannot be undone.')) return;
    setClearStatus('loading');
    try {
      const res = await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clearAll: true }),
      });
      setClearStatus(res.ok ? 'done' : 'error');
    } catch {
      setClearStatus('error');
    }
    setTimeout(() => setClearStatus(null), 3000);
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`settings-overlay${isOpen ? ' settings-overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        ref={panelRef}
        className={`settings-panel${isOpen ? ' settings-panel--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site Settings"
      >
        {/* Header */}
        <div className="settings-header">
          <span className="settings-title">⚙️ Settings</span>
          <button className="settings-close-btn" onClick={onClose} aria-label="Close settings">
            <X size={20} />
          </button>
        </div>

        <div className="settings-body">

          {/* — Data — */}
          <section className="settings-section">
            <div className="settings-section-label">
              <Trash2 size={15} />
              Data
            </div>
            <div className="settings-row settings-row--column">
              <div className="settings-row-title">Clear All Favourites</div>
              <div className="settings-row-desc">
                Permanently removes all saved movies from this device
              </div>
              <button
                id="settings-clear-favs-btn"
                className={`settings-danger-btn${clearStatus === 'loading' ? ' settings-danger-btn--loading' : ''}`}
                onClick={handleClearFavourites}
                disabled={clearStatus === 'loading'}
              >
                {clearStatus === 'loading'
                  ? 'Clearing…'
                  : clearStatus === 'done'
                  ? '✓ Cleared!'
                  : clearStatus === 'error'
                  ? '✗ Failed — try again'
                  : 'Clear Favourites'}
              </button>
            </div>
          </section>

          {/* — About — */}
          <section className="settings-section settings-section--about">
            <div className="settings-section-label">
              <Info size={15} />
              About
            </div>
            <div className="settings-about-content">
              <div className="settings-about-logo">BlackScreen</div>
              <div className="settings-about-version">Version 1.0.0 · Free Streaming</div>
              <p className="settings-about-disclaimer">
                BlackScreen does not host any content. All streams are provided by third-party
                services. This site is for entertainment purposes only.
              </p>
            </div>
          </section>

        </div>
      </aside>
    </>
  );
}
