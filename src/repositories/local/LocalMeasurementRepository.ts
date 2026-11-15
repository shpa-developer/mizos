import { getDatabase } from '../../db/database';
import { MeasurementEntry, MeasurementField } from '../../models';
import { MeasurementRepository } from '../interfaces';
import { generateId } from '../../utils/id';

export class LocalMeasurementRepository implements MeasurementRepository {
  async getEntriesByProfile(profileId: string): Promise<MeasurementEntry[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<any>(
      'SELECT * FROM measurement_entries WHERE profile_id = ? ORDER BY updated_at DESC',
      [profileId]
    );
    return rows.map(mapEntryRow);
  }

  async getEntryById(id: string): Promise<MeasurementEntry | null> {
    const db = await getDatabase();
    const row = await db.getFirstAsync<any>('SELECT * FROM measurement_entries WHERE id = ?', [id]);
    return row ? mapEntryRow(row) : null;
  }

  async createEntry(data: Omit<MeasurementEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<MeasurementEntry> {
    const db = await getDatabase();
    const now = Date.now();
    const id = generateId();
    await db.runAsync(
      'INSERT INTO measurement_entries (id, profile_id, category_slug, label, image_uri, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, data.profileId, data.categorySlug, data.label, data.imageUri ?? null, data.notes ?? null, now, now]
    );
    return { id, ...data, createdAt: now, updatedAt: now };
  }

  async updateEntry(id: string, data: Partial<Pick<MeasurementEntry, 'label' | 'imageUri' | 'notes'>>): Promise<MeasurementEntry> {
    const db = await getDatabase();
    const now = Date.now();
    const sets: string[] = ['updated_at = ?'];
    const values: any[] = [now];

    if (data.label !== undefined) { sets.push('label = ?'); values.push(data.label); }
    if (data.imageUri !== undefined) { sets.push('image_uri = ?'); values.push(data.imageUri); }
    if (data.notes !== undefined) { sets.push('notes = ?'); values.push(data.notes); }

    values.push(id);
    await db.runAsync(`UPDATE measurement_entries SET ${sets.join(', ')} WHERE id = ?`, values);
    const updated = await this.getEntryById(id);
    return updated!;
  }

  async deleteEntry(id: string): Promise<void> {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM measurement_entries WHERE id = ?', [id]);
  }

  async getFieldsByEntry(entryId: string): Promise<MeasurementField[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<any>(
      'SELECT * FROM measurement_fields WHERE entry_id = ?',
      [entryId]
    );
    return rows.map(mapFieldRow);
  }

  async setFields(entryId: string, fields: Omit<MeasurementField, 'id'>[]): Promise<MeasurementField[]> {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM measurement_fields WHERE entry_id = ?', [entryId]);

    const result: MeasurementField[] = [];
    for (const field of fields) {
      const id = generateId();
      await db.runAsync(
        'INSERT INTO measurement_fields (id, entry_id, key, value, unit) VALUES (?, ?, ?, ?, ?)',
        [id, entryId, field.key, field.value, field.unit]
      );
      result.push({ id, ...field });
    }
    return result;
  }
}

function mapEntryRow(row: any): MeasurementEntry {
  return {
    id: row.id,
    profileId: row.profile_id,
    categorySlug: row.category_slug,
    label: row.label,
    imageUri: row.image_uri ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapFieldRow(row: any): MeasurementField {
  return {
    id: row.id,
    entryId: row.entry_id,
    key: row.key,
    value: row.value,
    unit: row.unit,
  };
}
