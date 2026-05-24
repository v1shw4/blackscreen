"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import SplashScreen from '@/components/SplashScreen';
import BannerSlider from '@/components/BannerSlider';

export default function HomeClient() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const fetchFavorites = async () => {
    try {
      const res = await fetch('/api/favorites');
      if (res.ok) {
        const data = await res.json();
        setFavorites(new Set(data.favorites.map(f => f.movie_id)));
      }
    } catch (err) {
      console.error('Failed to fetch favorites', err);
    }
  };

  const fetchMovies = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.result && data.data) {
        setMovies(data.data);
      } else {
        setMovies([]);
        setError('No movies found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies('https://moviesapi.to/api/discover/movie?direction=desc&page=1');
    fetchFavorites();
  }, []);

  const handleSearch = (query) => {
    setIsSearchActive(true);
    fetchMovies(`https://moviesapi.to/api/discover/movie?query=${encodeURIComponent(query)}`);
  };

  const handleClearSearch = () => {
    setIsSearchActive(false);
    fetchMovies('https://moviesapi.to/api/discover/movie?direction=desc&page=1');
  };

  const handleToggleFavorite = async (movie) => {
    const movieId = movie.tmdbid || movie.imdb_id;
    const isFav = favorites.has(movieId);

    const newFavs = new Set(favorites);
    if (isFav) {
      newFavs.delete(movieId);
    } else {
      newFavs.add(movieId);
    }
    setFavorites(newFavs);

    try {
      const method = isFav ? 'DELETE' : 'POST';
      const body = isFav ? JSON.stringify({ movieId }) : JSON.stringify(movie);
      await fetch('/api/favorites', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
    } catch (err) {
      console.error('Failed to toggle favorite', err);
      setFavorites(favorites);
    }
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <Header />
      <div className="main-content" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%', flex: 1 }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 768px) {
            .movie-grid { 
              grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important;
              gap: 12px !important;
            }
            .search-container {
              margin-bottom: 24px !important;
              margin-top: 10px !important;
            }
          }
          @media (max-width: 480px) {
            .movie-grid { 
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 10px !important;
            }
          }
        `}} />
        <div className="search-container" style={{ marginBottom: '40px', marginTop: '20px' }}>
          <SearchBar onSearch={handleSearch} />
        </div>



        {!loading && !isSearchActive && movies.length > 0 && !error && (
          <BannerSlider movies={movies} />
        )}

        {error && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
            <p>{error}</p>
            <button
              onClick={() => fetchMovies('https://moviesapi.to/api/discover/movie?direction=desc&page=1')}
              style={{
                background: 'var(--primary-red)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '4px',
                marginTop: '16px',
              }}
            >
              Back to Discover
            </button>
          </div>
        )}

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
            <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 100% { transform: rotate(360deg); } }` }} />
          </div>
        ) : (
          <div className="movie-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '24px',
            paddingBottom: '20px',
          }}>
            {movies.map((movie, index) => {
              const movieId = movie.tmdbid || movie.imdb_id;
              return (
                <MovieCard
                  key={`${movieId}-${index}`}
                  movie={movie}
                  isFavorite={favorites.has(movieId)}
                  onToggleFavorite={handleToggleFavorite}
                />
              );
            })}
          </div>
        )}


      </div>
    </>
  );
}
