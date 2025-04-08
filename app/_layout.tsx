import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '' }} />
      <Stack.Screen name="group/[id]" options={{ title: 'Group Details' }} />
      <Stack.Screen name="add-expense/[groupId]" options={{ title: 'Add Expense' }} />
    </Stack>
  );
}
