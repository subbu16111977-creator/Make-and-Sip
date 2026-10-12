import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import { Chip } from "@/components/Chip";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/States";
import { StarterStaples } from "@/components/StarterStaples";
import { UnlockCelebration } from "@/components/UnlockCelebration";
import { colors, spacing, radii, type as typeScale, layout, shadows } from "@/theme";
import { usePantry, type NewPantryItemInput } from "@/context/PantryContext";
import { useEquipment } from "@/context/EquipmentContext";
import { EQUIPMENT_HELP, EQUIPMENT_TAGS } from "@/lib/equipment";
import { useTutorialTarget } from "@/lib/tutorialTargets";
import { daysUntil, recipesUnlockedByAdding } from "@/lib/pantryMatch";
import { recipes } from "@/data/recipes";
import { PlusIcon, CloseIcon, TrashIcon, PantryIcon, CheckIcon } from "@/components/icons";
import type { EquipmentTag, PantryCategory, PantryItem, StorageLocation, Unit } from "@/types";

const CATEGORY_ORDER: PantryCategory[] = [
  "Vegetables",
  "Fruit",
  "Dairy",
  "Meat & Seafood",
  "Grains",
  "Pulses",
  "Spices",
  "Frozen",
  "Pantry Staples",
];

const LOCATIONS: StorageLocation[] = ["Fridge", "Freezer", "Pantry"];
const UNITS: Unit[] = ["g", "kg", "ml", "l", "pcs", "tsp", "tbsp", "cup", "bunch", "clove", "can", "pack"];
const EXPIRY_OPTIONS: { label: string; days: number }[] = [
  { label: "Today", days: 0 },
  { label: "2 days", days: 2 },
  { label: "5 days", days: 5 },
  { label: "1 week", days: 7 },
  { label: "2 weeks", days: 14 },
  { label: "1 month", days: 30 },
  { label: "3 months", days: 90 },
  { label: "6 months", days: 180 },
];

const EQUIPMENT_LIST: { tag: EquipmentTag; helper: string }[] = EQUIPMENT_TAGS.map((tag) => ({ tag, helper: EQUIPMENT_HELP[tag] }));

type Segment = "ingredients" | "equipment";

function urgencyColor(days: number): string {
  if (days <= 1) return colors.tomato;
  if (days <= 3) return colors.mustard;
  return colors.espressoFaint;
}

function urgencyLabel(days: number): string {
  if (days <= 0) return "Use today";
  if (days === 1) return "Use tomorrow";
  if (days <= 60) return `${days} days left`;
  return "Fresh for a while";
}

function PantryRow({ item, onRemove }: { item: PantryItem; onRemove: () => void }) {
  const days = daysUntil(item.expiryDate);
  const color = urgencyColor(days);
  const amountLabel = item.quantityKnown ? `${item.quantity} ${item.unit}` : "Amount unknown";

  return (
    <View style={styles.row}>
      <View style={[styles.rowAccent, { backgroundColor: color }]} />
      <View style={styles.rowBody}>
        <Text style={styles.rowName}>{item.name}</Text>
        <Text style={styles.rowMeta}>
          {amountLabel} · {item.location} · <Text style={{ color }}>{urgencyLabel(days)}</Text>
        </Text>
        {item.source === "shopping" && <Text style={styles.rowSource}>Bought via Shopping</Text>}
      </View>
      <Pressable onPress={onRemove} hitSlop={10} style={styles.rowRemove}>
        <TrashIcon size={17} color={colors.espressoFaint} strokeWidth={1.5} />
      </Pressable>
    </View>
  );
}

