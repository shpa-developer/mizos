import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, ActivityIndicator, Alert, Share } from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect, useNavigation } from 'expo-router';
import { MeasurementEntry, MeasurementField, DEFAULT_CATEGORIES, CATEGORY_FIELDS } from '../../src/models';
import { measurementService, profileService } from '../../src/services';
import { encodeShareLink } from '../../src/utils/shareLink';
import { MeasurementForm } from '../../src/components';
import { Feather } from '@expo/vector-icons';
import { useLanguage, getCategoryLabel, getFieldLabel, LANGUAGES, LangCode, translations } from '../../src/i18n';
import { colors, spacing, commonStyles } from '../../src/theme';

export default function EntryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const { lang, t, shareLang } = useLanguage();
  const [entry, setEntry] = useState<MeasurementEntry | null>(null);
  const [fields, setFields] = useState<MeasurementField[]>([]);
  const [loading, setLoading] = useState(true);
  const [customName, setCustomName] = useState('');
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [selectedShareLang, setSelectedShareLang] = useState<LangCode>(shareLang);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const entryRef = useRef<MeasurementEntry | null>(null);

  const openShareSheet = useCallback(() => {
    setSelectedShareLang(shareLang);
    setShowLangDropdown(false);
    setShowShareSheet(true);
  }, [shareLang]);

  const doShare = useCallback(async (langCode: LangCode) => {
    const current = entryRef.current;
    if (!current) return;

    const [currentFields, profile] = await Promise.all([
      measurementService.getFields(id),
      profileService.getById(current.profileId),
    ]);

    const catLabel = getCategoryLabel(langCode, current.categorySlug) ?? current.categorySlug;
    const profileName = profile?.name ?? 'Someone';
    const category = DEFAULT_CATEGORIES.find(c => c.slug === current.categorySlug);
    const customName = current.label !== category?.label ? current.label : null;
    const sT = translations[langCode];

    const parts: string[] = [];
    for (const f of currentFields) {
      const label = getFieldLabel(langCode, f.key) ?? f.key;
      const unit = f.unit ? ` ${f.unit}` : '';
      parts.push(`${label}: ${f.value}${unit}`);
    }

    const deepLink = encodeShareLink({
      categorySlug: current.categorySlug,
      label: current.label,
      profileName: profile?.name,
      fields: currentFields.map(f => ({ key: f.key, value: f.value, unit: f.unit })),
    });

    let text = sT.shareMeasurements.replace('{name}', profileName).replace('{category}', catLabel);
    if (customName) text += ` (${customName})`;
    text += ':\n';
    text += parts.join(', ') + '.';
    text += `\n\n${sT.saveInApp}: ${deepLink}`;

    setShowShareSheet(false);
    try { await Share.share({ message: text }); } catch {}
  }, [id]);

  const handleDelete = useCallback(() => {
    Alert.alert(t.deleteMeasurement, t.deleteMeasurementConfirm, [
      { text: t.cancel, style: 'cancel' },
      {
        text: t.delete,
        style: 'destructive',
        onPress: async () => {
          await measurementService.deleteEntry(id);
          router.back();
        },
      },
    ]);
  }, [id, router, t]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [e, f] = await Promise.all([
        measurementService.getEntryById(id),
        measurementService.getFields(id),
      ]);
      setEntry(e);
      setFields(f);
      entryRef.current = e;
      if (e) {
        const category = DEFAULT_CATEGORIES.find(c => c.slug === e.categorySlug);
        const isCustom = e.label !== category?.label;
        setCustomName(isCustom ? e.label : '');
        navigation.setOptions({
          title: getCategoryLabel(lang, e.categorySlug) ?? category?.label ?? e.categorySlug,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 20, marginRight: 4 }}>
              <TouchableOpacity onPress={openShareSheet} hitSlop={{ top: 12, bottom: 12, left: 16, right: 12 }} style={{ padding: 4 }}>
                <Feather name="share" size={22} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }} style={{ padding: 4 }}>
                <Feather name="trash-2" size={22} color={colors.danger} />
              </TouchableOpacity>
            </View>
          ),
        });
      }
    } finally {
      setLoading(false);
    }
  }, [id, navigation, handleDelete, lang, openShareSheet]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleNameBlur = async () => {
    if (!entry) return;
    const category = DEFAULT_CATEGORIES.find(c => c.slug === entry.categorySlug);
    const newLabel = customName.trim() || category?.label || entry.categorySlug;
    if (newLabel !== entry.label) {
      const updated = await measurementService.updateEntry(id, { label: newLabel });
      setEntry(updated);
    }
  };

  const handleSave = async (updatedFields: Omit<MeasurementField, 'id'>[]) => {
    await measurementService.saveFields(id, updatedFields);
  };

  if (loading) {
    return (
      <View style={[commonStyles.screen, styles.center]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!entry) {
    return (
      <View style={commonStyles.screen}>
        <Text style={[commonStyles.body, { padding: spacing.md }]}>{t.entryNotFound}</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.screen}>
      <View style={styles.nameSection}>
        <Text style={styles.nameLabel}>{t.nameOptional}</Text>
        <TextInput
          style={commonStyles.input}
          value={customName}
          onChangeText={setCustomName}
          onBlur={handleNameBlur}
          placeholder={t.nameExamplePlaceholder}
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <MeasurementForm
        categorySlug={entry.categorySlug}
        existingFields={fields}
        onSave={handleSave}
        entryId={id}
      />

      {showShareSheet && (
        <Pressable style={styles.dialogOverlay} onPress={() => setShowShareSheet(false)}>
          <View style={styles.dialogBox} onStartShouldSetResponder={() => true}>
            <Text style={styles.dialogTitle}>{t.share}</Text>
            <TouchableOpacity
              style={styles.langPicker}
              onPress={() => setShowLangDropdown(!showLangDropdown)}
            >
              <Text style={styles.langPickerText}>
                {LANGUAGES.find(l => l.code === selectedShareLang)?.nativeLabel}
              </Text>
              <Feather name={showLangDropdown ? 'chevron-up' : 'chevron-down'} size={16} color={colors.text} />
            </TouchableOpacity>
            {showLangDropdown && (
              <View style={styles.langDropdown}>
                {LANGUAGES.map(l => (
                  <TouchableOpacity
                    key={l.code}
                    style={[styles.langDropdownItem, selectedShareLang === l.code && styles.langDropdownItemSelected]}
                    onPress={() => { setSelectedShareLang(l.code); setShowLangDropdown(false); }}
                  >
                    <Text style={[styles.langDropdownText, selectedShareLang === l.code && styles.langDropdownTextSelected]}>
                      {l.nativeLabel}
                    </Text>
                    <Text style={styles.langDropdownEnglish}>{l.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View style={styles.dialogActions}>
              <TouchableOpacity style={styles.dialogCancel} onPress={() => setShowShareSheet(false)}>
                <Text style={styles.dialogCancelText}>{t.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[commonStyles.button, { flex: 1 }]}
                onPress={() => doShare(selectedShareLang)}
              >
                <View style={styles.shareButtonContent}>
                  <Feather name="share" size={16} color="#fff" />
                  <Text style={commonStyles.buttonText}>{t.share}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  nameSection: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  nameLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  dialogOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    zIndex: 1000,
  },
  dialogBox: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 320,
  },
  dialogTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  langPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm + 4,
  },
  langPickerText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },
  langDropdown: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginTop: spacing.xs,
    overflow: 'hidden',
  },
  langDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm + 4,
    gap: spacing.sm,
  },
  langDropdownItemSelected: {
    backgroundColor: colors.accentLight,
  },
  langDropdownText: {
    fontSize: 14,
    color: colors.text,
  },
  langDropdownTextSelected: {
    color: colors.accent,
    fontWeight: '600',
  },
  langDropdownEnglish: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  dialogActions: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  dialogCancel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm + 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dialogCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  shareButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
});
