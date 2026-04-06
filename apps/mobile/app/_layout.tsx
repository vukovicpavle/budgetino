import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';

import { AuthProvider, useAuth } from '@budgetino/auth/provider';

import { createMobileSupabaseClient } from '../lib/supabase-client';

function AuthGuard() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'login';

    if (!user && !inAuthGroup) {
      router.replace('/login');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, isLoading, segments, router]);

  return null;
}

import '../i18n/config';

export default function RootLayout() {
  return (
    <AuthProvider getSupabaseClient={createMobileSupabaseClient}>
      <AuthGuard />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Budgetino' }} />
        <Stack.Screen
          name="login"
          options={{ title: 'Sign In', headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
}
