import React from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { useLanguage } from '../../src/i18n';
import { colors } from '../../src/theme';

export default function TabLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.profiles,
          tabBarLabel: t.profiles,
          tabBarIcon: ({ color }) => <TabIcon label="👤" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.settings,
          tabBarLabel: t.settings,
          tabBarIcon: ({ color }) => <TabIcon label="⚙️" />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({ label }: { label: string }) {
  return <Text style={{ fontSize: 20 }}>{label}</Text>;
}
