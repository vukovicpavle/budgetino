import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@budgetino/auth/provider';
import { formatCurrency, formatDate } from '@budgetino/shared/i18n';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('auth.welcome')}</Text>
      <Text style={styles.subtitle}>{t('budget.title')}</Text>
      <Text>
        {t('budget.remaining', {
          amount: formatCurrency(1234.5, 'USD'),
        })}
      </Text>
      <Text>{formatDate(new Date())}</Text>
      {user && (
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>{t('auth.signOut')}</Text>
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
