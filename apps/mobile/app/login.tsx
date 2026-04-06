import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { useAuth } from '@budgetino/auth/provider';
import en from '@budgetino/shared/i18n/locales/en.json';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { signInWithGitHub } = useAuth();

  async function handleSignIn() {
    const redirectTo = makeRedirectUri({
      scheme: 'budgetino',
      path: 'auth/callback',
    });
    await signInWithGitHub({ redirectTo });
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
