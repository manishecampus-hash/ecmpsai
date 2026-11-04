/**
 * Festive Seasonal Theme Configuration
 * Controls seasonal decorative overlays across the eCampus website.
 */
export interface FestiveThemeConfig {
  /** Master switch to enable or disable festive overlays across the site */
  enabled: boolean;
  /** Active festive theme key */
  theme: "diwali" | "christmas" | "newyear" | "off";
  /** Allow visitors to dismiss the decoration for their active session */
  allowDismiss: boolean;
  /** Storage key used to persist dismissal */
  storageKey: string;
  /** Enable or disable flame glow halation */
  showGlow: boolean;
  /** Respect user prefers-reduced-motion preference */
  respectReducedMotion: boolean;
}

export const FESTIVE_CONFIG: FestiveThemeConfig = {
  enabled: true,
  theme: "diwali",
  allowDismiss: true,
  storageKey: "ecampus_festive_diwali_dismissed",
  showGlow: true,
  respectReducedMotion: true,
};

