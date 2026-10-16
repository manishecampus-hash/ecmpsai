"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, CheckCircle2, IndianRupee, Mail, Phone, ReceiptText } from "lucide-react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import type { StudentProfile } from "../types";
import { readSubmittedApplications, type SubmittedApplication } from "@/components/application-flow/submitted-applications";

const formatDateTime = (value: string) => new Date(value).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" });

export default function ReceiptsPage() {
  const [student, setStudent] = useState<StudentProfile>({});
  const [applications, setApplications] = useState<SubmittedApplication[] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [printingId, setPrintingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ecampus_student");
    if (saved) setStudent(JSON.parse(saved));
    setApplications(readSubmittedApplications());
  }, []);

  const printReceipt = (id: string) => {
    setPrintingId(id);
    window.setTimeout(() => {
      window.print();
      window.setTimeout(() => setPrintingId(null), 400);
    }, 100);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9fafb]">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar student={student} onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="min-w-0 flex-1 overflow-y-auto p-4 pb-28 sm:p-6 sm:pb-24">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5"><h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Payment receipts</h1><span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">{applications?.length ?? 0}</span></div>
              <p className="mt-1 text-sm text-gray-500">Receipts for your successfully paid application fees.</p>
            </div>
          </div>

          {applications === null ? null : applications.length === 0 ? (
            <section className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-500"><ReceiptText className="h-6 w-6" /></span>
              <h2 className="mt-4 text-base font-bold text-gray-900">No receipts yet</h2>
              <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">A receipt will appear here after you complete a program seat block payment.</p>
            </section>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => {
                const receiptNumber = `EC-${app.applicationId}`;
                return (
                  <article key={app.applicationId} className={`receipt-card overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${printingId === app.applicationId ? "printing" : ""}`}>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-6">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><CheckCircle2 className="h-5 w-5" /></span>
                        <div className="min-w-0"><p className="text-sm font-bold text-gray-900">Payment successful</p><p className="mt-0.5 truncate text-xs text-gray-500">{app.program.programName} · {app.program.universityName}</p></div>
                      </div>
                      <button onClick={() => printReceipt(app.applicationId)} className="print:hidden inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"><ArrowDownToLine className="h-4 w-4" /> Download receipt</button>
                    </div>
                    <div className="grid gap-0 md:grid-cols-[1fr_280px]">
                      <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">eCampus · Payment receipt</p><h2 className="mt-2 text-lg font-bold text-gray-900">Seat block payment</h2><p className="mt-1 text-sm text-gray-500">Receipt no. <span className="font-mono text-gray-700">{receiptNumber}</span></p></div>
                          {app.program.universityLogo && <img src={app.program.universityLogo} alt="" className="h-12 w-12 rounded-lg border border-gray-100 object-contain p-1.5" />}
                        </div>
                        <div className="mt-5 grid gap-x-8 gap-y-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
                          <ReceiptField label="Paid by" value={app.details.fullName || "Applicant"} />
                          <ReceiptField label="Payment date" value={formatDateTime(app.payment.paidAt)} />
                          <ReceiptField label="Program" value={app.program.programName} />
                          <ReceiptField label="Institution" value={app.program.universityName} />
                          <ReceiptField label="Application no." value={app.applicationId} mono />
                          <ReceiptField label="Payment ID" value={app.payment.paymentId} mono />
                          <div className="sm:col-span-2"><p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Applicant contact</p><div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-700"><span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-gray-400" />{app.details.email || "—"}</span><span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-gray-400" />{app.details.phone ? `+91 ${app.details.phone}` : "—"}</span></div></div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between border-t border-gray-100 bg-gray-50/70 p-5 md:border-l md:border-t-0 sm:p-6">
                        <div><p className="text-xs font-medium text-gray-500">Amount paid</p><p className="mt-1 flex items-center gap-1 text-2xl font-bold tracking-tight text-gray-900"><IndianRupee className="h-5 w-5" />{app.payment.amount.toLocaleString("en-IN")}</p><p className="mt-1 text-xs text-gray-500">{app.program.payment.label}</p></div>
                        <div className="mt-5 flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2 text-xs font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Paid successfully</div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>
      <style jsx global>{`@media print { body * { visibility: hidden !important; } .receipt-card.printing, .receipt-card.printing * { visibility: visible !important; } .receipt-card.printing { position: absolute; inset: 0; width: 100%; border: 0; box-shadow: none; } }`}</style>
    </div>
  );
}

function ReceiptField({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return <div className="min-w-0"><p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</p><p className={`mt-1 break-words text-sm text-gray-800 ${mono ? "font-mono text-xs" : "font-medium"}`}>{value}</p></div>;
}
