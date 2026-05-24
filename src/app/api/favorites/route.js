import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db from '@/../lib/db'; // adjust path to lib/db.js
import crypto from 'crypto';

async function getSessionId() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('bs_session');
  
  if (sessionCookie?.value) {
    return sessionCookie.value;
  }
  
  return null;
}

export async function GET() {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return NextResponse.json({ favorites: [] });
  }

  try {
    const stmt = db.prepare('SELECT * FROM favorites WHERE session_id = ? ORDER BY created_at DESC');
    const favorites = stmt.all(sessionId);
    return NextResponse.json({ favorites });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  let sessionId = await getSessionId();
  let setCookieHeader = null;
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    // We can't directly use cookies().set() in route handlers cleanly without returning it in the response
    // So we'll set it using the Set-Cookie header
    setCookieHeader = `bs_session=${sessionId}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Strict`;
  }

  try {
    const movie = await request.json();
    if (!movie.tmdbid && !movie.imdb_id) {
      return NextResponse.json({ error: 'Movie ID required' }, { status: 400 });
    }

    const movieId = movie.tmdbid || movie.imdb_id;
    
    // Check if already exists
    const checkStmt = db.prepare('SELECT id FROM favorites WHERE session_id = ? AND movie_id = ?');
    const exists = checkStmt.get(sessionId, movieId);
    
    if (exists) {
      return NextResponse.json({ success: true, message: 'Already in favorites' });
    }

    const stmt = db.prepare(`
      INSERT INTO favorites (session_id, movie_id, title, year, quality, poster)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      sessionId,
      movieId,
      movie.orig_title || movie.title || 'Unknown',
      movie.year || null,
      movie.quality || null,
      movie.poster || null
    );

    const response = NextResponse.json({ success: true, message: 'Added to favorites' });
    if (setCookieHeader) {
      response.headers.set('Set-Cookie', setCookieHeader);
    }
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { movieId } = await request.json();
    if (!movieId) {
      return NextResponse.json({ error: 'Movie ID required' }, { status: 400 });
    }

    const stmt = db.prepare('DELETE FROM favorites WHERE session_id = ? AND movie_id = ?');
    stmt.run(sessionId, movieId);

    return NextResponse.json({ success: true, message: 'Removed from favorites' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
