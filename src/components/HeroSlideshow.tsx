import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, type NativeSyntheticEvent, type NativeScrollEvent } from "react-native";
import { colors, spacing, layout } from "@/theme";
import type { EquipmentTag, PantryItem } from "@/types";
import { RecipeHero, useHeroWidth } from "./RecipeHero";
import { hasRequiredEquipment, missingEquipment, type SlideshowMatch } from "@/lib/pantryMatch";
import { glidePosition, rewindDuration } from "@/lib/glide";

const GAP = spacing.md;
const AUTO_ADVANCE_MS = 5500;


interface HeroSlideshowProps {
  matches: SlideshowMatch[];
  ownedEquipment: EquipmentTag[];
  /** Soon-to-expire pantry items, used for the "uses X before it turns" line on a slide. */
  expiring: PantryItem[];
  onOpen: (recipeId: string) => void;
}

function usingUpLabel(expiring: PantryItem[], match: SlideshowMatch): string | undefined {
  const names = expiring
    .filter((item) => match.have.some((ing) => ing.pantryId === item.ingredientId || ing.pantryId === item.id))
    .slice(0, 2)
    .map((i) => i.name.toLowerCase());
  if (names.length === 0) return undefined;
  if (names.length === 1) return `Uses ${names[0]}, before it turns`;
  return `Uses ${names.join(" and ")}, before they turn`;
}

/** "Ready to cook" only when ingredients AND equipment are covered; otherwise be honest about what's short. */
function slideEyebrow(m: SlideshowMatch, owned: EquipmentTag[]): string {
  if (!m.complete) return "Cook tonight";
  return hasRequiredEquipment(owned, m.recipe) ? "Ready to cook" : "You have the ingredients";
}

/**
 * Home's opening spread: a swipeable, auto-advancing set of dishes the
 * user can already (partly or fully) make. Advances on a timer until the
 * user touches it, then stays where they put it.
 */
export function HeroSlideshow({ matches, ownedEquipment, expiring, onOpen }: HeroSlideshowProps) {
  const cardWidth = useHeroWidth();
  const step = cardWidth + GAP;
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const userTouched = useRef(false);
  const offsetX = useRef(0);
  const rafId = useRef<number | null>(null);

  const stopAnimation = useCallback(() => {
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    rafId.current = null;
  }, []);

  /** Our own eased scroll, so the long trip back to slide 1 glides instead of whipping past every slide. */
  const glideTo = useCallback(
    (toX: number, duration: number) => {
      stopAnimation();
      const fromX = offsetX.current;
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const x = glidePosition(fromX, toX, elapsed, duration);
        offsetX.current = x;
        scrollRef.current?.scrollTo({ x, animated: false });
        rafId.current = elapsed < duration ? requestAnimationFrame(tick) : null;
      };
      rafId.current = requestAnimationFrame(tick);
    },
    [stopAnimation]
  );

  useEffect(() => stopAnimation, [stopAnimation]);

  const goTo = useCallback(
    (i: number, animated = true) => {
      const rewinding = animated && i < indexRef.current;
      const slidesToCross = Math.abs(offsetX.current - i * step) / step;
      indexRef.current = i;
      setIndex(i);
      if (rewinding) {
        glideTo(i * step, rewindDuration(slidesToCross));
      } else {
        stopAnimation();
        scrollRef.current?.scrollTo({ x: i * step, animated });
      }
    },
    [step, glideTo, stopAnimation]
  );

  useEffect(() => {
    if (matches.length < 2) return;
    const timer = setInterval(() => {
      if (userTouched.current) return;
      goTo((indexRef.current + 1) % matches.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [matches.length, goTo]);

  useEffect(() => {
    if (indexRef.current >= matches.length) goTo(0, false);
  }, [matches.length, goTo]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / step);
    indexRef.current = i;
    setIndex(i);
  };

  const slides = useMemo(
    () =>
      matches.map((m) => (
        <View key={m.recipe.id} style={{ width: cardWidth }}>
          <RecipeHero
            recipe={m.recipe}
            haveCount={m.have.length}
            totalCount={m.recipe.ingredients.length}
            missing={m.missing}
            eyebrow={slideEyebrow(m, ownedEquipment)}
            canMake={slideEyebrow(m, ownedEquipment) === "Ready to cook"}
            usingUpLabel={usingUpLabel(expiring, m)}
            missingEquipment={missingEquipment(ownedEquipment, m.recipe)}
            onPress={() => onOpen(m.recipe.id)}
          />
        </View>
      )),
    [matches, cardWidth, expiring, ownedEquipment, onOpen]
  );

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={step}
        snapToAlignment="start"
        decelerationRate="fast"
        onScrollBeginDrag={() => {
          userTouched.current = true;
          stopAnimation();
        }}
        onScroll={(e) => {
          offsetX.current = e.nativeEvent.contentOffset.x;
        }}
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: layout.screenPadding, gap: GAP }}
      >
        {slides}
      </ScrollView>

      {matches.length > 1 && (
        <View style={styles.dots}>
          {matches.length <= 12 ? (
            matches.map((m, i) => (
              <Pressable
                key={m.recipe.id}
                hitSlop={8}
                onPress={() => {
                  userTouched.current = true;
                  goTo(i);
                }}
                style={[styles.dot, i === index && styles.dotActive]}
              />
            ))
          ) : (
            <View style={[styles.dot, styles.dotActive]} />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.espressoFaint,
    opacity: 0.5,
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.burntOrange,
    opacity: 1,
  },
});
