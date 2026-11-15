import React from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MeasurementEntry, MeasurementField, DEFAULT_CATEGORIES, CATEGORY_FIELDS } from '../models';
import { useLanguage, getCategoryLabel, getFieldLabel } from '../i18n';
import { colors, spacing } from '../theme';

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

interface Props {
  entry: MeasurementEntry;
  fields: MeasurementField[];
  onPress: (entry: MeasurementEntry) => void;
  onShare?: (entry: MeasurementEntry) => void;
}

export function EntryCard({ entry, fields, onPress, onShare }: Props) {
  const { lang, t } = useLanguage();
  const category = DEFAULT_CATEGORIES.find(c => c.slug === entry.categorySlug);
  const icon = ICONS[entry.categorySlug] ?? '📏';

  const summary = fields
    .map(f => {
      const label = getFieldLabel(lang, f.key) ?? f.key;
      const unit = f.unit ? ` ${f.unit}` : '';
      return `${label}: ${f.value}${unit}`;
    })
    .join('  ·  ');

  const categoryLabel = getCategoryLabel(lang, entry.categorySlug) ?? category?.label ?? entry.categorySlug;
  const customName = entry.label !== (category?.label ?? entry.categorySlug) ? entry.label : null;

  return (
    <Pressable style={styles.card} onPress={() => onPress(entry)}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.label}>{categoryLabel}</Text>
          {customName && <Text style={styles.tag}>{customName}</Text>}
        </View>
        {entry.notes ? <Text style={styles.description} numberOfLines={1}>{entry.notes}</Text> : null}
        {summary ? (
          <Text style={styles.summary} numberOfLines={2}>{summary}</Text>
        ) : (
          <Text style={styles.noData}>{t.noMeasurementsAdded}</Text>
        )}
      </View>
      {onShare && fields.length > 0 && (
        <TouchableOpacity
          onPress={() => onShare(entry)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.actionButton}
        >
          <Feather name="share" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </Pressable>
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
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 28,
    marginRight: spacing.sm + 4,
    marginTop: 2,
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  tag: {
    fontSize: 11,
    color: colors.accent,
    backgroundColor: colors.accentLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '600',
    overflow: 'hidden',
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  summary: {
    fontSize: 13,
    color: colors.text,
    marginTop: 4,
    lineHeight: 18,
  },
  noData: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    fontStyle: 'italic',
  },
  actionButton: {
    padding: 4,
    marginLeft: spacing.sm,
    alignSelf: 'center',
  },
});
