import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { Profile } from '../models';
import { colors, spacing } from '../theme';

interface Props {
  profile: Profile;
  phoneNumber?: string | null;
  onPress: (profile: Profile) => void;
}

export function ProfileCard({ profile, phoneNumber, onPress }: Props) {
  const [showNotes, setShowNotes] = useState(false);

  const initials = profile.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(profile)} activeOpacity={0.7}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{profile.name}</Text>
        {phoneNumber ? <Text style={styles.meta} numberOfLines={1}>📱 {phoneNumber}</Text> : null}
      </View>
      {profile.notes ? (
        <>
          <TouchableOpacity
            style={styles.infoBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            onPress={(e) => { e.stopPropagation(); setShowNotes(true); }}
          >
            <Text style={styles.infoBtnText}>i</Text>
          </TouchableOpacity>
          <Modal visible={showNotes} transparent animationType="fade">
            <Pressable style={styles.overlay} onPress={() => setShowNotes(false)}>
              <View style={styles.popup}>
                <Text style={styles.popupTitle}>{profile.name}</Text>
                <Text style={styles.popupNotes}>{profile.notes}</Text>
                <TouchableOpacity style={styles.popupClose} onPress={() => setShowNotes(false)}>
                  <Text style={styles.popupCloseText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        </>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.accent,
  },
  info: {
    flex: 1,
    marginLeft: spacing.sm + 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  meta: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  infoBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  infoBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.accent,
    fontStyle: 'italic',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  popup: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 320,
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  popupNotes: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  popupClose: {
    marginTop: spacing.md,
    alignItems: 'center',
    padding: spacing.sm,
  },
  popupCloseText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.accent,
  },
});
