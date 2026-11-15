import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Contact, requestPermissionsAsync, ContactField } from 'expo-contacts';
import { profileService } from '../../src/services';
import { useLanguage } from '../../src/i18n';
import { colors, spacing, commonStyles } from '../../src/theme';

export default function CreateProfileScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [contactId, setContactId] = useState<string | undefined>();
  const [contactLabel, setContactLabel] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handlePickContact = async () => {
    const { status } = await requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t.permissionDenied, t.permissionMessage);
      return;
    }
    const picked = await Contact.presentPicker();
    if (picked) {
      const details = await picked.getDetails([ContactField.GIVEN_NAME, ContactField.FAMILY_NAME]);
      const fullName = [details.givenName, details.familyName].filter(Boolean).join(' ');
      if (fullName) {
        setName(fullName);
        setContactLabel(fullName);
      }
      setContactId(picked.id);
    }
  };

  const handleRemoveContact = () => {
    setContactId(undefined);
    setContactLabel(null);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert(t.error, t.enterName);
      return;
    }
    setSaving(true);
    try {
      const profile = await profileService.create(name, {
        notes: notes || undefined,
        contactId,
      });
      router.replace(`/profile/${profile.id}`);
    } catch (e: any) {
      Alert.alert(t.error, e.message);
      setSaving(false);
    }
  };

  return (
    <View style={commonStyles.screen}>
      <View style={styles.form}>
        <TouchableOpacity style={styles.contactPicker} onPress={handlePickContact}>
          <Text style={styles.contactPickerIcon}>📱</Text>
          <Text style={styles.contactPickerText}>{t.pickFromContacts}</Text>
        </TouchableOpacity>

        {contactLabel && (
          <View style={styles.linkedRow}>
            <Text style={styles.linkedText}>{t.linkedTo} {contactLabel}</Text>
            <TouchableOpacity onPress={handleRemoveContact}>
              <Text style={styles.unlinkText}>{t.remove}</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.label}>{t.name}</Text>
        <TextInput
          style={commonStyles.input}
          value={name}
          onChangeText={setName}
          placeholder={t.namePlaceholder}
          placeholderTextColor={colors.textSecondary}
          autoFocus
        />

        <Text style={[styles.label, { marginTop: spacing.md }]}>{t.notesOptional}</Text>
        <TextInput
          style={[commonStyles.input, styles.multiline]}
          value={notes}
          onChangeText={setNotes}
          placeholder={t.notesPlaceholder}
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={3}
        />

        <TouchableOpacity
          style={[commonStyles.button, { marginTop: spacing.lg }, saving && styles.disabled]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={commonStyles.buttonText}>{saving ? t.creating : t.createProfile}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { padding: spacing.md },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  disabled: { opacity: 0.6 },
  contactPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    padding: spacing.sm + 4,
    borderRadius: 10,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  contactPickerIcon: { fontSize: 20 },
  contactPickerText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.accent,
  },
  linkedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  linkedText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
  },
  unlinkText: {
    fontSize: 13,
    color: colors.danger,
    fontWeight: '600',
  },
});
