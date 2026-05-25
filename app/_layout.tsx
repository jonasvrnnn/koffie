import { Stack } from "expo-router";
import { CoffeeProvider } from "../context/CoffeeContext";

export default function RootLayout() {
  return (
    <CoffeeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="coffee/[id]" />
        <Stack.Screen name="settings" />
      </Stack>
    </CoffeeProvider>
  );
}
