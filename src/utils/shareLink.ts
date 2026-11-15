export interface SharedMeasurement {
  categorySlug: string;
  label: string;
  profileName?: string;
  fields: { key: string; value: string; unit: string }[];
}

const WEB_BASE_URL = 'https://mizos.in';

export function encodeShareLink(data: SharedMeasurement): string {
  const params = new URLSearchParams();
  if (data.profileName) params.set('n', data.profileName);
  params.set('cat', data.categorySlug);
  params.set('label', data.label);
  for (const f of data.fields) {
    const val = f.unit ? `${f.value} ${f.unit}` : f.value;
    params.append(`f_${f.key}`, val);
  }
  return `${WEB_BASE_URL}/m?${params.toString()}`;
}
