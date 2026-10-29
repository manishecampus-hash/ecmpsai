// Education loan EMI maths (reducing balance, monthly compounding)

export const PRINCIPAL_COLOR = "#3e5a9a";
export const INTEREST_COLOR = "#dc2626";

export function monthlyEmi(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

export type YearRow = { year: number; principal: number; interest: number; balance: number };

// Year-by-year split of what the EMIs pay off, and what is still owed at each year end
export function yearlySchedule(principal: number, annualRate: number, years: number): YearRow[] {
  const months = years * 12;
  const emi = monthlyEmi(principal, annualRate, months);
  const r = annualRate / 12 / 100;
  const rows: YearRow[] = [];
  let balance = principal;
  for (let y = 1; y <= years; y++) {
    let p = 0;
    let i = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * r;
      const paid = Math.min(emi - interest, balance);
      i += interest;
      p += paid;
      balance -= paid;
    }
    rows.push({ year: y, principal: p, interest: i, balance: Math.max(0, balance) });
  }
  return rows;
}

export const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

// Short form for axis ticks: ₹1.2L, ₹45K
export const inrShort = (n: number) => {
  if (n >= 1e7) return `₹${+(n / 1e7).toFixed(1)}Cr`;
  if (n >= 1e5) return `₹${+(n / 1e5).toFixed(1)}L`;
  if (n >= 1e3) return `₹${Math.round(n / 1e3)}K`;
  return `₹${Math.round(n)}`;
};
