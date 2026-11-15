import { getDatabase } from '../../db/database';
import { Profile } from '../../models';
import { ProfileRepository } from '../interfaces';
import { generateId } from '../../utils/id';

export class LocalProfileRepository implements ProfileRepository {
  async getAll(): Promise<Profile[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<any>('SELECT * FROM profiles ORDER BY updated_at DESC');
    return rows.map(mapRow);
  }

  async getById(id: string): Promise<Profile | null> {
    const db = await getDatabase();
    const row = await db.getFirstAsync<any>('SELECT * FROM profiles WHERE id = ?', [id]);
    return row ? mapRow(row) : null;
  }

  async create(data: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>): Promise<Profile> {
    const db = await getDatabase();
    const now = Date.now();
    const id = generateId();
    await db.runAsync(
      'INSERT INTO profiles (id, name, contact_id, avatar_uri, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, data.name, data.contactId ?? null, data.avatarUri ?? null, data.notes ?? null, now, now]
    );
    return { id, ...data, createdAt: now, updatedAt: now };
  }

  async update(id: string, data: Partial<Pick<Profile, 'name' | 'contactId' | 'avatarUri' | 'notes'>>): Promise<Profile> {
    const db = await getDatabase();
    const now = Date.now();
    const sets: string[] = ['updated_at = ?'];
    const values: any[] = [now];

    if (data.name !== undefined) { sets.push('name = ?'); values.push(data.name); }
    if (data.contactId !== undefined) { sets.push('contact_id = ?'); values.push(data.contactId); }
    if (data.avatarUri !== undefined) { sets.push('avatar_uri = ?'); values.push(data.avatarUri); }
    if (data.notes !== undefined) { sets.push('notes = ?'); values.push(data.notes); }

    values.push(id);
    await db.runAsync(`UPDATE profiles SET ${sets.join(', ')} WHERE id = ?`, values);
    const updated = await this.getById(id);
    return updated!;
  }

  async delete(id: string): Promise<void> {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM profiles WHERE id = ?', [id]);
  }

  async search(query: string): Promise<Profile[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<any>(
      'SELECT * FROM profiles WHERE name LIKE ? ORDER BY updated_at DESC',
      [`%${query}%`]
    );
    return rows.map(mapRow);
  }
}

function mapRow(row: any): Profile {
  return {
    id: row.id,
    name: row.name,
    contactId: row.contact_id ?? undefined,
    avatarUri: row.avatar_uri ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
