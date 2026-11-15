import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MeasurementField, CATEGORY_FIELDS, FieldDef } from '../models';
import { useLanguage, getFieldLabel } from '../i18n';
import { colors, spacing, commonStyles } from '../theme';

const UNIT_TOGGLES: Record<string, string[]> = {
  'in': ['in', 'cm'],
  'cm': ['cm', 'in'],
  'UK': ['UK', 'US'],
  'US': ['US', 'UK'],
};

interface Props {
  categorySlug: string;
  existingFields: MeasurementField[];
  onSave: (fields: Omit<MeasurementField, 'id'>[]) => Promise<void>;
  entryId: string;
}

export function MeasurementForm({ categorySlug, existingFields, onSave, entryId }: Props) {
  const { lang, t } = useLanguage();
  const fieldDefs = CATEGORY_FIELDS[categorySlug] ?? [];
  const [values, setValues] = useState<Record<string, string>>({});
  const [units, setUnits] = useState<Record<string, string>>({});
  const dirty = useRef(false);

  useEffect(() => {
    const valMap: Record<string, string> = {};
    const unitMap: Record<string, string> = {};
    for (const f of existingFields) {
      valMap[f.key] = f.value;
      unitMap[f.key] = f.unit;
    }
    for (const def of fieldDefs) {
      if (!unitMap[def.key] && def.unit) {
        unitMap[def.key] = def.unit;
      }
    }
    setValues(valMap);
    setUnits(unitMap);
    dirty.current = false;
  }, [existingFields]);

  const buildFields = useCallback(() => {
    return fieldDefs
      .filter(def => values[def.key]?.trim())
      .map(def => ({
        entryId,
        key: def.key,
        value: values[def.key].trim(),
        unit: units[def.key] ?? def.unit,
      }));
  }, [fieldDefs, values, units, entryId]);

  const autoSave = useCallback(() => {
    if (!dirty.current) return;
    dirty.current = false;
    onSave(buildFields());
  }, [buildFields, onSave]);

  const handleValueChange = (key: string, text: string) => {
    dirty.current = true;
    setValues(prev => ({ ...prev, [key]: text }));
  };

  const handleSelectChange = (key: string, opt: string) => {
    dirty.current = true;
    setValues(prev => ({ ...prev, [key]: opt }));
    setTimeout(() => {
      dirty.current = true;
      onSave(
        fieldDefs
          .filter(def => {
            if (def.key === key) return opt.trim() !== '';
            return values[def.key]?.trim();
          })
          .map(def => ({
            entryId,
            key: def.key,
            value: def.key === key ? opt.trim() : values[def.key].trim(),
            unit: units[def.key] ?? def.unit,
          }))
      );
      dirty.current = false;
    }, 0);
  };

  const toggleUnit = (key: string) => {
    const current = units[key];
    const options = UNIT_TOGGLES[current];
    if (!options || options.length < 2) return;
    dirty.current = true;
    setUnits(prev => ({ ...prev, [key]: options[1] }));
    setTimeout(() => {
      const updatedUnits = { ...units, [key]: options[1] };
      onSave(
        fieldDefs
          .filter(def => values[def.key]?.trim())
          .map(def => ({
            entryId,
            key: def.key,
            value: values[def.key].trim(),
            unit: updatedUnits[def.key] ?? def.unit,
          }))
      );
      dirty.current = false;
    }, 0);
  };

  const renderSelectField = (def: FieldDef) => {
    const selected = values[def.key] ?? '';
    return (
      <View style={styles.optionsRow}>
        {def.options!.map(opt => (
          <TouchableOpacity
            key={opt}
            style={[styles.optionChip, selected === opt && styles.optionChipSelected]}
            onPress={() => handleSelectChange(def.key, opt)}
          >
            <Text style={[styles.optionText, selected === opt && styles.optionTextSelected]}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderNumberField = (def: FieldDef) => {
    const currentUnit = units[def.key] ?? def.unit;
    const canToggle = !!UNIT_TOGGLES[currentUnit];

    return (
      <View style={styles.inputRow}>
        <TextInput
          style={[commonStyles.input, styles.numberInput]}
          value={values[def.key] ?? ''}
          onChangeText={text => handleValueChange(def.key, text)}
          onBlur={autoSave}
          placeholder={t.enterValue.replace('{label}', getFieldLabel(lang, def.key) ?? def.label)}
          placeholderTextColor={colors.textSecondary}
          keyboardType="decimal-pad"
        />
        {currentUnit ? (
          <TouchableOpacity
            style={[styles.unitBadge, canToggle && styles.unitBadgeTappable]}
            onPress={canToggle ? () => toggleUnit(def.key) : undefined}
            activeOpacity={canToggle ? 0.6 : 1}
          >
            <Text style={styles.unitText}>{currentUnit}</Text>
            {canToggle && <Text style={styles.unitSwap}>↔</Text>}
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  const handleStep = (key: string, step: number, direction: 1 | -1) => {
    const current = parseFloat(values[key] || '0');
    const next = Math.round((current + step * direction) * 100) / 100;
    const formatted = next >= 0 ? `+${next.toFixed(2)}` : next.toFixed(2);
    dirty.current = true;
    setValues(prev => ({ ...prev, [key]: formatted }));
    setTimeout(() => {
      onSave(
        fieldDefs
          .filter(def => {
            if (def.key === key) return true;
            return values[def.key]?.trim();
          })
          .map(def => ({
            entryId,
            key: def.key,
            value: def.key === key ? formatted : values[def.key]?.trim() ?? '',
            unit: units[def.key] ?? def.unit,
          }))
      );
      dirty.current = false;
    }, 0);
  };

  const renderStepperField = (def: FieldDef) => {
    const val = values[def.key] || '0.00';
    const numVal = parseFloat(val);
    const displayVal = isNaN(numVal) ? '0.00' : (numVal >= 0 ? `+${numVal.toFixed(2)}` : numVal.toFixed(2));
    const side = def.key.endsWith('_left') ? t.left ?? 'L' : t.right ?? 'R';

    return (
      <View style={styles.stepperCol}>
        <Text style={styles.stepperSide}>{side}</Text>
        <View style={styles.stepperRow}>
          <TouchableOpacity
            style={styles.stepperBtn}
            onPress={() => handleStep(def.key, def.step ?? 0.25, -1)}
          >
            <Text style={styles.stepperBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={[styles.stepperValue, numVal < 0 && styles.stepperValueNeg]}>
            {displayVal}
          </Text>
          <TouchableOpacity
            style={styles.stepperBtn}
            onPress={() => handleStep(def.key, def.step ?? 0.25, 1)}
          >
            <Text style={styles.stepperBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const groupedPairs = (() => {
    const pairs: { label: string; left: FieldDef; right: FieldDef }[] = [];
    const seen = new Set<string>();
    for (const def of fieldDefs) {
      if (def.pair && !seen.has(def.pair)) {
        seen.add(def.pair);
        const left = fieldDefs.find(d => d.pair === def.pair && d.key.endsWith('_left'));
        const right = fieldDefs.find(d => d.pair === def.pair && d.key.endsWith('_right'));
        if (left && right) {
          const pairLabel = def.pair.toUpperCase();
          pairs.push({ label: pairLabel, left, right });
        }
      }
    }
    return pairs;
  })();

  const pairedKeys = new Set(groupedPairs.flatMap(p => [p.left.key, p.right.key]));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {fieldDefs.filter(def => !pairedKeys.has(def.key)).map(def => (
        <View key={def.key} style={styles.fieldRow}>
          <Text style={styles.label}>{getFieldLabel(lang, def.key) ?? def.label}</Text>
          {def.type === 'select' ? renderSelectField(def) : def.type === 'stepper' ? renderStepperField(def) : renderNumberField(def)}
        </View>
      ))}
      {groupedPairs.map(pair => (
        <View key={pair.label} style={styles.fieldRow}>
          <Text style={styles.label}>{pair.label}</Text>
          <View style={styles.pairRow}>
            {renderStepperField(pair.left)}
            {renderStepperField(pair.right)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  fieldRow: { marginBottom: spacing.lg },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  numberInput: {
    flex: 1,
  },
  unitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    gap: 4,
  },
  unitBadgeTappable: {
    backgroundColor: colors.accentLight,
  },
  unitText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
  },
  unitSwap: {
    fontSize: 12,
    color: colors.accent,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionChip: {
    paddingHorizontal: spacing.sm + 6,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  optionChipSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.accent,
    fontWeight: '700',
  },
  pairRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stepperCol: {
    flex: 1,
    alignItems: 'center',
  },
  stepperSide: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accent,
    lineHeight: 22,
  },
  stepperValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    minWidth: 60,
    textAlign: 'center',
  },
  stepperValueNeg: {
    color: colors.danger,
  },
});
