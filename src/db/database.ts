import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('measurements.db');
  await runMigrations(db);
  return db;
}

async function runMigrations(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      contact_id TEXT,
      avatar_uri TEXT,
      notes TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS measurement_entries (
      id TEXT PRIMARY KEY,
      profile_id TEXT NOT NULL,
      category_slug TEXT NOT NULL,
      label TEXT NOT NULL,
      image_uri TEXT,
      notes TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS measurement_fields (
      id TEXT PRIMARY KEY,
      entry_id TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      unit TEXT NOT NULL DEFAULT '',
      FOREIGN KEY (entry_id) REFERENCES measurement_entries(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_entries_profile ON measurement_entries(profile_id);
    CREATE INDEX IF NOT EXISTS idx_fields_entry ON measurement_fields(entry_id);
  `);
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
