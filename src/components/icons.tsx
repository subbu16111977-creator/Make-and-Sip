import React from "react";
import { ArrowClockwise } from "phosphor-react-native/src/icons/ArrowClockwise";
import { ArrowRight } from "phosphor-react-native/src/icons/ArrowRight";
import { Basket } from "phosphor-react-native/src/icons/Basket";
import { BookmarkSimple } from "phosphor-react-native/src/icons/BookmarkSimple";
import { CaretLeft } from "phosphor-react-native/src/icons/CaretLeft";
import { CaretRight } from "phosphor-react-native/src/icons/CaretRight";
import { Check } from "phosphor-react-native/src/icons/Check";
import { Clock } from "phosphor-react-native/src/icons/Clock";
import { Compass } from "phosphor-react-native/src/icons/Compass";
import { Fire } from "phosphor-react-native/src/icons/Fire";
import { Heart } from "phosphor-react-native/src/icons/Heart";
import { House } from "phosphor-react-native/src/icons/House";
import { Jar } from "phosphor-react-native/src/icons/Jar";
import { Leaf } from "phosphor-react-native/src/icons/Leaf";
import { MagnifyingGlass } from "phosphor-react-native/src/icons/MagnifyingGlass";
import { Plus } from "phosphor-react-native/src/icons/Plus";
import { ShoppingBag } from "phosphor-react-native/src/icons/ShoppingBag";
import { SlidersHorizontal } from "phosphor-react-native/src/icons/SlidersHorizontal";
import { Snowflake } from "phosphor-react-native/src/icons/Snowflake";
import { Trash } from "phosphor-react-native/src/icons/Trash";
import { User } from "phosphor-react-native/src/icons/User";
import { WarningCircle } from "phosphor-react-native/src/icons/WarningCircle";
import { X } from "phosphor-react-native/src/icons/X";
import type { Icon as PhosphorIcon, IconWeight } from "phosphor-react-native";

/**
 * The app's icon set: Phosphor's "light" weight, a single consistent family drawn on one 256-unit grid with even,
 * fine strokes. Every icon in the app comes through here so size, weight and colour stay uniform; screens pass
 * `size`, `color`, and (for emphasis) a `strokeWidth` that picks a weight, or `filled` for the solid version.
 */
export interface IconProps {
  size?: number;
  color?: string;
  /** Picks the weight: under 1.4 thin, under 1.9 light (the default look), under 2.4 regular, otherwise bold. */
  strokeWidth?: number;
}

const defaults = { size: 24, color: "#EEE8DA", strokeWidth: 1.6 };

function weightFor(strokeWidth: number, filled: boolean): IconWeight {
  if (filled) return "fill";
  if (strokeWidth < 1.4) return "thin";
  if (strokeWidth < 1.9) return "light";
  if (strokeWidth < 2.4) return "regular";
  return "bold";
}

function make(Glyph: PhosphorIcon, base: { size?: number; strokeWidth?: number } = {}) {
  return function Icon({ size = base.size ?? defaults.size, color = defaults.color, strokeWidth = base.strokeWidth ?? defaults.strokeWidth, filled = false }: IconProps & { filled?: boolean }) {
    return <Glyph size={size} color={color} weight={weightFor(strokeWidth, filled)} />;
  };
}

/** Home tab. */
export const HomeIcon = make(House);
/** Pantry tab — a storage jar. */
export const PantryIcon = make(Jar);
/** Discover tab. */
export const DiscoverIcon = make(Compass);
/** Shopping tab. */
export const ShoppingIcon = make(ShoppingBag);
/** Saved tab, and the save toggle on drink cards. */
export const SavedIcon = make(BookmarkSimple);
/** Marks a favourite drink. */
export const HeartIcon = make(Heart);
/** Profile tab. */
export const ProfileIcon = make(User);
export const ClockIcon = make(Clock, { size: 16 });
export const CheckIcon = make(Check, { size: 14, strokeWidth: 2 });
export const ChevronRightIcon = make(CaretRight, { size: 16 });
export const ChevronLeftIcon = make(CaretLeft, { size: 16 });
export const LeafIcon = make(Leaf, { size: 16 });
export const ArrowRightIcon = make(ArrowRight, { size: 18 });
export const BasketEmptyIcon = make(Basket, { size: 56, strokeWidth: 1.2 });
export const AlertPlateIcon = make(WarningCircle, { size: 56, strokeWidth: 1.2 });
export const PlusIcon = make(Plus, { size: 18 });
export const CloseIcon = make(X, { size: 18 });
export const SearchIcon = make(MagnifyingGlass, { size: 18 });
export const TrashIcon = make(Trash, { size: 18 });
export const SlidersIcon = make(SlidersHorizontal, { size: 18 });
/** Marks a hot drink. */
export const FireIcon = make(Fire, { size: 15 });
/** Marks a cold drink. */
export const SnowflakeIcon = make(Snowflake, { size: 15 });
export const RefreshIcon = make(ArrowClockwise, { size: 16 });
