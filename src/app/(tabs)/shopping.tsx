import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Screen } from "@/components/Screen";
import { Chip } from "@/components/Chip";
import { Button } from "@/components/Button";
import { EmptyState } from "@/components/States";
import { colors, spacing, radii, type as typeScale, layout, shadows } from "@/theme";
import { useShopping, type NewShoppingItemInput } from "@/context/ShoppingContext";
import { usePantry } from "@/context/PantryContext";
import { PlusIcon, CloseIcon, TrashIcon, ShoppingIcon, CheckIcon } from "@/components/icons";
import type { PantryCategory, ShoppingItem, Unit } from "@/types";

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

const UNITS: Unit[] = ["g", "kg", "ml", "l", "pcs", "tsp", "tbsp", "cup", "bunch", "clove", "can", "pack"];

function ShoppingRow({
  item,
  inPantry,
  onToggle,
  onRemove,
}: {
  item: ShoppingItem;
  inPantry: boolean;
  onToggle: () => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onToggle} hitSlop={8} style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
        {item.checked && <CheckIcon size={12} color={colors.cream} strokeWidth={2.6} />}
      </Pressable>
      <View style={styles.rowBody}>
        <Text style={[styles.rowName, item.checked && styles.rowNameChecked]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.rowMeta}>
          {item.amount}
          {item.shortfall ? <Text style={styles.rowTopUpTag}> · top up</Text> : null}
          {item.optional ? <Text style={styles.rowOptionalTag}> · optional</Text> : null}
          {item.fromRecipe ? ` · from ${item.fromRecipe}` : ""}
        </Text>
        {item.checked && (
          <Text style={styles.rowAddedToPantry}>{inPantry ? "✓ Added to pantry" : "Purchased"}</Text>
        )}
      </View>
      <Pressable onPress={onRemove} hitSlop={10} style={styles.rowRemove}>
        <TrashIcon size={17} color={colors.espressoFaint} strokeWidth={1.5} />
      </Pressable>
    </View>
  );
}

export default function ShoppingScreen() {
  const { items, addItem, toggleChecked, removeItem, clearChecked } = useShopping();
  const { items: pantryItems } = usePantry();
  const [modalOpen, setModalOpen] = useState(false);

  // Derived, not stored — "is this actually in Pantry right now" is read
  // fresh from Pantry state every render, never cached on the shopping item.
  const pantryIngredientIds = useMemo(() => new Set(pantryItems.map((p) => p.ingredientId)), [pantryItems]);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState<Unit>("pcs");
  const [category, setCategory] = useState<PantryCategory>("Vegetables");

  const sections = useMemo(() => {
    return CATEGORY_ORDER.map((cat) => ({
      title: cat,
      data: items
        .filter((item) => item.category === cat)
        .sort((a, b) => Number(a.checked) - Number(b.checked)),
    })).filter((section) => section.data.length > 0);
  }, [items]);

  const checkedCount = items.filter((i) => i.checked).length;

  function resetForm() {
    setName("");
    setQuantity("1");
    setUnit("pcs");
    setCategory("Vegetables");
  }

  function handleSave() {
    const parsedQuantity = Number(quantity);
    if (!name.trim() || !Number.isFinite(parsedQuantity) || parsedQuantity <= 0) return;

    const input: NewShoppingItemInput = { name: name.trim(), category, quantity: parsedQuantity, unit };
    addItem(input);
    resetForm();
    setModalOpen(false);
  }

  const canSave = name.trim().length > 0 && Number(quantity) > 0;

  return (
    <Screen noScroll>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Ready for the store</Text>
        <Text style={styles.headline}>Shopping</Text>
        <View style={styles.subheadRow}>
          <Text style={styles.subhead}>
            {items.length} {items.length === 1 ? "item" : "items"}
            {checkedCount > 0 ? ` · ${checkedCount} checked off` : ""}
          </Text>
          {checkedCount > 0 && (
            <Pressable onPress={clearChecked} hitSlop={6}>
              <Text style={styles.clearLink}>Clear checked</Text>
            </Pressable>
          )}
        </View>
      </View>

      {items.length === 0 ? (
        <EmptyState
          title="Your list is empty"
          body="Add items by hand, or tap the bag icon on any recipe to send what it's missing straight here."
          actionLabel="Add an item"
          onPressAction={() => setModalOpen(true)}
        />
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
          renderItem={({ item }) => (
            <ShoppingRow
              item={item}
              inPantry={pantryIngredientIds.has(item.ingredientId)}
              onToggle={() => toggleChecked(item.id)}
              onRemove={() => removeItem(item.id)}
            />
          )}
        />
      )}

      <Pressable style={styles.fab} onPress={() => setModalOpen(true)} hitSlop={6}>
        <PlusIcon size={22} color={colors.cream} strokeWidth={2} />
      </Pressable>

      <Modal visible={modalOpen} animationType="slide" transparent onRequestClose={() => setModalOpen(false)}>
        <View style={styles.modalBackdrop}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.modalSheetWrap}
          >
            <View style={styles.modalSheet}>
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalHeaderIconWrap}>
                  <ShoppingIcon size={18} color={colors.burntOrange} strokeWidth={1.6} />
                </View>
                <Text style={styles.modalTitle}>Add item</Text>
                <Pressable onPress={() => setModalOpen(false)} hitSlop={10}>
                  <CloseIcon size={18} color={colors.espressoMuted} />
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <Text style={styles.fieldLabel}>Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g. Olive oil"
                  placeholderTextColor={colors.espressoFaint}
                  style={styles.textInput}
                />

                <Text style={styles.fieldLabel}>Quantity</Text>
                <TextInput
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                  placeholder="1"
                  placeholderTextColor={colors.espressoFaint}
                  style={styles.textInput}
                />

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

                <Button
                  label="Add to list"
                  onPress={handleSave}
                  fullWidth
                  style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
                />
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
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
  subheadRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  subhead: {
    ...typeScale.bodySmall,
    color: colors.espressoMuted,
  },
  clearLink: {
    ...typeScale.label,
    color: colors.burntOrange,
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
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.hairlineStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.sageOlive,
    borderColor: colors.sageOlive,
  },
  rowBody: {
    flex: 1,
    gap: 3,
  },
  rowName: {
    ...typeScale.bodyMedium,
    color: colors.espresso,
    fontSize: 15,
  },
  rowNameChecked: {
    color: colors.espressoFaint,
    textDecorationLine: "line-through",
  },
  rowMeta: {
    ...typeScale.caption,
    color: colors.espressoMuted,
  },
  rowOptionalTag: {
    color: colors.espressoFaint,
  },
  rowTopUpTag: {
    color: colors.mustard,
  },
  rowAddedToPantry: {
    ...typeScale.caption,
    color: colors.sageOlive,
    marginTop: 2,
  },
  rowRemove: {
    paddingLeft: spacing.sm,
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
