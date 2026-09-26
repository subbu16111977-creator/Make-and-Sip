import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "@/theme";

/** Shown for the moment it takes to read saved data from the device — same background as the app, so there's no flash. */
export function AppBlank() {
  return <View style={styles.blank} />;
}

const styles = StyleSheet.create({
  blank: {
    flex: 1,
    backgroundColor: colors.cream,
  },
});
