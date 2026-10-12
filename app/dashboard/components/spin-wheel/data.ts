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

// Alternating segment palette — soft tints of the eCampus red and a warm peach,
// with darker label colours so the amounts stay easy to read.
export const SPIN_WHEEL_COLORS = {
  primary: "#fef2f2", // red-50
  accent: "#fff7ed", // orange-50
  ring: "#fecaca", // red-200, outer border + segment separators
  primaryText: "#b91c1c", // red-700
  accentText: "#c2410c", // orange-700
};
