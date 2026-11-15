import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, TextInput, Modal,
  StyleSheet, ActivityIndicator, Alert, Pressable, KeyboardAvoidingView,
  Platform, ScrollView, Linking, Share,
} from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect, useNavigation } from 'expo-router';
import { Contact, requestPermissionsAsync, ContactField } from 'expo-contacts';
import { Profile, DEFAULT_CATEGORIES, MeasurementCategory, MeasurementEntry, MeasurementField, CATEGORY_FIELDS } from '../../src/models';
import { profileService, measurementService } from '../../src/services';
import { encodeShareLink } from '../../src/utils/shareLink';
import { EntryCard, EmptyState } from '../../src/components';
import { Feather } from '@expo/vector-icons';
import { useLanguage, getCategoryLabel, getFieldLabel, translations, LANGUAGES, LangCode } from '../../src/i18n';
import { colors, spacing, commonStyles } from '../../src/theme';

const ICONS: Record<string, string> = {
  tshirt: '👕',
  shirt: '👔',
  suit: '🤵',
  pant: '👖',
  shoes: '👟',
  eyeglasses: '👓',
  ring: '💍',
  bangles: '⭕',
  body: '📏',
};

export default function ProfileDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const { lang, t, st, shareLang } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [entries, setEntries] = useState<MeasurementEntry[]>([]);
  const [entryFields, setEntryFields] = useState<Record<string, MeasurementField[]>>({});
  const [loading, setLoading] = useState(true);

  const [contactName, setContactName] = useState<string | null>(null);
  const [contactPhone, setContactPhone] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [selectedShareLang, setSelectedShareLang] = useState<LangCode>(shareLang);
  const [sharingEntry, setSharingEntry] = useState<MeasurementEntry | null>(null);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MeasurementCategory | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [p, e] = await Promise.all([
        profileService.getById(id),
        measurementService.getEntriesByProfile(id),
      ]);
      setProfile(p);
      const fieldsMap: Record<string, MeasurementField[]> = {};
      await Promise.all(
        e.map(async (entry) => {
          fieldsMap[entry.id] = await measurementService.getFields(entry.id);
        })
      );
      const emptyEntries = e.filter(entry => fieldsMap[entry.id].length === 0);
      await Promise.all(emptyEntries.map(entry => measurementService.deleteEntry(entry.id)));
      const validEntries = e.filter(entry => fieldsMap[entry.id].length > 0);
      setEntries(validEntries);
      setEntryFields(fieldsMap);
      if (p?.contactId) {
        try {
          const contact = new Contact(p.contactId);
          const details = await contact.getDetails([ContactField.GIVEN_NAME, ContactField.FAMILY_NAME, ContactField.PHONES]);
          const name = [details.givenName, details.familyName].filter(Boolean).join(' ') || null;
          setContactName(name);
          setContactPhone(details.phones?.[0]?.number ?? null);
        } catch {
          setContactName(null);
          setContactPhone(null);
        }
      } else {
        setContactName(null);
        setContactPhone(null);
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  useEffect(() => {
    if (profile) {
      navigation.setOptions({
        title: profile.name,
        headerRight: () => (
          <TouchableOpacity onPress={() => setShowMenu(true)} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }} style={{ padding: 4 }}>
            <Feather name="more-vertical" size={22} color={colors.text} />
          </TouchableOpacity>
        ),
      });
    }
  }, [profile, navigation]);

  const handleLinkContact = async () => {
    const { status } = await requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t.permissionDenied, t.permissionMessage);
      return;
    }
    const picked = await Contact.presentPicker();
    if (picked) {
      const details = await picked.getDetails([ContactField.GIVEN_NAME, ContactField.FAMILY_NAME]);
      const name = [details.givenName, details.familyName].filter(Boolean).join(' ') || null;
      await profileService.update(id, { contactId: picked.id });
      setContactName(name);
      setProfile(prev => prev ? { ...prev, contactId: picked.id } : prev);
    }
  };

  const handleUnlinkContact = async () => {
    await profileService.update(id, { contactId: undefined });
    setContactName(null);
    setProfile(prev => prev ? { ...prev, contactId: undefined } : prev);
  };

  const handleEntryPress = (entry: MeasurementEntry) => {
    router.push(`/entry/${entry.id}`);
  };

  const handleShareEntry = (entry: MeasurementEntry) => {
    const fields = entryFields[entry.id] ?? [];
    if (fields.length === 0) return;
    setSharingEntry(entry);
    setSelectedShareLang(shareLang);
    setShowLangDropdown(false);
    setShowShareSheet(true);
  };

  const doShare = async (langCode: LangCode) => {
    if (!sharingEntry) return;
    const fields = entryFields[sharingEntry.id] ?? [];

    const catLabel = getCategoryLabel(langCode, sharingEntry.categorySlug) ?? sharingEntry.categorySlug;
    const profileName = profile?.name ?? 'Someone';
    const customName = sharingEntry.label !== (DEFAULT_CATEGORIES.find(c => c.slug === sharingEntry.categorySlug)?.label) ? sharingEntry.label : null;

    const parts = fields.map(f => {
      const label = getFieldLabel(langCode, f.key) ?? f.key;
      const unit = f.unit ? ` ${f.unit}` : '';
      return `${label}: ${f.value}${unit}`;
    });

    const deepLink = encodeShareLink({
      categorySlug: sharingEntry.categorySlug,
      label: sharingEntry.label,
      profileName: profile?.name,
      fields: fields.map(f => ({ key: f.key, value: f.value, unit: f.unit })),
    });

    const sT = translations[langCode];
    let text = sT.shareMeasurements.replace('{name}', profileName).replace('{category}', catLabel);
    if (customName) text += ` (${customName})`;
    text += ':\n';
    text += parts.join(', ') + '.';
    text += `\n\n${sT.saveInApp}: ${deepLink}`;

    setShowShareSheet(false);
    try { await Share.share({ message: text }); } catch {}
  };

  const handleAddPress = () => {
    setSelectedCategory(null);
    setShowPicker(true);
  };

  const handleCategorySelect = (category: MeasurementCategory) => {
    setSelectedCategory(category);
  };

  const handleConfirmAdd = async () => {
    if (!selectedCategory) return;
    setShowPicker(false);
    const entry = await measurementService.createEntry(id, selectedCategory.slug, selectedCategory.label);
    router.push(`/entry/${entry.id}?isNew=true`);
  };

  const handleDelete = () => {
    Alert.alert(t.deleteProfile, t.deleteProfileConfirm.replace('{name}', profile?.name ?? ''), [
      { text: t.cancel, style: 'cancel' },
      {
        text: t.delete,
        style: 'destructive',
        onPress: async () => {
          await profileService.delete(id);
          router.back();
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={[commonStyles.screen, styles.center]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={commonStyles.screen}>
        <EmptyState icon="❌" title={t.profileNotFound} subtitle="" />
      </View>
    );
  }

  return (
    <View style={commonStyles.screen}>
      {profile.contactId && contactName ? (
        <View style={styles.contactBanner}>
          <View style={styles.contactAvatar}>
            <Feather name="user" size={20} color={colors.accent} />
          </View>
          <View style={styles.contactBannerInfo}>
            <Text style={styles.contactBannerName}>{contactName}</Text>
            {contactPhone ? (
              <Text style={styles.contactBannerPhone}>{contactPhone}</Text>
            ) : null}
          </View>
          <View style={styles.contactBannerActions}>
            {contactPhone ? (
              <>
                <TouchableOpacity
                  style={styles.contactAction}
                  onPress={() => Linking.openURL(`tel:${contactPhone}`)}
                  hitSlop={8}
                >
                  <Feather name="phone" size={18} color={colors.accent} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.contactAction}
                  onPress={() => {
                    const digits = contactPhone!.replace(/[^0-9]/g, '');
                    Linking.openURL(`whatsapp://send?phone=${digits}`);
                  }}
                  hitSlop={8}
                >
                  <Feather name="message-circle" size={18} color="#25D366" />
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
      ) : null}

      <FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <EntryCard entry={item} fields={entryFields[item.id] ?? []} onPress={handleEntryPress} onShare={handleShareEntry} />
        )}
        contentContainerStyle={entries.length === 0 ? styles.emptyContainer : styles.list}
        ListEmptyComponent={
          <EmptyState
            icon="📏"
            title={t.noMeasurementsTitle}
            subtitle={t.noMeasurementsSubtitle}
          />
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddPress} activeOpacity={0.8}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={showMenu} transparent animationType="fade">
        <Pressable style={styles.menuOverlay} onPress={() => setShowMenu(false)}>
          <View style={styles.menuContainer}>
            {profile.contactId ? (
              <TouchableOpacity style={styles.menuItem} onPress={() => { setShowMenu(false); handleUnlinkContact(); }}>
                <Feather name="user-minus" size={18} color={colors.text} />
                <Text style={styles.menuItemText}>{t.unlinkContact}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.menuItem} onPress={() => { setShowMenu(false); handleLinkContact(); }}>
                <Feather name="user-plus" size={18} color={colors.text} />
                <Text style={styles.menuItemText}>{t.linkToContact}</Text>
              </TouchableOpacity>
            )}
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => { setShowMenu(false); handleDelete(); }}>
              <Feather name="trash-2" size={18} color={colors.danger} />
              <Text style={[styles.menuItemText, { color: colors.danger }]}>{t.deleteProfile}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <Modal visible={showPicker} transparent animationType="slide">
        <Pressable style={styles.modalOverlay} onPress={() => setShowPicker(false)}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <Text style={styles.modalTitle}>{t.addMeasurement}</Text>
            <Text style={styles.modalSubtitle}>{t.chooseCategory}</Text>

            {DEFAULT_CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryOption,
                  selectedCategory?.id === cat.id && styles.categoryOptionSelected,
                ]}
                onPress={() => handleCategorySelect(cat)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryIcon}>{ICONS[cat.slug] ?? '📏'}</Text>
                <Text style={styles.categoryLabel}>{getCategoryLabel(lang, cat.slug) ?? cat.label}</Text>
                {selectedCategory?.id === cat.id && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.cancelText}>{t.cancel}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[commonStyles.button, styles.addButton, !selectedCategory && styles.disabled]}
                onPress={handleConfirmAdd}
                disabled={!selectedCategory}
              >
                <Text style={commonStyles.buttonText}>{t.add}</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

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
                <View style={styles.shareButtonRow}>
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
  contactBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: 12,
  },
  contactAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 2,
  },
  contactBannerInfo: {
    flex: 1,
    gap: 2,
  },
  contactBannerName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  contactBannerPhone: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  contactBannerActions: {
    flexDirection: 'row',
    gap: spacing.sm + 4,
  },
  contactAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: spacing.md,
  },
  menuContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: spacing.xs,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    gap: spacing.sm + 2,
  },
  menuItemText: {
    fontSize: 15,
    color: colors.text,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  list: { paddingBottom: 80 },
  emptyContainer: { flexGrow: 1 },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 28,
    color: '#FFFFFF',
    lineHeight: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
    paddingBottom: spacing.xl + 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm + 4,
    borderRadius: 10,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryOptionSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: spacing.sm + 4,
  },
  categoryLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  checkmark: {
    fontSize: 18,
    color: colors.accent,
    fontWeight: '700',
  },
  labelSection: {
    marginTop: spacing.md,
  },
  labelTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  cancelButton: {
    flex: 1,
    padding: spacing.sm + 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  addButton: {
    flex: 1,
  },
  multiline: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  disabled: {
    opacity: 0.4,
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
  shareButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
});
