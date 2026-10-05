import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { File, Paths } from "expo-file-system";

/**
 * Lets the user choose a profile photo from their device. The photo library
 * opens only when this is called (from a tap) — nothing is requested at launch.
 *
 * The photo never leaves the device: on phones it is copied into the app's own
 * documents folder; on the web it is shrunk to a small data URL that is stored
 * with the profile. Returns the new URI, `null` if the user cancelled, or
 * throws a readable error.
 */
export async function chooseProfilePhoto(): Promise<string | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.6,
  });
  if (result.canceled || !result.assets?.[0]?.uri) return null;
  const picked = result.assets[0].uri;
  return Platform.OS === "web" ? shrinkForWeb(picked) : copyToDocuments(picked);
}

async function copyToDocuments(uri: string): Promise<string> {
  try {
    const source = new File(uri);
    const target = new File(Paths.document, `profile-photo-${Date.now()}.jpg`);
    await source.copy(target);
    return target.uri;
  } catch (error) {
    console.warn("[profile] could not copy the photo into app storage; using the picker's copy", error);
    return uri;
  }
}

/** Draws the image onto a 256px canvas and returns a small JPEG data URL (web only). */
function shrinkForWeb(uri: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new (globalThis as any).Image() as HTMLImageElement;
    img.onload = () => {
      const size = 256;
      const side = Math.min(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Could not process the photo."));
      ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = () => reject(new Error("Could not read that photo."));
    img.src = uri;
  });
}

/** Best-effort removal of a photo file we copied into app storage. Never throws. */
export function discardStoredPhoto(uri: string | undefined): void {
  if (!uri || Platform.OS === "web" || !uri.startsWith("file:")) return;
  try {
    const f = new File(uri);
    if (f.exists) f.delete();
  } catch (error) {
    console.warn("[profile] could not delete the old photo", error);
  }
}
