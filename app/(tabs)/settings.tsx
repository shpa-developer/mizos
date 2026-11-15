import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useLanguage, LANGUAGES, LangCode } from '../../src/i18n';
import { colors, spacing, commonStyles } from '../../src/theme';

export default function SettingsScreen() {
  const { lang, shareLang, t, setAppLanguage, setShareLanguage } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<'app' | 'share' | null>(null);

  const currentAppLang = LANGUAGES.find(l => l.code === lang)!;
  const currentShareLang = LANGUAGES.find(l => l.code === shareLang)!;

  const toggleSection = (section: 'app' | 'share') => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const handleAppLangSelect = (code: LangCode) => {
    setAppLanguage(code);
    setExpandedSection(null);
  };

  const handleShareLangSelect = (code: LangCode) => {
    setShareLanguage(code);
    setExpandedSection(null);
  };

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={commonStyles.subtitle}>{t.appLanguage}</Text>
        <TouchableOpacity style={styles.selector} onPress={() => toggleSection('app')}>
          <Text style={styles.selectorText}>{currentAppLang.nativeLabel}</Text>
          <Feather
            name={expandedSection === 'app' ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
        {expandedSection === 'app' && (
          <View style={styles.langList}>
            {LANGUAGES.map(l => (
              <TouchableOpacity
                key={l.code}
                style={styles.langRow}
                onPress={() => handleAppLangSelect(l.code)}
              >
                <View style={styles.langInfo}>
                  <Text style={styles.langNative}>{l.nativeLabel}</Text>
                  <Text style={styles.langEnglish}>{l.label}</Text>
                </View>
                {lang === l.code && (
                  <Feather name="check" size={18} color={colors.accent} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={commonStyles.subtitle}>{t.defaultShareLanguage}</Text>
        <TouchableOpacity style={styles.selector} onPress={() => toggleSection('share')}>
          <Text style={styles.selectorText}>{currentShareLang.nativeLabel}</Text>
          <Feather
            name={expandedSection === 'share' ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
        {expandedSection === 'share' && (
          <View style={styles.langList}>
            {LANGUAGES.map(l => (
              <TouchableOpacity
                key={l.code}
                style={styles.langRow}
                onPress={() => handleShareLangSelect(l.code)}
              >
                <View style={styles.langInfo}>
                  <Text style={styles.langNative}>{l.nativeLabel}</Text>
                  <Text style={styles.langEnglish}>{l.label}</Text>
                </View>
                {shareLang === l.code && (
                  <Feather name="check" size={18} color={colors.accent} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={commonStyles.subtitle}>{t.about}</Text>
        <View style={styles.row}>
          <Text style={commonStyles.body}>{t.version}</Text>
          <Text style={commonStyles.caption}>{Constants.expoConfig?.version ?? '1.0.0'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={commonStyles.caption}>{t.dataInfo}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xl,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.sm + 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectorText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  langList: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  langInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  langNative: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  langEnglish: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
