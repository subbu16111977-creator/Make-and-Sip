import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing, type as typeScale, shadows } from "@/theme";
import { HomeIcon, PantryIcon, DiscoverIcon, ShoppingIcon, SavedIcon, type IconProps } from "@/components/icons";

const TAB_META: Record<string, { label: string; Icon: React.ComponentType<IconProps> }> = {
  index: { label: "Home", Icon: HomeIcon },
  pantry: { label: "Pantry", Icon: PantryIcon },
  discover: { label: "Discover", Icon: DiscoverIcon },
  shopping: { label: "Shopping", Icon: ShoppingIcon },
  saved: { label: "Saved", Icon: SavedIcon },
};

/**
 * Minimal local shape for what this tab bar reads off the navigator's
 * props — avoids depending on expo-router's internal (and shifting)
 * react-navigation re-export surface.
 */
interface MiseTabBarProps {
  state: {
    index: number;
    routes: { key: string; name: string }[];
  };
  navigation: any;
}

function MiseTabBar({ state, navigation }: MiseTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {state.routes.map((route, index) => {
        const meta = TAB_META[route.name];
        if (!meta) return null;
        const focused = state.index === index;
        const { Icon } = meta;

        const onPress = () => {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tab} hitSlop={6}>
            <View style={[styles.indicator, focused && styles.indicatorActive]} />
            <Icon size={22} color={focused ? colors.burntOrange : colors.espressoFaint} strokeWidth={focused ? 1.8 : 1.5} />
            <Text style={[styles.label, focused && styles.labelActive]}>{meta.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <MiseTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="pantry" options={{ title: "Pantry" }} />
      <Tabs.Screen name="discover" options={{ title: "Discover" }} />
      <Tabs.Screen name="shopping" options={{ title: "Shopping" }} />
      <Tabs.Screen name="saved" options={{ title: "Saved" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: colors.cream,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
    paddingTop: 10,
    paddingHorizontal: spacing.sm,
    ...shadows.none,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  indicator: {
    position: "absolute",
    top: -10,
    width: 28,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: "transparent",
  },
  indicatorActive: {
    backgroundColor: colors.burntOrange,
  },
  label: {
    ...typeScale.caption,
    fontSize: 11,
    color: colors.espressoFaint,
  },
  labelActive: {
    color: colors.burntOrange,
    fontFamily: typeScale.label.fontFamily,
  },
});
