import React from "react";
import { ScrollView, View, StyleSheet, type ScrollViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, layout } from "@/theme";

interface ScreenProps extends ScrollViewProps {
  children: React.ReactNode;
  /** Skip the ScrollView and render a plain flex container (for screens managing their own scroll). */
  noScroll?: boolean;
}

export function Screen({ children, noScroll, contentContainerStyle, ...rest }: ScreenProps) {
  if (noScroll) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.flex}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        {...rest}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: layout.sectionGap,
  },
});
