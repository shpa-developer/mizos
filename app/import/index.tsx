import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DEFAULT_CATEGORIES, CATEGORY_FIELDS } from '../../src/models';
import { profileService, measurementService } from '../../src/services';
import { Profile } from '../../src/models';
import { useLanguage, getCategoryLabel, getFieldLabel } from '../../src/i18n';
import { colors, spacing, commonStyles } from '../../src/theme';

const ICONS: Record<string, string> = {
  tshirt: '👕', shirt: '👔', suit: '🤵', pant: '👖', shoes: '👟',
  eyeglasses: '👓', ring: '💍', bangles: '⭕', body: '📏',
};

interface ParsedField { key: string; value: string; unit: string }

export default function ImportScreen() {
  const params = useLocalSearchParams<Record<string, string>>();
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const categorySlug = params.cat ?? '';
  const label = params.label ?? categorySlug;

  const fields: ParsedField[] = [];
  for (const [key, rawValue] of Object.entries(params)) {
    if (!key.startsWith('f_')) continue;
    const fieldKey = key.slice(2);
    const str = String(rawValue);
    const match = str.match(/^(.+?)\s+(in|cm|mm|kg|UK|US)$/);
    if (match) {
      fields.push({ key: fieldKey, value: match[1], unit: match[2] });
    } else {
      fields.push({ key: fieldKey, value: str, unit: '' });
    }
  }

  useEffect(() => {
    (async () => {
      if (!categorySlug) {
        Alert.alert(t.invalidLink, t.invalidLinkMessage, [
          { text: t.ok, onPress: () => router.back() },
        ]);
        setLoading(false);
        return;
      }
      const allProfiles = await profileService.getAll();
      setProfiles(allProfiles);
      if (allProfiles.length > 0) setSelectedProfileId(allProfiles[0].id);
      setLoading(false);
    })();
  }, [categorySlug]);

  const handleSave = async () => {
    if (!selectedProfileId) return;
    setSaving(true);
    try {
      const entry = await measurementService.createEntry(selectedProfileId, categorySlug, label);
      await measurementService.saveFields(
        entry.id,
        fields.map(f => ({ entryId: entry.id, ...f })),
      );
      Alert.alert(t.saved, t.savedMessage, [
        { text: t.ok, onPress: () => router.replace(`/entry/${entry.id}`) },
      ]);
    } catch (e: any) {
      Alert.alert(t.error, e.message);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[commonStyles.screen, styles.center]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!categorySlug) return null;

  const category = DEFAULT_CATEGORIES.find(c => c.slug === categorySlug);
  const categoryLabel = getCategoryLabel(lang, categorySlug) ?? category?.label ?? categorySlug;
  const icon = ICONS[categorySlug] ?? '📏';
  const fieldDefs = CATEGORY_FIELDS[categorySlug] ?? [];

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>{t.sharedMeasurement}</Text>

      <View style={styles.previewCard}>
        <View style={styles.previewHeader}>
          <Text style={styles.previewIcon}>{icon}</Text>
          <View>
            <Text style={styles.previewTitle}>{categoryLabel}</Text>
            {label !== (category?.label ?? categorySlug) && (
              <Text style={styles.previewTag}>{label}</Text>
            )}
          </View>
        </View>
        {fields.map(f => {
          const fieldLabel = getFieldLabel(lang, f.key) ?? fieldDefs.find(d => d.key === f.key)?.label ?? f.key;
          const unit = f.unit ? ` ${f.unit}` : '';
          return (
            <View key={f.key} style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>{fieldLabel}</Text>
              <Text style={styles.fieldValue}>{f.value}{unit}</Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>{t.saveToProfile}</Text>
      {profiles.length === 0 ? (
        <Text style={[commonStyles.caption, { padding: spacing.md }]}>
          {t.noProfilesYet}
        </Text>
      ) : (
        profiles.map(p => (
          <TouchableOpacity
            key={p.id}
            style={[styles.profileOption, selectedProfileId === p.id && styles.profileOptionSelected]}
            onPress={() => setSelectedProfileId(p.id)}
          >
            <Text style={styles.profileName}>{p.name}</Text>
            {selectedProfileId === p.id && <Text style={styles.check}>✓</Text>}
          </TouchableOpacity>
        ))
      )}

      {profiles.length > 0 && (
        <TouchableOpacity
          style={[commonStyles.button, styles.saveButton, saving && styles.disabled]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={commonStyles.buttonText}>{saving ? t.saving : t.saveMeasurement}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelText}>{t.cancel}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  heading: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  previewCard: {
    backgroundColor: colors.surface, borderRadius: 12, padding: spacing.md,
    borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg,
  },
  previewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, gap: spacing.sm },
  previewIcon: { fontSize: 32 },
  previewTitle: { fontSize: 18, fontWeight: '600', color: colors.text },
  previewTag: {
    fontSize: 12, color: colors.accent, backgroundColor: colors.accentLight,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontWeight: '600',
    alignSelf: 'flex-start', marginTop: 2, overflow: 'hidden',
  },
  fieldRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: spacing.xs + 2, borderTopWidth: 1, borderTopColor: colors.border,
  },
  fieldLabel: { fontSize: 14, color: colors.textSecondary },
  fieldValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  sectionTitle: {
    fontSize: 14, fontWeight: '600', color: colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm,
  },
  profileOption: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.sm + 4,
    borderRadius: 10, marginBottom: spacing.xs, borderWidth: 1,
    borderColor: colors.border, backgroundColor: colors.surface,
  },
  profileOptionSelected: { borderColor: colors.accent, backgroundColor: colors.accentLight },
  profileName: { flex: 1, fontSize: 16, fontWeight: '500', color: colors.text },
  check: { fontSize: 18, color: colors.accent, fontWeight: '700' },
  saveButton: { marginTop: spacing.lg },
  disabled: { opacity: 0.6 },
  cancelButton: { marginTop: spacing.sm, padding: spacing.sm + 4, alignItems: 'center' },
  cancelText: { fontSize: 16, color: colors.textSecondary },
});
