import { MeasurementEntry, MeasurementField } from '../../models';

export interface MeasurementRepository {
  getEntriesByProfile(profileId: string): Promise<MeasurementEntry[]>;
  getEntryById(id: string): Promise<MeasurementEntry | null>;
  createEntry(entry: Omit<MeasurementEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<MeasurementEntry>;
  updateEntry(id: string, data: Partial<Pick<MeasurementEntry, 'label' | 'imageUri' | 'notes'>>): Promise<MeasurementEntry>;
  deleteEntry(id: string): Promise<void>;

  getFieldsByEntry(entryId: string): Promise<MeasurementField[]>;
  setFields(entryId: string, fields: Omit<MeasurementField, 'id'>[]): Promise<MeasurementField[]>;
}