function EquipmentRow({
  tag,
  helper,
  owned,
  onToggle,
  targetRef,
}: {
  tag: EquipmentTag;
  helper: string;
  owned: boolean;
  onToggle: () => void;
  /** Lets the tutorial outline this row. */
  targetRef?: React.Ref<View>;
}) {
  return (
    <Pressable ref={targetRef} style={styles.equipmentRow} onPress={onToggle}>
      <View style={styles.equipmentRowBody}>
        <Text style={styles.equipmentName}>{tag}</Text>
        <Text style={styles.equipmentHelper}>{helper}</Text>
      </View>
      <View style={[styles.equipmentCheckbox, owned && styles.equipmentCheckboxOwned]}>
        {owned && <CheckIcon size={13} color={colors.cream} strokeWidth={2.6} />}
      </View>
    </Pressable>
  );
}

export default function PantryScreen() {
  const { items, addItem, removeItem } = usePantry();
  const { owned, isOwned, toggleEquipment } = useEquipment();
  const params = useLocalSearchParams<{ segment?: string }>();
  const [segment, setSegment] = useState<Segment>(params.segment === "equipment" ? "equipment" : "ingredients");

  // A Home link can open this tab straight on Equipment.
  const [appliedSegmentParam, setAppliedSegmentParam] = useState(params.segment);
  if (params.segment !== appliedSegmentParam) {
    setAppliedSegmentParam(params.segment);
    if (params.segment === "equipment") setSegment("equipment");
    else if (params.segment === "ingredients") setSegment("ingredients");
  }
  const addTarget = useTutorialTarget("pantry-add");
  const equipmentRowTarget = useTutorialTarget("equipment-first-row");
  const [modalOpen, setModalOpen] = useState(false);
  const [celebration, setCelebration] = useState<{ visible: boolean; count: number }>({ visible: false, count: 0 });

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState<Unit>("pcs");
  const [category, setCategory] = useState<PantryCategory>("Vegetables");
  const [location, setLocation] = useState<StorageLocation>("Fridge");
  const [expiresInDays, setExpiresInDays] = useState(7);

  const sections = useMemo(() => {
    return CATEGORY_ORDER.map((cat) => ({
      title: cat,
      data: items
        .filter((item) => item.category === cat)
        .sort((a, b) => daysUntil(a.expiryDate) - daysUntil(b.expiryDate)),
    })).filter((section) => section.data.length > 0);
  }, [items]);

  const categoryCount = new Set(items.map((i) => i.category)).size;
  const ownedEquipmentCount = owned.length;

  function resetForm() {
    setName("");
    setQuantity("1");
    setUnit("pcs");
    setCategory("Vegetables");
    setLocation("Fridge");
    setExpiresInDays(7);
  }

  function handleSave() {
    const parsedQuantity = Number(quantity);
    if (!name.trim() || !Number.isFinite(parsedQuantity) || parsedQuantity <= 0) return;

    const input: NewPantryItemInput = {
      name: name.trim(),
      category,
      quantity: parsedQuantity,
      unit,
      location,
      expiresInDays,
    };
    addItem(input);
    resetForm();
    setModalOpen(false);
  }

  function handleToggleEquipment(tag: EquipmentTag) {
    const turningOn = !isOwned(tag);
    if (turningOn) {
      const unlocked = recipesUnlockedByAdding(owned, tag, recipes);
      if (unlocked.length > 0) {
        setCelebration({ visible: true, count: unlocked.length });
      }
    }
    toggleEquipment(tag);
  }

  const canSave = name.trim().length > 0 && Number(quantity) > 0;

  return (
    <Screen noScroll>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Your shelf</Text>
        <Text style={styles.headline}>Pantry</Text>
        <Text style={styles.subhead}>
          {segment === "ingredients"
            ? `${items.length} ingredients across ${categoryCount} categories`
            : `${ownedEquipmentCount} of ${EQUIPMENT_LIST.length} items on hand`}
        </Text>
      </View>

      <View style={styles.segmentRow}>
        <Pressable
          style={[styles.segmentButton, segment === "ingredients" && styles.segmentButtonActive]}
          onPress={() => setSegment("ingredients")}
        >
          <Text style={[styles.segmentLabel, segment === "ingredients" && styles.segmentLabelActive]}>
            Ingredients
          </Text>
        </Pressable>
        <Pressable
          style={[styles.segmentButton, segment === "equipment" && styles.segmentButtonActive]}
          onPress={() => setSegment("equipment")}
        >
          <Text style={[styles.segmentLabel, segment === "equipment" && styles.segmentLabelActive]}>Equipment</Text>
        </Pressable>
      </View>

      {segment === "ingredients" ? (
        items.length === 0 ? (
          <ScrollView keyboardShouldPersistTaps="handled">
            <EmptyState
              title="Your pantry's empty"
              body="Add a few ingredients and Home and Discover will start suggesting what to cook with what you have."
              actionLabel="Add your first ingredient"
              onPressAction={() => setModalOpen(true)}
            />
            <StarterStaples />
          </ScrollView>
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            stickySectionHeadersEnabled={false}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionTitle}>
                {section.title} <Text style={styles.sectionCount}>· {section.data.length}</Text>
              </Text>
            )}
            renderItem={({ item }) => <PantryRow item={item} onRemove={() => removeItem(item.id)} />}
          />
        )
      ) : (
        <FlatList
          data={EQUIPMENT_LIST}
          keyExtractor={(item) => item.tag}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text style={styles.equipmentIntro}>
              Tick what you own. Drinks that need gear you don&apos;t have stay in Discover marked &quot;Needs …&quot;, and
              Home leaves them out of its picks until you check it off here.
            </Text>
          }
          renderItem={({ item, index }) => (
            <EquipmentRow
              targetRef={index === 0 ? equipmentRowTarget : undefined}
              tag={item.tag}
              helper={item.helper}
              owned={isOwned(item.tag)}
              onToggle={() => handleToggleEquipment(item.tag)}
            />
          )}
        />
      )}

      {segment === "ingredients" && (
        <Pressable ref={addTarget} style={styles.fab} onPress={() => setModalOpen(true)} hitSlop={6}>
          <PlusIcon size={22} color={colors.cream} strokeWidth={2} />
        </Pressable>
      )}

      <Modal visible={modalOpen} animationType="slide" transparent onRequestClose={() => setModalOpen(false)}>
        <View style={styles.modalBackdrop}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.modalSheetWrap}
          >
            <View style={styles.modalSheet}>
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalHeaderIconWrap}>
                  <PantryIcon size={18} color={colors.burntOrange} strokeWidth={1.6} />
                </View>
                <Text style={styles.modalTitle}>Add ingredient</Text>
                <Pressable onPress={() => setModalOpen(false)} hitSlop={10}>
                  <CloseIcon size={18} color={colors.espressoMuted} />
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <Text style={styles.fieldLabel}>Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g. Cherry tomatoes"
                  placeholderTextColor={colors.espressoFaint}
                  style={styles.textInput}
                />

                <View style={styles.fieldRow}>
                  <View style={styles.fieldHalf}>
                    <Text style={styles.fieldLabel}>Quantity</Text>
                    <TextInput
                      value={quantity}
                      onChangeText={setQuantity}
                      keyboardType="numeric"
                      placeholder="1"
                      placeholderTextColor={colors.espressoFaint}
                      style={styles.textInput}
                    />
                  </View>
                </View>

                <Text style={styles.fieldLabel}>Unit</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                  {UNITS.map((u) => (
                    <Chip key={u} label={u} selected={unit === u} onPress={() => setUnit(u)} />
                  ))}
                </ScrollView>

                <Text style={styles.fieldLabel}>Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                  {CATEGORY_ORDER.map((cat) => (
                    <Chip key={cat} label={cat} selected={category === cat} onPress={() => setCategory(cat)} />
                  ))}
                </ScrollView>

                <Text style={styles.fieldLabel}>Where</Text>
                <View style={styles.chipRow}>
                  {LOCATIONS.map((loc) => (
                    <Chip key={loc} label={loc} selected={location === loc} onPress={() => setLocation(loc)} />
                  ))}
                </View>

                <Text style={styles.fieldLabel}>Use by</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                  {EXPIRY_OPTIONS.map((opt) => (
                    <Chip
                      key={opt.label}
                      label={opt.label}
                      selected={expiresInDays === opt.days}
                      onPress={() => setExpiresInDays(opt.days)}
                    />
                  ))}
                </ScrollView>

                <Button
                  label="Add to pantry"
                  onPress={handleSave}
                  fullWidth
                  style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
                />
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <UnlockCelebration
        visible={celebration.visible}
        count={celebration.count}
        onDismiss={() => setCelebration({ visible: false, count: 0 })}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: 4,
  },
  eyebrow: {
    ...typeScale.eyebrow,
    color: colors.burntOrange,
  },
  headline: {
    ...typeScale.display,
    color: colors.espresso,
  },
  subhead: {
    ...typeScale.bodySmall,
    color: colors.espressoMuted,
    marginTop: 2,
  },
  segmentRow: {
    flexDirection: "row",
    marginHorizontal: layout.screenPadding,
    marginBottom: spacing.lg,
    backgroundColor: colors.paper,
    borderRadius: radii.pill,
    padding: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: radii.pill,
    alignItems: "center",
  },
  segmentButtonActive: {
    backgroundColor: colors.burntOrange,
  },
  segmentLabel: {
    ...typeScale.label,
    color: colors.espressoMuted,
  },
  segmentLabelActive: {
    color: colors.cream,
  },
  listContent: {
    paddingHorizontal: layout.screenPadding,
    paddingBottom: 120,
  },
  sectionTitle: {
    ...typeScale.eyebrow,
    color: colors.espressoMuted,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  sectionCount: {
    color: colors.espressoFaint,
    textTransform: "none",
    letterSpacing: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: colors.paper,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  rowAccent: {
    width: 4,
  },
  rowBody: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: 3,
  },
  rowName: {
    ...typeScale.bodyMedium,
    color: colors.espresso,
    fontSize: 15,
  },
  rowMeta: {
    ...typeScale.caption,
    color: colors.espressoMuted,
  },
  rowSource: {
    ...typeScale.caption,
    color: colors.sageOlive,
    marginTop: 2,
  },
  rowRemove: {
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  equipmentIntro: {
    ...typeScale.bodySmall,
    color: colors.espressoMuted,
    marginBottom: spacing.lg,
  },
  equipmentRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.paper,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  equipmentRowBody: {
    flex: 1,
    gap: 2,
  },
  equipmentName: {
    ...typeScale.bodyMedium,
    color: colors.espresso,
    fontSize: 15,
  },
  equipmentHelper: {
    ...typeScale.caption,
    color: colors.espressoMuted,
  },
  equipmentCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.hairlineStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  equipmentCheckboxOwned: {
    backgroundColor: colors.sageOlive,
    borderColor: colors.sageOlive,
  },
  fab: {
    position: "absolute",
    right: layout.screenPadding,
    bottom: spacing["3xl"],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.burntOrange,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.low,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: colors.overlayStrong,
    justifyContent: "flex-end",
  },
  modalSheetWrap: {
    maxHeight: "88%",
  },
  modalSheet: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: radii["2xl"],
    borderTopRightRadius: radii["2xl"],
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing["3xl"],
  },
  modalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  modalHeaderIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.paper,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    ...typeScale.title,
    color: colors.espresso,
    flex: 1,
  },
  fieldLabel: {
    ...typeScale.label,
    color: colors.espressoMuted,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  fieldRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  fieldHalf: {
    flex: 1,
  },
  textInput: {
    ...typeScale.body,
    color: colors.espresso,
    backgroundColor: colors.paper,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  chipRow: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  saveButton: {
    marginTop: spacing["2xl"],
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
});
