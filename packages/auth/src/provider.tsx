'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { ReactNode } from 'react';

export interface SignInWithGitHubOptions {
  redirectTo?: string;
  /**
   * When `true`, Supabase will not auto-redirect. Instead, the returned URL
   * should be opened manually — e.g. via `expo-web-browser` on mobile.
   */
  skipBrowserRedirect?: boolean;
}

export interface AuthContextValue {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  /**
   * Initiates GitHub OAuth. Returns `{ url }` so callers can open the URL
   * manually when `skipBrowserRedirect` is `true` (e.g. on mobile).
   */
  signInWithGitHub: (
    options?: SignInWithGitHubOptions
  ) => Promise<{ url: string | null }>;
  /**
   * Exchanges an OAuth PKCE callback URL (deep-link or redirect) for a
   * session. Use this on mobile after `WebBrowser.openAuthSessionAsync`
   * returns a URL that contains `?code=…`.
   */
  exchangeCodeForSession: (callbackUrl: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
  /**
   * A factory function that returns a Supabase client.
   * Pass `createBrowserClient` from `@budgetino/auth/client` on web,
   * or a custom mobile client using expo-secure-store.
   * The function is called once and the result is memoised for the lifetime
   * of the provider.
   */
  getSupabaseClient: () => SupabaseClient;
}

export function AuthProvider({
  children,
  getSupabaseClient,
}: AuthProviderProps) {
  // Stabilise the client so the effect / callbacks are not re-created on every
  // render (getSupabaseClient() could otherwise return a new instance each
  // call which would leak auth-state listeners).
  const supabaseRef = useRef<SupabaseClient | null>(null);
  if (!supabaseRef.current) {
    supabaseRef.current = getSupabaseClient();
  }
  const supabase = supabaseRef.current;

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const {
          data: { session: s },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setSession(s);
        setUser(s?.user ?? null);
      } catch (err) {
        console.error('Failed to get initial auth session', err);
      } finally {
        setIsLoading(false);
      }
    })();

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
    async (
      options?: SignInWithGitHubOptions
    ): Promise<{ url: string | null }> => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: options?.redirectTo,
          skipBrowserRedirect: options?.skipBrowserRedirect,
        },
      });
      if (error) {
        throw error;
      }
      return { url: data.url };
    },
    [supabase]
  );

  const exchangeCodeForSession = useCallback(
    async (callbackUrl: string): Promise<void> => {
      const safeUrl = callbackUrl.split('?')[0];
      const invalidUrlError = new Error(
        `Invalid callback URL passed to exchangeCodeForSession: ${safeUrl}`
      );
      let url: URL;
      try {
        url = new URL(callbackUrl);
      } catch {
        if (typeof window !== 'undefined' && window.location?.origin) {
          try {
            url = new URL(callbackUrl, window.location.origin);
          } catch {
            throw invalidUrlError;
          }
        } else {
          throw invalidUrlError;
        }
      }
      const oauthError = url.searchParams.get('error');
      if (oauthError) {
        const oauthErrorDescription =
          url.searchParams.get('error_description') ??
          url.searchParams.get('error_code');
        throw new Error(
          oauthErrorDescription
            ? `OAuth callback error: ${oauthError} (${oauthErrorDescription})`
            : `OAuth callback error: ${oauthError}`
        );
      }
      const code = url.searchParams.get('code');
      if (!code) {
        throw new Error(
          `Missing authorization code in callback URL passed to exchangeCodeForSession: ${safeUrl}`
        );
      }
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        throw error;
      }
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        signInWithGitHub,
        exchangeCodeForSession,
        signOut,
      }}
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
