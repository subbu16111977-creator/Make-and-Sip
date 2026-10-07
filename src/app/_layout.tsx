import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { MAX_APP_WIDTH } from "@/lib/useAppDimensions";
import { Stack } from "expo-router/js-stack";
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
import { ProfileProvider } from "@/context/ProfileContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { FirstLaunchGate } from "@/components/FirstLaunchGate";

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
              <FavoritesProvider>
              <SubscriptionProvider>
              <ProfileProvider>
              <View style={styles.page}>
              <View style={styles.root} onLayout={onLayoutRootView}>
                <StatusBar style="light" />
                <Stack screenOptions={{ headerShown: false, animation: "slide_from_right", cardStyle: { backgroundColor: colors.cream } }}>
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="recipe/[id]" options={{ animation: "slide_from_right" }} />
                  <Stack.Screen name="paywall" options={{ animation: "slide_from_bottom" }} />
                  <Stack.Screen name="subscription" options={{ animation: "slide_from_right" }} />
                </Stack>
                <FirstLaunchGate />
              </View>
              </View>
              </ProfileProvider>
              </SubscriptionProvider>
              </FavoritesProvider>
            </SavedProvider>
          </ShoppingProvider>
        </EquipmentProvider>
      </PantryProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // On the web the app is a centred phone-width column; on a phone this is a no-op.
  page: {
    flex: 1,
    backgroundColor: Platform.OS === "web" ? "#0B0A08" : colors.cream,
    alignItems: "center",
  },
  root: {
    flex: 1,
    width: "100%",
    maxWidth: MAX_APP_WIDTH,
    backgroundColor: colors.cream,
    overflow: "hidden",
    ...(Platform.OS === "web" ? { borderLeftWidth: StyleSheet.hairlineWidth, borderRightWidth: StyleSheet.hairlineWidth, borderColor: colors.hairlineStrong } : null),
  },
  blank: {
    flex: 1,
    backgroundColor: colors.cream,
  },
});
