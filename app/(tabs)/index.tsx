import React, { useCallback, useState, useMemo } from 'react';
import { View, FlatList, TouchableOpacity, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Contact, ContactField } from 'expo-contacts';
import { Feather } from '@expo/vector-icons';
import { useProfiles } from '../../src/hooks';
import { ProfileCard, EmptyState } from '../../src/components';
import { colors, spacing, commonStyles } from '../../src/theme';
import { useLanguage } from '../../src/i18n';
import { Profile } from '../../src/models';

export default function ProfilesScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { profiles, loading, refresh } = useProfiles();
  const [phoneNumbers, setPhoneNumbers] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');

  useFocusEffect(useCallback(() => {
    refresh();
  }, [refresh]));

  useFocusEffect(useCallback(() => {
    async function fetchPhones() {
      const linked = profiles.filter(p => p.contactId);
      if (linked.length === 0) return;
      const nums: Record<string, string> = {};
      await Promise.all(linked.map(async (p) => {
        try {
          const contact = new Contact(p.contactId!);
          const details = await contact.getDetails([ContactField.PHONES]);
          const phone = details.phones?.[0]?.number;
          if (phone) nums[p.id] = phone;
        } catch {}
      }));
      setPhoneNumbers(nums);
    }
    if (profiles.length > 0) fetchPhones();
  }, [profiles]));

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return profiles;
    const digits = q.replace(/\D/g, '');
    return profiles.filter(p => {
      if (p.name.toLowerCase().includes(q)) return true;
      const phone = phoneNumbers[p.id];
      if (phone && digits && phone.replace(/\D/g, '').includes(digits)) return true;
      return false;
    });
  }, [profiles, phoneNumbers, search]);

  const handlePress = (profile: Profile) => {
    router.push(`/profile/${profile.id}`);
  };

  const handleCreate = () => {
    router.push('/profile/create');
  };

  if (loading) {
    return (
      <View style={[commonStyles.screen, styles.center]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={commonStyles.screen}>
      {profiles.length > 0 && (
        <View style={styles.searchContainer}>
          <Feather name="search" size={16} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder={t.searchPlaceholder}
            placeholderTextColor={colors.textSecondary}
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
        </View>
      )}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProfileCard profile={item} phoneNumber={phoneNumbers[item.id]} onPress={handlePress} />}
        contentContainerStyle={profiles.length === 0 ? styles.emptyContainer : styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          search.trim() ? (
            <EmptyState
              icon="🔍"
              title={t.noResults}
              subtitle={t.noResultsSubtitle}
            />
          ) : (
            <EmptyState
              icon="📐"
              title={t.noProfilesTitle}
              subtitle={t.noProfilesSubtitle}
            />
          )
        }
      />
      <TouchableOpacity style={styles.fab} onPress={handleCreate} activeOpacity={0.8}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  list: { paddingVertical: spacing.xs },
  emptyContainer: { flexGrow: 1 },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
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
});
