export interface Profile {
  id: string;
  name: string;
  contactId?: string;
  avatarUri?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface MeasurementCategory {
  id: string;
  slug: string;
  label: string;
  icon: string;
}

export type FieldType = 'number' | 'select' | 'stepper';

export interface FieldDef {
  key: string;
  label: string;
  unit: string;
  type: FieldType;
  options?: string[];
  step?: number;
  pair?: string;
}

export interface MeasurementEntry {
  id: string;
  profileId: string;
  categorySlug: string;
  label: string;
  imageUri?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface MeasurementField {
  id: string;
  entryId: string;
  key: string;
  value: string;
  unit: string;
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

export const DEFAULT_CATEGORIES: MeasurementCategory[] = [
  { id: 'cat-tshirt', slug: 'tshirt', label: 'T-Shirt', icon: 'tshirt' },
  { id: 'cat-shirt', slug: 'shirt', label: 'Shirt', icon: 'shirt' },
  { id: 'cat-suit', slug: 'suit', label: 'Suit / Blazer', icon: 'suit' },
  { id: 'cat-pant', slug: 'pant', label: 'Pant', icon: 'pant' },
  { id: 'cat-shoes', slug: 'shoes', label: 'Shoes', icon: 'shoe' },
  { id: 'cat-eyeglasses', slug: 'eyeglasses', label: 'Eyeglasses', icon: 'glasses' },
  { id: 'cat-ring', slug: 'ring', label: 'Ring', icon: 'ring' },
  { id: 'cat-bangles', slug: 'bangles', label: 'Bangles', icon: 'bangles' },
  { id: 'cat-body', slug: 'body', label: 'Body', icon: 'body' },
];

export const CATEGORY_FIELDS: Record<string, FieldDef[]> = {
  tshirt: [
    { key: 'size', label: 'Size', unit: '', type: 'select', options: SIZES },
    { key: 'chest', label: 'Chest', unit: 'in', type: 'number' },
    { key: 'length', label: 'Length', unit: 'in', type: 'number' },
  ],
  shirt: [
    { key: 'size', label: 'Size', unit: '', type: 'select', options: SIZES },
    { key: 'chest', label: 'Chest', unit: 'in', type: 'number' },
    { key: 'length', label: 'Length', unit: 'in', type: 'number' },
  ],
  pant: [
    { key: 'waist', label: 'Waist', unit: 'in', type: 'number' },
    { key: 'hip', label: 'Hip', unit: 'in', type: 'number' },
    { key: 'thigh', label: 'Thigh', unit: 'in', type: 'number' },
    { key: 'knee', label: 'Knee', unit: 'in', type: 'number' },
    { key: 'crotch', label: 'Crotch', unit: 'in', type: 'number' },
    { key: 'inseam', label: 'Inseam', unit: 'in', type: 'number' },
    { key: 'length', label: 'Length', unit: 'in', type: 'number' },
    { key: 'leg_opening', label: 'Leg Opening', unit: 'in', type: 'number' },
  ],
  shoes: [
    { key: 'size', label: 'Size', unit: 'UK', type: 'number' },
  ],
  suit: [
    { key: 'size', label: 'Size', unit: '', type: 'select', options: SIZES },
    { key: 'chest', label: 'Chest', unit: 'in', type: 'number' },
    { key: 'shoulder', label: 'Shoulder', unit: 'in', type: 'number' },
    { key: 'sleeve', label: 'Sleeve Length', unit: 'in', type: 'number' },
    { key: 'jacket_length', label: 'Jacket Length', unit: 'in', type: 'number' },
    { key: 'waist', label: 'Waist', unit: 'in', type: 'number' },
  ],
  eyeglasses: [
    { key: 'sph_left', label: 'SPH (Left)', unit: '', type: 'stepper', step: 0.25, pair: 'sph' },
    { key: 'sph_right', label: 'SPH (Right)', unit: '', type: 'stepper', step: 0.25, pair: 'sph' },
    { key: 'cyl_left', label: 'CYL (Left)', unit: '', type: 'stepper', step: 0.25, pair: 'cyl' },
    { key: 'cyl_right', label: 'CYL (Right)', unit: '', type: 'stepper', step: 0.25, pair: 'cyl' },
  ],
  ring: [
    { key: 'size', label: 'Size', unit: '', type: 'number' },
  ],
  bangles: [
    { key: 'size', label: 'Size', unit: '', type: 'number' },
  ],
  body: [
    { key: 'height', label: 'Height', unit: 'in', type: 'number' },
    { key: 'weight', label: 'Weight', unit: 'kg', type: 'number' },
    { key: 'chest', label: 'Chest', unit: 'in', type: 'number' },
    { key: 'waist', label: 'Waist', unit: 'in', type: 'number' },
    { key: 'hips', label: 'Hips', unit: 'in', type: 'number' },
    { key: 'shoulder', label: 'Shoulder', unit: 'in', type: 'number' },
    { key: 'inseam', label: 'Inseam', unit: 'in', type: 'number' },
    { key: 'neck', label: 'Neck', unit: 'in', type: 'number' },
  ],
};
