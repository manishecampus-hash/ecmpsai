export function feeToNumber(fee: string) {
  return parseInt((fee || "").replace(/[^\d]/g, ""), 10) || 0;
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateEMI(fee: number, durationStr: string) {
  const years = parseInt(durationStr as string, 10) || 2;
  const months = years * 12;
  const emi = Math.round(fee / months);
  return `INR ${emi.toLocaleString("en-IN")}/mo*`;
}