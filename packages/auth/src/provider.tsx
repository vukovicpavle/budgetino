'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { ReactNode } from 'react';

export interface AuthContextValue {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signInWithGitHub: (options?: { redirectTo?: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
  /**
   * A factory function that returns a Supabase client.
   * Pass `createBrowserClient` from `@budgetino/auth/client` on web,
   * or a custom mobile client using expo-secure-store.
   */
  getSupabaseClient: () => SupabaseClient;
}

export function AuthProvider({
  children,
  getSupabaseClient,
}: AuthProviderProps) {
  const supabase = getSupabaseClient();

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signInWithGitHub = useCallback(
    async (options?: { redirectTo?: string }) => {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: options?.redirectTo,
        },
      });
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{ session, user, isLoading, signInWithGitHub, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
