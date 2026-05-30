"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowLeft, Star, Clock, Calendar } from 'lucide-react';

export default function WatchClient({ id, movieData }) {
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
            {/* Movie iframe */}
            <iframe
              src={`https://moviesapi.to/movie/${id}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                visibility: 'visible',
              }}
              allowFullScreen
            />
          </div>

          {movieData && (
            <div className="glass-panel animate-fade-in" style={{
              marginTop: '24px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Optional background glow */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-10%',
                width: '60%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(229,9,20,0.05) 0%, rgba(0,0,0,0) 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                  <div style={{ flex: '1 1 500px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', letterSpacing: '0.5px', color: '#fff' }}>
                      {movieData.title || movieData.original_title}
                    </h1>
                    {movieData.tagline && (
                      <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '16px', fontWeight: '400' }}>
                        {movieData.tagline}
                      </p>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {movieData.vote_average > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.5)', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Star size={16} color="#FFD700" fill="#FFD700" />
                        <span style={{ fontWeight: '600', fontSize: '14px', color: '#fff' }}>{movieData.vote_average.toFixed(1)}</span>
                      </div>
                    )}
                    {movieData.release_date && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.5)', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Calendar size={16} color="var(--text-secondary)" />
                        <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>{movieData.release_date.split('-')[0]}</span>
                      </div>
                    )}
                    {movieData.runtime > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.5)', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Clock size={16} color="var(--text-secondary)" />
                        <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '500' }}>{movieData.runtime} min</span>
                      </div>
                    )}
                  </div>
                </div>

                {movieData.genres && movieData.genres.length > 0 && (
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
                    {movieData.genres.map(genre => (
                      <span key={genre.id} style={{
                        fontSize: '13px',
                        padding: '6px 14px',
                        background: 'rgba(229, 9, 20, 0.1)',
                        border: '1px solid rgba(229, 9, 20, 0.2)',
                        color: '#ff4d4d',
                        borderRadius: '20px',
                        fontWeight: '500',
                        letterSpacing: '0.3px',
                        backdropFilter: 'blur(4px)'
                      }}>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {movieData.overview && (
                  <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#fff', letterSpacing: '0.5px' }}>Storyline</h3>
                    <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)', maxWidth: '900px' }}>
                      {movieData.overview}
                    </p>
                  </div>
                )}
                
                {movieData.credits && movieData.credits.cast && movieData.credits.cast.length > 0 && (
                  <div style={{ marginTop: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#fff' }}>Top Cast</h3>
                    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'thin' }}>
                       {movieData.credits.cast.slice(0, 6).map(actor => (
                         <div key={actor.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '6px 12px 6px 6px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                           {actor.profile_path ? (
                             <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                           ) : (
                             <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                               {actor.name.charAt(0)}
                             </div>
                           )}
                           <div style={{ display: 'flex', flexDirection: 'column' }}>
                             <span style={{ fontSize: '13px', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap' }}>{actor.name}</span>
                             <span style={{ fontSize: '11px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{actor.character.split('/')[0]}</span>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
