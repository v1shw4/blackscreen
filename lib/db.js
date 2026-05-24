import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'favorites.db');
const db = new Database(dbPath);

// Initialize the favorites table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    movie_id TEXT NOT NULL,
    title TEXT,
    year INTEGER,
    quality TEXT,
    poster TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE UNIQUE INDEX IF NOT EXISTS idx_session_movie ON favorites(session_id, movie_id);
`);

export default db;
