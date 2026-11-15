import { Profile } from '../models';
import { ProfileRepository } from '../repositories/interfaces';

export class ProfileService {
  constructor(private repo: ProfileRepository) {}

  getAll(): Promise<Profile[]> {
    return this.repo.getAll();
  }

  getById(id: string): Promise<Profile | null> {
    return this.repo.getById(id);
  }

  create(name: string, opts?: { contactId?: string; avatarUri?: string; notes?: string }): Promise<Profile> {
    if (!name.trim()) throw new Error('Profile name is required');
    return this.repo.create({ name: name.trim(), ...opts });
  }

  update(id: string, data: Partial<Pick<Profile, 'name' | 'contactId' | 'avatarUri' | 'notes'>>): Promise<Profile> {
    if (data.name !== undefined && !data.name.trim()) throw new Error('Profile name cannot be empty');
    return this.repo.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }

  search(query: string): Promise<Profile[]> {
    return this.repo.search(query);
  }
}
