import { useState, useEffect, useCallback } from 'react';
import { Profile } from '../models';
import { profileService } from '../services';

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await profileService.getAll();
      setProfiles(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const refresh = useCallback(async () => {
    const data = await profileService.getAll();
    setProfiles(data);
  }, []);

  const create = useCallback(async (name: string, opts?: { contactId?: string; avatarUri?: string; notes?: string }) => {
    const profile = await profileService.create(name, opts);
    setProfiles(prev => [profile, ...prev]);
    return profile;
  }, []);

  const update = useCallback(async (id: string, data: Partial<Pick<Profile, 'name' | 'contactId' | 'avatarUri' | 'notes'>>) => {
    const updated = await profileService.update(id, data);
    setProfiles(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  }, []);

  const remove = useCallback(async (id: string) => {
    await profileService.delete(id);
    setProfiles(prev => prev.filter(p => p.id !== id));
  }, []);

  return { profiles, loading, reload: load, refresh, create, update, remove };
}
