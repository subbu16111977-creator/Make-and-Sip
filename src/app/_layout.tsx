import React, { useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { colors } from "@/theme";
import { fontsToLoad } from "@/theme/typography";
import { PantryProvider } from "@/context/PantryContext";
import { ShoppingProvider } from "@/context/ShoppingContext";
import { SavedProvider } from "@/context/SavedContext";
import { EquipmentProvider } from "@/context/EquipmentContext";

SplashScreen.preventAutoHideAsync().catch(() => {
  // no-op — safe to ignore if already hidden
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontsToLoad);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  const onLayoutRootView = useCallback(() => {
    // Intentionally left for potential root-level measurement later.
  }, []);

  if (!fontsLoaded && !fontError) {
    return <View style={styles.blank} />;
  }

  return (
    <SafeAreaProvider>
      <PantryProvider>
        <EquipmentProvider>
          <ShoppingProvider>
            <SavedProvider>
              <View style={styles.root} onLayout={onLayoutRootView}>
                <StatusBar style="light" />
                <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.cream } }}>
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="recipe/[id]" options={{ animation: "slide_from_right" }} />
                </Stack>
              </View>
            </SavedProvider>
          </ShoppingProvider>
        </EquipmentProvider>
      </PantryProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  blank: {
    flex: 1,
    backgroundColor: colors.cream,
  },
});
