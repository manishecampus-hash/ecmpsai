"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

export function ConsultationForm() {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [position, setPosition] = useState<"relative" | "fixed" | "absolute">(
    "relative",
  );
  const [top, setTop] = useState<number | string>("auto");

  const formRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!formRef.current || !parentRef.current) return;

      const formRect = formRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();

      if (parentRect.top <= 90) {
        if (parentRect.bottom <= 90 + formRect.height + 20) {
          setPosition("absolute");
          setTop(parentRect.height - formRect.height);
        } else {
          setPosition("fixed");
          setTop(90);
        }
      } else {
        setPosition("relative");
        setTop("auto");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={parentRef}
      style={{
        position: "relative",
        minHeight: "650px",
        width: "340px",
      }}
    >
      <div
        ref={formRef}
        style={{
          position,
          top,
          width: "340px",
          zIndex: 50,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitting(true);

            setTimeout(() => setIsSubmitting(false), 2000);
          }}
          style={{
            background: "#fff",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#ffffff",
              padding: "28px 24px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                fontSize: "22px",
              }}
            >
              🎓
            </div>

            <h3
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Get Free Consultation
            </h3>

            <p
              style={{
                margin: "10px 0 0",
                fontSize: "14px",
                color: "#6b7280",
                lineHeight: 1.5,
              }}
            >
              Connect with our experts and find the best university for your
              career goals.
            </p>
          </div>

          {/* Body */}
          <div
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {/* Benefits */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {[
                "Personalized University Guidance",
                "Admission Assistance",
                "Scholarship Information",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: "#374151",
                  }}
                >
                  <span style={{ color: "#10b981" }}>✓</span>
                  {item}
                </div>
              ))}
            </div>

            {/* Phone Input */}
            <div style={{ display: "flex", gap: "5px", alignItems: "stretch" }}>
              <div style={{ position: "relative" }}>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  style={{
                    height: "52px",
                    borderRadius: "12px",
                    border: "1px solid #d1d5db",
                    background: "#f9fafb",
                    padding: "0 32px 0 12px",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>

                <ChevronDown
                  size={16}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6b7280",
                  }}
                />
              </div>

              <input
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                required
                style={{
                  flex: 1,
                  height: "52px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                  background: "#f9fafb",
                  fontSize: "15px",
                  outline: "none",
                  color: "#111827",
                  padding: "0 14px",
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                height: "54px",
                border: "none",
                borderRadius: "12px",
                background: "#111827",
                color: "#fff",
                fontWeight: 600,
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              {isSubmitting ? "Submitting..." : "Get Free Consultation"}
            </button>

            {/* Trust Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                color: "#6b7280",
                fontSize: "12px",
                borderTop: "1px solid #f1f5f9",
                paddingTop: "16px",
              }}
            >
              <ShieldCheck size={16} />
              Your information is secure & confidential
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
