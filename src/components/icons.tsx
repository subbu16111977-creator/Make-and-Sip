import React from "react";
import Svg, { Path, Circle, Rect } from "react-native-svg";

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const defaults = { size: 24, color: "#F4EEE0", strokeWidth: 1.6 };

/** A calm house outline — Home tab. */
export function HomeIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 11.5L12 4.5L20 11.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 10V19H18V10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M10 19V14H14V19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/** A shelf/crate outline — Pantry tab. */
export function PantryIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 8L5.5 4H18.5L20 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Rect x="4" y="8" width="16" height="11" rx="1" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Path d="M4 13.2H20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M9 10.5V11.7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M9 15.7V16.9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

/** An open book outline — Discover tab. */
export function DiscoverIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6.2C10.6 5 8.4 4.4 4.8 4.4V17.6C8.4 17.6 10.6 18.2 12 19.4C13.4 18.2 15.6 17.6 19.2 17.6V4.4C15.6 4.4 13.4 5 12 6.2Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path d="M12 6.2V19.4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

/** A tote bag outline — Shopping tab. */
export function ShoppingIcon({ size = defaults.size, color = defaults.color, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 9V6.8C7 4.7 8.7 3 10.8 3H13.2C15.3 3 17 4.7 17 6.8V9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Rect x="4.5" y="9" width="15" height="11.5" rx="1.4" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </Svg>
  );
}

/** A bookmark ribbon — Saved tab, and the save-toggle on recipe cards. */
export function SavedIcon({
  size = defaults.size,
  color = defaults.color,
  strokeWidth = defaults.strokeWidth,
  filled = false,
}: IconProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 4.5H18V20L12 16L6 20V4.5Z"
        stroke={color}
        fill={filled ? color : "none"}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ClockIcon({ size = 16, color = defaults.color, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8.2" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M12 8V12.2L14.6 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CheckIcon({ size = 14, color = defaults.color, strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12.5L9.5 17L19 6.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 18, color = defaults.color, strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 5L16 12L9 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ChevronLeftIcon({ size = 18, color = defaults.color, strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 5L8 12L15 19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function LeafIcon({ size = 16, color = defaults.color, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 19C5 12 9 5 19 5C19 15 12 19 5 19Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path d="M6.5 17.5L14 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function ArrowRightIcon({ size = 18, color = defaults.color, strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 12H20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M14 6L20 12L14 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function BasketEmptyIcon({ size = 56, color = defaults.color, strokeWidth = 1.4 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <Path d="M10 22H46L42 46H14L10 22Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <Path d="M16 22L22 10H34L40 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M22 29V39" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={0.6} />
      <Path d="M28 29V39" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={0.6} />
      <Path d="M34 29V39" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={0.6} />
    </Svg>
  );
}

export function AlertPlateIcon({ size = 56, color = defaults.color, strokeWidth = 1.4 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <Circle cx="28" cy="28" r="18" stroke={color} strokeWidth={strokeWidth} />
      <Circle cx="28" cy="28" r="11" stroke={color} strokeWidth={strokeWidth} opacity={0.5} />
      <Path d="M28 22V29" stroke={color} strokeWidth={strokeWidth + 0.4} strokeLinecap="round" />
      <Circle cx="28" cy="34" r="1.2" fill={color} />
    </Svg>
  );
}

export function PlusIcon({ size = 18, color = defaults.color, strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5V19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M5 12H19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function CloseIcon({ size = 16, color = defaults.color, strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 6L18 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M18 6L6 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function SearchIcon({ size = 18, color = defaults.color, strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M19 19L15.2 15.2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function TrashIcon({ size = 18, color = defaults.color, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 7H19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M9 7V4.6C9 4.3 9.3 4 9.6 4H14.4C14.7 4 15 4.3 15 4.6V7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7 7L7.8 19.2C7.85 19.9 8.4 20.4 9.1 20.4H14.9C15.6 20.4 16.15 19.9 16.2 19.2L17 7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.3 11V16.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={0.6} />
      <Path d="M13.7 11V16.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={0.6} />
    </Svg>
  );
}

export function SlidersIcon({ size = 18, color = defaults.color, strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7H14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M17 7H20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Circle cx="15.5" cy="7" r="2" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M4 17H7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M10 17H20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Circle cx="8.5" cy="17" r="2" stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  );
}

export function RefreshIcon({ size = 16, color = defaults.color, strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 11A8 8 0 0 0 5.6 6.3L4 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 4V8H8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 13A8 8 0 0 0 18.4 17.7L20 16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20 20V16H16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
