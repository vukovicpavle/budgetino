import { redirect } from 'next/navigation';

import en from '@budgetino/shared/i18n/locales/en.json';

import { createSupabaseServerClient } from '../../lib/supabase-server';
import { GitHubSignInButton } from './github-sign-in-button';

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return (
    <main>
      <h1>{en.auth.welcome}</h1>
      <GitHubSignInButton />
    </main>
  );
}
