import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AppBlank } from "@/components/AppBlank";
import { STORAGE_KEYS } from "@/lib/appData";
import { getPhase, markIntroDone, markTermsAccepted, markTutorialCompleted, markTutorialSkipped, type Phase, type Replay } from "@/lib/introFlow";
import { applyDraft, emptyProfile, isLocalProfile, type LocalProfile, type ProfileDraft } from "@/lib/profile";
import { discardStoredPhoto } from "@/lib/profilePhoto";
import { usePersistedState } from "@/lib/usePersistedState";

interface ProfileContextValue {
  profile: LocalProfile;
  phase: Phase;
  replay: Replay;
  /** Saves the form's answers to the profile. Never changes the intro/tutorial flags. */
  saveDraft: (draft: ProfileDraft) => void;
  /** Ends the introduction (finished or skipped). First time round, this moves on to the tutorial. */
  finishIntro: () => void;
  /** The person agreed to the Terms of Use and Privacy Policy; moves on to the tutorial. */
  acceptTerms: () => void;
  finishTutorial: () => void;
  skipTutorial: () => void;
  startReplay: (which: "intro" | "tutorial") => void;
  /** Resets only the profile (used by "Reset local app data", along with the other stores' own resets). */
  resetProfile: () => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

/**
 * The optional, device-only profile plus where the user is in the first-launch
 * flow. Saved on the device under its own key; nothing leaves it.
 */
export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile, hydrated] = usePersistedState<LocalProfile>(STORAGE_KEYS.profile, emptyProfile(), isLocalProfile);
  const [replay, setReplay] = useState<Replay>(null);

  const phase = getPhase(profile, replay);

  const saveDraft = useCallback(
    (draft: ProfileDraft) => {
      // A replaced or removed photo's old copy is deleted from app storage.
      if (draft.photoUri !== undefined && profile.profilePhotoUri && profile.profilePhotoUri !== draft.photoUri) {
        discardStoredPhoto(profile.profilePhotoUri);
      }
      setProfile((prev) => applyDraft(prev, draft));
    },
    [profile.profilePhotoUri, setProfile]
  );

  const finishIntro = useCallback(() => {
    setProfile((prev) => markIntroDone(prev));
    setReplay(null);
  }, [setProfile]);

  const acceptTerms = useCallback(() => setProfile((prev) => markTermsAccepted(prev)), [setProfile]);

  const finishTutorial = useCallback(() => {
    setProfile((prev) => markTutorialCompleted(prev));
    setReplay(null);
  }, [setProfile]);

  const skipTutorial = useCallback(() => {
    setProfile((prev) => markTutorialSkipped(prev));
    setReplay(null);
  }, [setProfile]);

  const startReplay = useCallback((which: "intro" | "tutorial") => setReplay(which), []);

  const resetProfile = useCallback(() => {
    discardStoredPhoto(profile.profilePhotoUri);
    setProfile(emptyProfile());
    setReplay(null);
  }, [profile.profilePhotoUri, setProfile]);

  const value = useMemo(
    () => ({ profile, phase, replay, saveDraft, finishIntro, acceptTerms, finishTutorial, skipTutorial, startReplay, resetProfile }),
    [profile, phase, replay, saveDraft, finishIntro, acceptTerms, finishTutorial, skipTutorial, startReplay, resetProfile]
  );

  if (!hydrated) return <AppBlank />;

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within a ProfileProvider");
  return ctx;
}
