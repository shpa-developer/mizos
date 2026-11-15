import { Profile } from '../../models';

export interface ProfileRepository {
  getAll(): Promise<Profile[]>;
  getById(id: string): Promise<Profile | null>;
  create(profile: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>): Promise<Profile>;
  update(id: string, data: Partial<Pick<Profile, 'name' | 'contactId' | 'avatarUri' | 'notes'>>): Promise<Profile>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Profile[]>;
}
