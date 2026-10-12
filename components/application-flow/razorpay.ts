// Razorpay Standard Checkout — the secure payment form opens in Razorpay's own iframe.
// Docs: https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/

declare global {
  interface Window {
    // Injected by checkout.js
    Razorpay?: new (options: RazorpayOptions) => { open: () => void; on: (event: string, cb: (res: any) => void) => void };
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise
  currency: "INR";
  name: string;
  description?: string;
  image?: string;
  /** Server-created order id — recommended in production */
  order_id?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler: (response: { razorpay_payment_id: string; razorpay_order_id?: string; razorpay_signature?: string }) => void;
  modal?: { ondismiss?: () => void; confirm_close?: boolean };
}

export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
let loader: Promise<boolean> | null = null;

/** Loads checkout.js once; resolves false if it can't be reached */
export function loadRazorpay(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (!loader) {
    loader = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = CHECKOUT_SRC;
      script.async = true;
      script.onload = () => resolve(Boolean(window.Razorpay));
      script.onerror = () => {
        loader = null;
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  return loader;
}
