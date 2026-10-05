import React from "react";
import { IntroFlow } from "./IntroFlow";
import { TutorialOverlay } from "./TutorialOverlay";
import { useProfile } from "@/context/ProfileContext";

/** Sits above the app: shows the introduction or tutorial when the profile's flags (or a replay) say so, otherwise nothing. */
export function FirstLaunchGate() {
  const { phase } = useProfile();
  if (phase === "intro") return <IntroFlow />;
  if (phase === "tutorial") return <TutorialOverlay />;
  return null;
}
