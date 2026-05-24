import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tmdbid = searchParams.get('tmdbid');

  if (!tmdbid) {
    return NextResponse.json({ error: 'tmdbid is required' }, { status: 400 });
  }

  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    // If no API key is configured, return null so the client falls back to the gradient
    return NextResponse.json({ posterUrl: null, error: 'TMDB_API_KEY not configured' });
  }

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbid}?api_key=${apiKey}`);
    if (!res.ok) {
      return NextResponse.json({ posterUrl: null, error: 'TMDB movie not found' }, { status: res.status });
    }
    
    const data = await res.json();
    
    let posterUrl = null;
    let backdropUrl = null;
    
    if (data.poster_path) {
      posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    }
    
    if (data.backdrop_path) {
      backdropUrl = `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`;
    }
    
    return NextResponse.json({ posterUrl, backdropUrl });
  } catch (error) {
    return NextResponse.json({ error: error.message, posterUrl: null, backdropUrl: null }, { status: 500 });
  }
}
