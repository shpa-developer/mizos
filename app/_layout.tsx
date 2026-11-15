import React from 'react';
import { Stack } from 'expo-router';
import { LanguageProvider } from '../src/i18n';
import { ErrorBoundary } from '../src/components';
import { colors } from '../src/theme';

export default function RootLayout() {
  return (
    <ErrorBoundary>
    <LanguageProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '600' },
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile/[id]" options={{ title: 'Profile' }} />
        <Stack.Screen name="profile/create" options={{ title: 'New Profile', presentation: 'modal' }} />
        <Stack.Screen name="entry/[id]" options={{ title: 'Measurements' }} />
        <Stack.Screen name="import/index" options={{ title: 'Import', presentation: 'modal' }} />
      </Stack>
    </LanguageProvider>
    </ErrorBoundary>
  );
}
