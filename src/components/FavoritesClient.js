"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';

export default function FavoritesClient() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/favorites');
      if (res.ok) {
        const data = await res.json();
        setMovies(data.favorites.map(f => ({
          tmdbid: f.movie_id,
          orig_title: f.title,
          year: f.year,
          quality: f.quality,
          poster: f.poster,
        })));
      }
    } catch (err) {
      console.error('Failed to fetch favorites', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (movie) => {
    const movieId = movie.tmdbid || movie.imdb_id;
    setMovies(prev => prev.filter(m => (m.tmdbid || m.imdb_id) !== movieId));
    try {
      await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId }),
      });
    } catch (err) {
      console.error('Failed to remove favorite', err);
      fetchFavorites();
    }
  };

  return (
    <>
      <Header />
      <div className="main-content" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%', flex: 1 }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 768px) {
            .movie-grid { 
              grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important;
              gap: 12px !important;
            }
            .fav-title {
              font-size: 20px !important;
              margin-bottom: 16px !important;
            }
          }
          @media (max-width: 480px) {
            .movie-grid { 
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 10px !important;
            }
          }
        `}} />
        <h2 className="fav-title" style={{
          fontSize: '24px',
          fontWeight: 600,
          marginBottom: '24px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--glass-border)',
        }}>
          My Favourites
        </h2>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <div className="spinner" style={{
              width: '40px',
              height: '40px',
              border: '4px solid rgba(255,255,255,0.1)',
              borderTopColor: 'var(--primary-red)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
          </div>
        ) : movies.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--text-secondary)',
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px dashed var(--glass-border)',
          }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>No favorites yet.</p>
            <p style={{ fontSize: '14px' }}>Discover movies and click the heart icon to save them here.</p>
          </div>
        ) : (
          <div className="movie-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '24px',
            paddingBottom: '20px',
          }}>
            {movies.map(movie => (
              <MovieCard
                key={movie.tmdbid}
                movie={movie}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
