import { useState, useEffect, useCallback } from 'react';
import { MeasurementEntry, MeasurementField } from '../models';
import { measurementService } from '../services';

export function useMeasurements(profileId: string) {
  const [entries, setEntries] = useState<MeasurementEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await measurementService.getEntriesByProfile(profileId);
      setEntries(data);
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => { load(); }, [load]);

  const createEntry = useCallback(async (categorySlug: string, label: string, opts?: { imageUri?: string; notes?: string }) => {
    const entry = await measurementService.createEntry(profileId, categorySlug, label, opts);
    setEntries(prev => [entry, ...prev]);
    return entry;
  }, [profileId]);

  const deleteEntry = useCallback(async (id: string) => {
    await measurementService.deleteEntry(id);
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  return { entries, loading, reload: load, createEntry, deleteEntry };
}

export function useMeasurementFields(entryId: string) {
  const [fields, setFields] = useState<MeasurementField[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await measurementService.getFields(entryId);
      setFields(data);
    } finally {
      setLoading(false);
    }
  }, [entryId]);

  useEffect(() => { load(); }, [load]);

  const saveFields = useCallback(async (updatedFields: Omit<MeasurementField, 'id'>[]) => {
    const saved = await measurementService.saveFields(entryId, updatedFields);
    setFields(saved);
    return saved;
  }, [entryId]);

  return { fields, loading, reload: load, saveFields };
}
