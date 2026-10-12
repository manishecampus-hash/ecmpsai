"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  CreditCard,
  Landmark,
  Loader2,
  Lock,
  Pencil,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useApplication } from "./application-context";
import FlowShell from "./flow-shell";
import ProgramCard from "./program-card";
import PaymentSuccess from "./payment-success";
import { formatINR } from "./options";
import { RAZORPAY_KEY_ID, loadRazorpay } from "./razorpay";

const EASE = [0.22, 1, 0.36, 1] as const;

const METHODS = [
  { icon: Smartphone, label: "UPI" },
  { icon: CreditCard, label: "Cards" },
  { icon: Landmark, label: "Net Banking" },
  { icon: Wallet, label: "Wallets" },
  { icon: Building2, label: "EMI" },
];

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "open" }
  | { kind: "cancelled" }
  | { kind: "error"; message: string };

const card = "rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]";

// Screen 3 — order summary and Razorpay checkout; switches to a confirmation once paid.
export default function PaymentScreen() {
  const router = useRouter();
  const { program, state, hydrated, savePayment, basePath } = useApplication();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // No application in progress (fresh visit or a refresh after paying) — start from the landing screen
  useEffect(() => {
    if (hydrated && !state.details) router.replace(basePath);
  }, [hydrated, state.details, router, basePath]);

  if (!hydrated || !state.details) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-[#ee2c3c]" />
      </div>
    );
  }

  const details = state.details;
  const amount = program.payment.amount;

  if (state.payment) return <PaymentSuccess />;

  const pay = async () => {
    if (!RAZORPAY_KEY_ID) {
      setStatus({
        kind: "error",
        message:
          process.env.NODE_ENV === "development"
            ? "Razorpay isn't configured yet — add NEXT_PUBLIC_RAZORPAY_KEY_ID to .env.local and restart the dev server."
            : "Online payment isn't available right now. Please try again in a little while.",
      });
      return;
    }

    setStatus({ kind: "loading" });
    const ready = await loadRazorpay();
    if (!ready || !window.Razorpay) {
      setStatus({ kind: "error", message: "We couldn't reach the payment gateway. Check your connection and try again." });
      return;
    }

    const checkout = new window.Razorpay({
      key: RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "eCampus",
      description: `${program.payment.label} · ${program.programName}`,
      prefill: { name: details.fullName, email: details.email, contact: `+91${details.phone}` },
      notes: {
        application_id: state.applicationId || "",
        university: program.universityName,
        program: program.programName,
      },
      theme: { color: "#ee2c3c" },
      handler: (res) => {
        savePayment({ paymentId: res.razorpay_payment_id, amount, paidAt: new Date().toISOString() });
        setStatus({ kind: "idle" });
      },
      modal: { ondismiss: () => setStatus((s) => (s.kind === "error" ? s : { kind: "cancelled" })) },
    });
    checkout.on("payment.failed", (res: any) =>
      setStatus({
        kind: "error",
        message: res?.error?.description || "The payment couldn't be completed. Please try again or use another method.",
      }),
    );
    checkout.open();
    setStatus({ kind: "open" });
  };

  const busy = status.kind === "loading" || status.kind === "open";

  const aside = (
    <div className={`${card} p-5`}>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Order summary</p>
      <ProgramCard program={program} compact />

      <dl className="mt-5 space-y-3 border-t border-dashed border-slate-200 pt-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-slate-500">{program.payment.label}</dt>
          <dd className="font-semibold text-slate-900">{formatINR(amount)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate-500">Taxes</dt>
          <dd className="font-medium text-emerald-600">Included</dd>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-3">
          <dt className="font-bold text-slate-900">Total payable</dt>
          <dd className="text-lg font-extrabold text-slate-900">{formatINR(amount)}</dd>
        </div>
      </dl>
      <p className="mt-3 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-xs leading-relaxed text-emerald-700">
        {program.payment.note}
      </p>
    </div>
  );

  return (
    <FlowShell backHref={`${basePath}/details`} step={2} aside={aside}>
      <div className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">Complete your payment</h1>
        {state.applicationId && (
          <p className="mt-1.5 text-sm text-slate-500">
            Application No. <span className="font-semibold text-slate-700">{state.applicationId}</span>
          </p>
        )}
      </div>

      <div className="space-y-5">
        {/* Amount */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.05 }}
          className={`${card} relative overflow-hidden p-5 sm:p-6`}
        >
          <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-[#ee2c3c]" />
          <p className="text-sm font-medium text-slate-500">Amount payable now</p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{formatINR(amount)}</p>
          <p className="mt-1 text-xs text-slate-500">{program.payment.label} · inclusive of all taxes</p>
        </motion.div>

        {/* Billing details */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.11 }}
          className={`${card} p-5 sm:p-6`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Billing details</h2>
            <Link
              href={`${basePath}/details`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ee2c3c] hover:underline"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Link>
          </div>
          <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            {[
              ["Name", details.fullName],
              ["Email", details.email],
              ["Mobile", `+91 ${details.phone}`],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0">
                <dt className="text-xs text-slate-400">{label}</dt>
                <dd className="mt-0.5 truncate font-semibold text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Pay */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.17 }}
          className={`${card} p-5 sm:p-6`}
        >
          <h2 className="text-base font-bold text-slate-900">Payment method</h2>
          <p className="mt-1 text-sm text-slate-500">Choose your preferred option in the secure Razorpay window.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {METHODS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
              >
                <Icon className="h-3.5 w-3.5 text-slate-500" /> {label}
              </span>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {(status.kind === "cancelled" || status.kind === "error") && (
              <motion.div
                key={status.kind}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div
                  role="alert"
                  className={`mt-5 flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm ${
                    status.kind === "error" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-800"
                  }`}
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  {status.kind === "error" ? status.message : "Payment was cancelled. You can try again whenever you're ready."}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={pay}
            disabled={busy}
            className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ee2c3c] py-3.5 text-base font-bold text-white shadow-lg shadow-red-500/20 transition-colors hover:bg-[#d92233] disabled:cursor-wait disabled:opacity-80"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {status.kind === "loading" ? "Opening secure checkout…" : "Complete payment in the Razorpay window"}
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Pay {formatINR(amount)} securely
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Secured by Razorpay
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-emerald-600" /> 256-bit SSL encryption
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" /> PCI DSS compliant
            </span>
          </div>
        </motion.div>
      </div>
    </FlowShell>
  );
}
