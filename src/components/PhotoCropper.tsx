import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Modal, Pressable, PanResponder, Platform, StyleSheet } from "react-native";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { colors, radii, spacing, type as typeScale } from "@/theme";
import { DEFAULT_CROP, MAX_ZOOM, MIN_ZOOM, clampCrop, layoutFor, withDrag, withZoom, type PhotoCrop } from "@/lib/photoCrop";

interface PhotoCropperProps {
  visible: boolean;
  uri: string;
  /** The photo's width / height. */
  aspect: number;
  initialCrop: PhotoCrop;
  onCancel: () => void;
  onDone: (crop: PhotoCrop) => void;
}

const STEP = 0.25;

function distance(touches: readonly { pageX: number; pageY: number }[]): number {
  const [a, b] = touches;
  return Math.hypot(a.pageX - b.pageX, a.pageY - b.pageY);
}

/**
 * Round crop screen: drag the photo to move it, and zoom with pinch (phones),
 * the mouse wheel (web), the slider, or the + / − buttons. The result is only a
 * position and zoom — the original photo is never changed.
 */
export function PhotoCropper(props: PhotoCropperProps) {
  return (
    <Modal visible={props.visible} transparent animationType="fade" onRequestClose={props.onCancel}>
      {/* Mounted only while open, so each opening starts from the stored crop. */}
      {props.visible ? <CropperBody {...props} /> : null}
    </Modal>
  );
}

