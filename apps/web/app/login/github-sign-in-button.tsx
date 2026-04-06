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
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo },
    });
  }

  return <button onClick={handleSignIn}>{en.auth.signInWithGitHub}</button>;
}
