import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { File, Paths } from "expo-file-system";

/**
 * Lets the user choose a profile photo from their device. The photo library
 * opens only when this is called (from a tap) — nothing is requested at launch.
 *
 * The photo never leaves the device: on phones it is copied into the app's own
 * documents folder; on the web it is shrunk to a data URL stored with the
 * profile. Returns the photo, `null` if the user cancelled, or throws.
 */
export interface ChosenPhoto {
  uri: string;
  /** Width / height of the stored photo. */
  aspect: number;
}

export async function chooseProfilePhoto(): Promise<ChosenPhoto | null> {
  // The app's own crop screen does the cropping, so the picker returns the whole photo.
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    quality: 0.8,
  });
  if (result.canceled || !result.assets?.[0]?.uri) return null;
  const asset = result.assets[0];
  if (Platform.OS === "web") return shrinkForWeb(asset.uri);
  const aspect = asset.width && asset.height ? asset.width / asset.height : 1;
  return { uri: await copyToDocuments(asset.uri), aspect };
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

/** Shrinks the image to at most 900px on its long side (keeping its shape) and returns a JPEG data URL (web only). */
function shrinkForWeb(uri: string): Promise<ChosenPhoto> {
  return new Promise((resolve, reject) => {
    const img = new (globalThis as any).Image() as HTMLImageElement;
    img.onload = () => {
      const scale = Math.min(1, 900 / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Could not process the photo."));
      ctx.drawImage(img, 0, 0, w, h);
      resolve({ uri: canvas.toDataURL("image/jpeg", 0.82), aspect: w / h });
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
