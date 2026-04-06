import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@budgetino/auth/provider';
import en from '@budgetino/shared/i18n/locales/en.json';

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budgetino</Text>
      <Text style={styles.subtitle}>Budget and subscription management</Text>
      {user && (
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>{en.auth.signOut}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  button: {
    marginTop: 24,
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
