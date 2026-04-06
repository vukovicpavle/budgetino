import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { formatCurrency, formatDate } from '@budgetino/shared/i18n';

export default function HomeScreen() {
  const { t } = useTranslation();

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
});
