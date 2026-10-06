import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "@/theme";
import { ProfileIcon } from "./icons";
import { initialsFor } from "@/lib/profile";
import { DEFAULT_CROP, layoutFor, type PhotoCrop } from "@/lib/photoCrop";

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  /** The photo's width / height. Without it the photo simply fills the circle. */
  aspect?: number;
  /** How the photo was positioned and zoomed in the crop screen. */
  crop?: PhotoCrop;
}

/** The profile picture (cropped as the user set it), or a tasteful default (initials, else a person outline) when there's no photo or it can't be loaded. */
export function Avatar({ uri, name, size = 88, aspect, crop }: AvatarProps) {
  const [failedUri, setFailedUri] = useState<string | undefined>(undefined);
  const showPhoto = Boolean(uri) && failedUri !== uri;
  const initials = initialsFor(name);
  const placed = aspect ? layoutFor(crop ?? DEFAULT_CROP, aspect, size) : null;

  return (
    <View
      style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={showPhoto ? "Your profile photo" : "Default profile picture"}
    >
      {showPhoto ? (
        <Image
          source={{ uri }}
          style={placed ? { position: "absolute", ...placed } : { width: size, height: size }}
          resizeMode={placed ? "stretch" : "cover"}
          onError={() => setFailedUri(uri)}
        />
      ) : initials ? (
        <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{initials}</Text>
      ) : (
        <ProfileIcon size={size * 0.5} color={colors.burntOrange} strokeWidth={1.5} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  initials: {
    color: colors.burntOrange,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
