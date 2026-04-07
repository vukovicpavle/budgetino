import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import { useAuth } from '@budgetino/auth/provider';
import en from '@budgetino/shared/i18n/locales/en.json';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { signInWithGitHub, exchangeCodeForSession } = useAuth();

  async function handleSignIn() {
    const redirectTo = makeRedirectUri({
      scheme: 'budgetino',
      path: 'auth/callback',
    });

    // Ask Supabase for the OAuth URL without auto-redirecting so that we can
    // open it ourselves via expo-web-browser.
    const { url } = await signInWithGitHub({
      redirectTo,
      skipBrowserRedirect: true,
    });

    if (!url) return;

    // Open the GitHub authorization page in the system browser, waiting for
    // the deep-link redirect back to the app.
    const result = await WebBrowser.openAuthSessionAsync(url, redirectTo);

    if (result.type === 'success' && result.url) {
      // Parse the deep-link URL and exchange the PKCE code for a session.
      const parsed = Linking.parse(result.url);
      const code = parsed.queryParams?.code;
      if (typeof code === 'string') {
        // Use the redirectTo URI as the base so the scheme/path stays a single
        // source of truth (defined above via makeRedirectUri).
        await exchangeCodeForSession(
          `${redirectTo}?${new URLSearchParams({ code }).toString()}`
        );
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{en.auth.welcome}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>{en.auth.signInWithGitHub}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#24292e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