function CropperBody({ visible, uri, aspect, initialCrop, onCancel, onDone }: PhotoCropperProps) {
  const { width } = useAppDimensions();
  const side = Math.min(width - spacing["2xl"] * 2, 320);
  const [crop, setCrop] = useState<PhotoCrop>(() => clampCrop(initialCrop, aspect));
  const cropRef = useRef(crop);
  const stageRef = useRef<View>(null);
  const trackRef = useRef<View>(null);
  const trackBox = useRef({ x: 0, w: 1 });
  const aspectRef = useRef(aspect);
  const sideRef = useRef(side);

  useEffect(() => {
    aspectRef.current = aspect;
    sideRef.current = side;
  });

  function update(next: PhotoCrop) {
    cropRef.current = next;
    setCrop(next);
  }

  // Drag to move, two fingers to pinch. (The handlers only touch refs when a gesture happens, never while rendering.)
  /* eslint-disable react-hooks/refs */
  const gesture = useRef({ base: DEFAULT_CROP as PhotoCrop, touches: 0, dx0: 0, dy0: 0, dist0: 1 });
  const [stagePan] = useState(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        gesture.current = { base: cropRef.current, touches: 0, dx0: 0, dy0: 0, dist0: 1 };
      },
      onPanResponderMove: (e, g) => {
        const touches = e.nativeEvent.touches as unknown as { pageX: number; pageY: number }[];
        const n = touches.length;
        const gs = gesture.current;
        if (n !== gs.touches) {
          // A finger was added or lifted: continue from where the photo is now.
          gs.touches = n;
          gs.base = cropRef.current;
          gs.dx0 = g.dx;
          gs.dy0 = g.dy;
          gs.dist0 = n >= 2 ? Math.max(distance(touches), 1) : 1;
          return;
        }
        if (n >= 2) {
          update(withZoom(gs.base, gs.base.zoom * (distance(touches) / gs.dist0), aspectRef.current));
        } else {
          update(withDrag(gs.base, (g.dx - gs.dx0) / sideRef.current, (g.dy - gs.dy0) / sideRef.current, aspectRef.current));
        }
      },
    })
  );

  // Mouse wheel zooms on the web.
  useEffect(() => {
    if (Platform.OS !== "web" || !visible) return;
    const el = stageRef.current as unknown as HTMLElement | null;
    if (!el?.addEventListener) return;
    const onWheel = (ev: WheelEvent) => {
      ev.preventDefault();
      update(withZoom(cropRef.current, cropRef.current.zoom * (ev.deltaY < 0 ? 1.08 : 1 / 1.08), aspectRef.current));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [visible]);

  // Zoom slider.
  const setFromX = (pageX: number) => {
    const t = Math.min(Math.max((pageX - trackBox.current.x) / trackBox.current.w, 0), 1);
    update(withZoom(cropRef.current, MIN_ZOOM + t * (MAX_ZOOM - MIN_ZOOM), aspectRef.current));
  };
  const [sliderPan] = useState(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const pageX = e.nativeEvent.pageX;
        trackRef.current?.measureInWindow((x, _y, w) => {
          trackBox.current = { x, w: Math.max(w, 1) };
          setFromX(pageX);
        });
      },
      onPanResponderMove: (_e, g) => setFromX(g.moveX),
    })
  );

  /* eslint-enable react-hooks/refs */
  const placed = layoutFor(crop, aspect, side);
  const t = (crop.zoom - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM);
  const hole = 6; // visible ring thickness around the round window
  const ring = side * 2; // border large enough to cover the corners outside the circle

  return (
      <View style={styles.backdrop}>
        <View style={styles.panel} accessibilityViewIsModal>
          <Text style={styles.title} accessibilityRole="header">
            Adjust your photo
          </Text>
          <Text style={styles.help}>Drag to move. Zoom with pinch, the mouse wheel, the slider or the buttons.</Text>

          <View ref={stageRef} style={[styles.stage, { width: side, height: side }]} {...stagePan.panHandlers} accessible accessibilityLabel="Photo crop area. Drag to move the photo.">
            <Image source={{ uri }} style={{ position: "absolute", ...placed }} resizeMode="stretch" />
            {/* Dim everything outside the round window. */}
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                left: -ring + hole,
                top: -ring + hole,
                width: side - hole * 2 + ring * 2,
                height: side - hole * 2 + ring * 2,
                borderRadius: (side - hole * 2 + ring * 2) / 2,
                borderWidth: ring,
                borderColor: "rgba(11,10,8,0.72)",
              }}
            />
            <View
              pointerEvents="none"
              style={{ position: "absolute", left: hole, top: hole, width: side - hole * 2, height: side - hole * 2, borderRadius: side / 2, borderWidth: 2, borderColor: colors.burntOrange }}
            />
          </View>

          <View style={styles.zoomRow}>
            <Pressable
              onPress={() => update(withZoom(cropRef.current, cropRef.current.zoom - STEP, aspect))}
              accessibilityRole="button"
              accessibilityLabel="Zoom out"
              style={styles.zoomButton}
            >
              <Text style={styles.zoomGlyph}>−</Text>
            </Pressable>
            <View
              ref={trackRef}
              style={styles.track}
              {...sliderPan.panHandlers}
              accessible
              accessibilityRole="adjustable"
              accessibilityLabel="Zoom"
              accessibilityValue={{ min: 100, max: MAX_ZOOM * 100, now: Math.round(crop.zoom * 100), text: `${Math.round(crop.zoom * 100)} percent` }}
            >
              <View style={styles.trackLine} />
              <View style={[styles.knob, { left: `${t * 100}%` }]} />
            </View>
            <Pressable
              onPress={() => update(withZoom(cropRef.current, cropRef.current.zoom + STEP, aspect))}
              accessibilityRole="button"
              accessibilityLabel="Zoom in"
              style={styles.zoomButton}
            >
              <Text style={styles.zoomGlyph}>+</Text>
            </Pressable>
          </View>

          <View style={styles.buttons}>
            <Pressable onPress={onCancel} accessibilityRole="button" accessibilityLabel="Cancel" style={styles.secondary}>
              <Text style={styles.secondaryText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={() => update({ ...DEFAULT_CROP })} accessibilityRole="button" accessibilityLabel="Reset position and zoom" style={styles.secondary}>
              <Text style={styles.secondaryText}>Reset</Text>
            </Pressable>
            <Pressable onPress={() => onDone(clampCrop(cropRef.current, aspect))} accessibilityRole="button" accessibilityLabel="Use this photo" style={styles.primary}>
              <Text style={styles.primaryText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(11,10,8,0.85)", alignItems: "center", justifyContent: "center", padding: spacing.lg },
  panel: { width: "100%", maxWidth: 420, backgroundColor: colors.paper, borderRadius: radii["2xl"], padding: spacing["2xl"], gap: spacing.md, alignItems: "center", borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairlineStrong },
  title: { ...typeScale.headline, fontSize: 22, color: colors.espresso },
  help: { ...typeScale.bodySmall, color: colors.espressoMuted, textAlign: "center" },
  stage: { overflow: "hidden", backgroundColor: colors.cream, borderRadius: radii.lg, marginVertical: spacing.sm },
  zoomRow: { flexDirection: "row", alignItems: "center", gap: spacing.md, width: "100%" },
  zoomButton: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: colors.hairlineStrong, alignItems: "center", justifyContent: "center" },
  zoomGlyph: { ...typeScale.headline, fontSize: 22, lineHeight: 26, color: colors.espresso },
  track: { flex: 1, height: 40, justifyContent: "center" },
  trackLine: { height: 4, borderRadius: 2, backgroundColor: colors.hairlineStrong },
  knob: { position: "absolute", width: 22, height: 22, borderRadius: 11, marginLeft: -11, backgroundColor: colors.burntOrange, top: 9 },
  buttons: { flexDirection: "row", gap: spacing.sm, justifyContent: "flex-end", width: "100%", marginTop: spacing.sm },
  primary: { backgroundColor: colors.burntOrange, borderRadius: radii.md, paddingVertical: 11, paddingHorizontal: spacing.xl },
  primaryText: { ...typeScale.button, color: colors.cream },
  secondary: { borderRadius: radii.md, paddingVertical: 11, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.hairlineStrong },
  secondaryText: { ...typeScale.button, color: colors.espresso },
});
