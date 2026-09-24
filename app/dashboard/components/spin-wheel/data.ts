export interface SpinWheelReward {
  id: string;
  label: string;
  couponCode: string;
}

// Mock rewards for the frontend-only Spin & Win feature — swap this for an
// API response later without touching any of the wheel/modal UI.
export const SPIN_WHEEL_REWARDS: SpinWheelReward[] = [
  { id: "25k", label: "₹25,000", couponCode: "ECAMP25K" },
  { id: "5k", label: "₹5,000", couponCode: "ECAMP5K" },
  { id: "8k", label: "₹8,000", couponCode: "ECAMP8K" },
  { id: "10k", label: "₹10,000", couponCode: "ECAMP10K" },
  { id: "12k", label: "₹12,000", couponCode: "ECAMP12K" },
  { id: "15k", label: "₹15,000", couponCode: "ECAMP15K" },
  { id: "20k", label: "₹20,000", couponCode: "ECAMP20K" },
  { id: "2k", label: "₹2,000", couponCode: "ECAMP2K" },
];

// Alternating segment palette — tied to the eCampus brand red plus a gold
// "reward" accent, rather than the blue/orange from the reference image.
export const SPIN_WHEEL_COLORS = {
  primary: "#dc2626", // red-600 (brand)
  accent: "#d97706", // amber-600 (reward gold)
  ring: "#7f1d1d", // red-900, outer border + segment separators
  text: "#ffffff",
};
