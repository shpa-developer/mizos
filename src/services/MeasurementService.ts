import { MeasurementEntry, MeasurementField } from '../models';
import { MeasurementRepository } from '../repositories/interfaces';

export class MeasurementService {
  constructor(private repo: MeasurementRepository) {}

  getEntriesByProfile(profileId: string): Promise<MeasurementEntry[]> {
    return this.repo.getEntriesByProfile(profileId);
  }

  getEntryById(id: string): Promise<MeasurementEntry | null> {
    return this.repo.getEntryById(id);
  }

  createEntry(profileId: string, categorySlug: string, label: string, opts?: { imageUri?: string; notes?: string }): Promise<MeasurementEntry> {
    if (!label.trim()) throw new Error('Entry label is required');
    return this.repo.createEntry({ profileId, categorySlug, label: label.trim(), ...opts });
  }

  updateEntry(id: string, data: Partial<Pick<MeasurementEntry, 'label' | 'imageUri' | 'notes'>>): Promise<MeasurementEntry> {
    return this.repo.updateEntry(id, data);
  }

  deleteEntry(id: string): Promise<void> {
    return this.repo.deleteEntry(id);
  }

  getFields(entryId: string): Promise<MeasurementField[]> {
    return this.repo.getFieldsByEntry(entryId);
  }

  saveFields(entryId: string, fields: Omit<MeasurementField, 'id'>[]): Promise<MeasurementField[]> {
    const nonEmpty = fields.filter(f => f.value.trim() !== '');
    return this.repo.setFields(entryId, nonEmpty);
  }
}
