import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MeasurementCategory } from '../models';
import { colors, spacing } from '../theme';

const ICONS: Record<string, string> = {
  shirt: '👕',
  glasses: '👓',
  shoe: '👟',
};

interface Props {
  category: MeasurementCategory;
  entryCount: number;
  onPress: (category: MeasurementCategory) => void;
}

export function CategoryCard({ category, entryCount, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(category)} activeOpacity={0.7}>
      <Text style={styles.icon}>{ICONS[category.icon] ?? '📏'}</Text>
      <Text style={styles.label}>{category.label}</Text>
      <Text style={styles.count}>{entryCount} {entryCount === 1 ? 'entry' : 'entries'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    marginRight: spacing.sm + 4,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  count: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
