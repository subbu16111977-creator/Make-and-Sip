import { Platform } from "react-native";
import { upcomingReminders, type Subscription } from "@/lib/subscription";

/**
 * Delivers the subscription reminders (3, 2 and 1 days before a term ends) as local notifications
 * on iPhone and Android. Local notifications are not available on the web, so there this does
 * nothing (the Subscription screen still lists the dates). Everything is wrapped so a notification
 * problem can never break the app.
 */
const ID_PREFIX = "mise-sub-";
/** Android needs a notification channel (and, from Android 13, one must exist before permission can be requested). */
const CHANNEL_ID = "subscription-reminders";

async function load() {
  return import("expo-notifications");
}

async function ensureChannel(Notifications: Awaited<ReturnType<typeof load>>): Promise<void> {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: "Subscription reminders",
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

export type ReminderPermission = "granted" | "denied" | "unavailable";

/** Whether reminders can actually reach the person. "unavailable" on the web, where they can't be sent. */
export async function reminderPermission(): Promise<ReminderPermission> {
  if (Platform.OS === "web") return "unavailable";
  try {
    const Notifications = await load();
    const current = await Notifications.getPermissionsAsync();
    return current.granted ? "granted" : "denied";
  } catch {
    return "unavailable";
  }
}

/** Asks for notification permission (only called when the user starts a plan). Returns whether it was granted. */
export async function ensureReminderPermission(): Promise<boolean> {
  if (Platform.OS === "web") return false;
  try {
    const Notifications = await load();
    await ensureChannel(Notifications);
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return true;
    if (!current.canAskAgain) return false;
    const asked = await Notifications.requestPermissionsAsync({ ios: { allowAlert: true, allowBadge: false, allowSound: true } });
    return asked.granted;
  } catch (error) {
    console.warn("[reminders] could not ask for notification permission", error);
    return false;
  }
}

/** Replaces any scheduled Mise reminders with the ones the subscription needs (none for no plan or lifetime). */
export async function syncReminders(subscription: Subscription | null, now: Date = new Date()): Promise<void> {
  if (Platform.OS === "web") return;
  try {
    const Notifications = await load();
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(scheduled.filter((n) => n.identifier.startsWith(ID_PREFIX)).map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier)));
    if (!subscription) return;
    const permission = await Notifications.getPermissionsAsync();
    if (!permission.granted) return;
    await ensureChannel(Notifications);
    Notifications.setNotificationHandler({
      handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: false, shouldSetBadge: false }),
    });
    for (const r of upcomingReminders(subscription, now)) {
      await Notifications.scheduleNotificationAsync({
        identifier: `${ID_PREFIX}${r.at.getTime()}`,
        content: { title: r.title, body: r.body },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: r.at, channelId: CHANNEL_ID },
      });
    }
  } catch (error) {
    console.warn("[reminders] could not update subscription reminders", error);
  }
}
