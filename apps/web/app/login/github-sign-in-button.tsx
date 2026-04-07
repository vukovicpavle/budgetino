'use client';

import { createBrowserClient } from '@budgetino/auth/client';
import en from '@budgetino/shared/i18n/locales/en.json';

export function GitHubSignInButton() {
  async function handleSignIn() {
    const supabase = createBrowserClient();
    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback`
        : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo },
    });

    if (error) {
      console.error('Failed to initiate GitHub OAuth sign-in', error);
      throw error;
    }
  }

  return <button onClick={handleSignIn}>{en.auth.signInWithGitHub}</button>;
}
