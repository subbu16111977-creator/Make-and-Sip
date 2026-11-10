import React from "react";
import { Pressable as NativePressable, type PressableProps, type View } from "react-native";

/**
 * The app's one Pressable. Anything tappable gets the same quiet press feedback (a slight dim) without each screen
 * remembering to add it. A component that passes its own `style` function is assumed to draw its own pressed state,
 * so it is left alone and nothing is dimmed twice.
 */
const PRESSED = { opacity: 0.7 } as const;

export function Pressable({ style, disabled, ...rest }: PressableProps & React.RefAttributes<View>) {
  return (
    <NativePressable
      disabled={disabled}
      style={typeof style === "function" ? style : ({ pressed }) => [style, pressed && !disabled ? PRESSED : null]}
      {...rest}
    />
  );
}
