import * as SecureStore from 'expo-secure-store';

import { createClient } from '@supabase/supabase-js';

import type { SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_PREFIX = 'supabase.';

/**
 * Creates a Supabase client for React Native that persists the session
 * in Expo SecureStore.
 */
export function createMobileSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('Missing environment variable: EXPO_PUBLIC_SUPABASE_URL');
  }
  if (!supabaseAnonKey) {
    throw new Error(
      'Missing environment variable: EXPO_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: {
        async getItem(key: string) {
          return SecureStore.getItemAsync(`${STORAGE_KEY_PREFIX}${key}`);
        },
        async setItem(key: string, value: string) {
          await SecureStore.setItemAsync(`${STORAGE_KEY_PREFIX}${key}`, value);
        },
        async removeItem(key: string) {
          await SecureStore.deleteItemAsync(`${STORAGE_KEY_PREFIX}${key}`);
        },
      },
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
}
