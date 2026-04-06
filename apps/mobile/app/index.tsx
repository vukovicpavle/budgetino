import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Budgetino</Text>
      <Text className="mt-2 text-base text-gray-500">
        Budget and subscription management
      </Text>
    </View>
  );
}
