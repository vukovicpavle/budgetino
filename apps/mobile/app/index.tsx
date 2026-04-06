import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@budgetino/auth/provider';
import { formatCurrency, formatDate } from '@budgetino/shared/i18n';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

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
      {user && (
        <TouchableOpacity
          className="mt-6 rounded-lg bg-gray-800 px-6 py-3"
          onPress={signOut}
        >
          <Text className="text-base font-semibold text-white">
            {t('auth.signOut')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
