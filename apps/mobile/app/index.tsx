import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { formatCurrency, formatDate } from '@budgetino/shared/i18n';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">{t('auth.welcome')}</Text>
      <Text className="mt-2 text-base text-gray-500">{t('budget.title')}</Text>
      <Text>
        {t('budget.remaining', {
          amount: formatCurrency(1234.5, 'USD'),
        })}
      </Text>
      <Text>{formatDate(new Date())}</Text>
    </View>
  );
}
