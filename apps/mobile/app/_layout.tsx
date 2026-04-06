import { Stack } from 'expo-router';

import '../i18n/config';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Budgetino' }} />
    </Stack>
  );
}
