"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BannerSlider({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Take up to 3 movies for the slider
  const sliderMovies = movies.slice(0, 3);

  // Automatically advance slides
  useEffect(() => {
    if (sliderMovies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderMovies.length);
    }, 5000); // 5 seconds per slide
    
    return () => clearInterval(interval);
  }, [sliderMovies.length]);

  if (sliderMovies.length === 0) return null;

  return (
    <div style={{ marginBottom: '40px' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .slider-container { height: 300px !important; }
          .slider-title { font-size: 24px !important; }
          .slider-content { padding: 20px !important; }
          .slider-header { font-size: 20px !important; }
        }
        @media (max-width: 480px) {
          .slider-container { height: 240px !important; }
          .slider-title { font-size: 20px !important; }
          .slider-content { padding: 16px !important; }
          .slider-desc { font-size: 12px !important; margin-bottom: 16px !important; }
          .slider-btn { padding: 8px 16px !important; font-size: 14px !important; }
        }
      `}} />
      <h2 className="slider-header" style={{ 
        fontSize: '24px', 
        fontWeight: 700, 
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'font-size 0.3s ease'
      }}>
        <span style={{ color: 'var(--primary-red)' }}>|</span> Editor's Choice
      </h2>
      
      <div className="glass-panel slider-container" style={{ 
        position: 'relative', 
        height: '400px', 
        width: '100%', 
        overflow: 'hidden',
        borderRadius: '16px',
        transition: 'height 0.3s ease'
      }}>
        {sliderMovies.map((movie, index) => {
          const movieId = movie.tmdbid || movie.imdb_id;
          const isActive = index === currentIndex;
          
          return (
            <div 
              key={movieId}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                zIndex: isActive ? 1 : 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '40px'
              }}
              className="slider-content"
            >
              <SlideBackground movie={movie} />

              {/* Overlay gradient for text readability */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
                zIndex: 1
              }} />

              {/* Text Content */}
              <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
                <span style={{
                  background: 'var(--primary-red)',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                  display: 'inline-block'
                }}>
                  Featured
                </span>
                <h3 className="slider-title" style={{ 
                  fontSize: '36px', 
                  fontWeight: 800, 
                  margin: '0 0 12px 0',
                  lineHeight: 1.1,
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                  transition: 'font-size 0.3s ease'
                }}>
                  {movie.orig_title || movie.title}
                </h3>
                <div className="slider-desc" style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                  <span>{movie.year}</span>
                  <span>{movie.quality || 'HD'}</span>
                </div>
                
                <Link href={`/watch/${movieId}`} className="slider-btn" style={{
                  background: 'var(--primary-red)',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Watch Now
                </Link>
              </div>
            </div>
          );
        })}
        
        {/* Slider Dots */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          gap: '8px',
          zIndex: 3
        }}>
          {sliderMovies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: idx === currentIndex ? 'var(--primary-red)' : 'rgba(255,255,255,0.3)',
                transition: 'background 0.3s ease',
                padding: 0
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// A simple helper component to load the poster for the slide background
function SlideBackground({ movie }) {
  const [bgUrl, setBgUrl] = useState(null);

  useEffect(() => {
    if (movie.tmdbid) {
      fetch(`/api/poster?tmdbid=${movie.tmdbid}`)
        .then(res => res.json())
        .then(data => {
          // Prefer backdrop for banners since they are wide
          if (data.backdropUrl) {
            setBgUrl(data.backdropUrl);
          } else if (data.posterUrl) {
            setBgUrl(data.posterUrl);
          }
        })
        .catch(console.error);
    }
  }, [movie.tmdbid]);

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundImage: bgUrl ? `url(${bgUrl})` : 'linear-gradient(135deg, #2a0000 0%, #000000 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center 20%', // Shift down a bit so heads aren't cut off
      zIndex: 0,
      opacity: bgUrl ? 0.7 : 1,
      transition: 'opacity 0.5s ease'
    }} />
  );
}
