"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Play } from 'lucide-react';

export default function MovieCard({ movie, isFavorite = false, onToggleFavorite }) {
  const [isHovered, setIsHovered] = useState(false);
  const [posterUrl, setPosterUrl] = useState(movie.poster || null);

  useEffect(() => {
    // If we don't have a poster but we have a tmdbid, fetch it
    if (!movie.poster && movie.tmdbid) {
      fetch(`/api/poster?tmdbid=${movie.tmdbid}`)
        .then(res => res.json())
        .then(data => {
          if (data.posterUrl) {
            setPosterUrl(data.posterUrl);
          }
        })
        .catch(err => console.error('Failed to fetch TMDB poster', err));
    }
  }, [movie.tmdbid, movie.poster]);

  return (
    <div
      className="glass-panel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '2/3',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: isHovered ? 'scale(1.03) translateY(-5px)' : 'scale(1)',
        boxShadow: isHovered ? '0 15px 30px rgba(229, 9, 20, 0.3)' : '0 4px 10px rgba(0,0,0,0.5)',
        cursor: 'pointer'
      }}
    >
      {/* Background Poster or Fallback Gradient */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: posterUrl ? `url(${posterUrl})` : 'linear-gradient(135deg, #2a0000 0%, #000000 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
        opacity: posterUrl ? 0.8 : 1,
        transition: 'opacity 0.3s ease'
      }} />

      {/* Dark Gradient Overlay for text readability */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
        zIndex: 1
      }} />

      {/* Hover Overlay with Play Button */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(229, 9, 20, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        zIndex: 2
      }}>
        <div style={{
          background: 'rgba(20,20,20,0.8)',
          borderRadius: '50%',
          padding: '12px',
          border: '1px solid var(--primary-red)'
        }}>
          <Play fill="var(--primary-red)" color="var(--primary-red)" size={32} />
        </div>
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        padding: '16px',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px'
        }}>
          <span style={{
            background: 'var(--primary-red)',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 'bold',
            padding: '2px 6px',
            borderRadius: '4px',
            textTransform: 'uppercase'
          }}>
            {movie.quality || 'HD'}
          </span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(movie);
            }}
            style={{
              background: isFavorite ? 'rgba(229, 9, 20, 0.2)' : 'rgba(0,0,0,0.5)',
              padding: '6px',
              borderRadius: '50%',
              border: `1px solid ${isFavorite ? 'var(--primary-red)' : 'rgba(255,255,255,0.3)'}`,
              transition: 'all 0.2s ease'
            }}
          >
            <Heart 
              size={18} 
              color={isFavorite ? 'var(--primary-red)' : '#fff'} 
              fill={isFavorite ? 'var(--primary-red)' : 'transparent'} 
            />
          </button>
        </div>
        
        <h3 style={{
          margin: '0 0 4px 0',
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: '1.2',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {movie.orig_title || movie.title}
        </h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          gap: '8px'
        }}>
          <span>{movie.year}</span>
          {movie.type && (
            <>
              <span style={{ fontSize: '8px' }}>•</span>
              <span style={{ textTransform: 'capitalize' }}>{movie.type}</span>
            </>
          )}
        </div>
      </div>
      
      {/* Link overlay */}
      <Link 
        href={`/watch/${movie.tmdbid || movie.imdb_id}`} 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 2
        }}
        aria-label={`Watch ${movie.orig_title}`}
      />
    </div>
  );
}
