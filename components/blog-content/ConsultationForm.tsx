"use client";

export function ConsultationForm() {
  return (
    <form className="consultation-card">
      <h2>Get Free Consultation</h2>

      <label className="phone-field">
        <span className="country-code">
          <span className="flag" aria-hidden="true" />
          +91
        </span>
        <input
          type="tel"
          placeholder="Phone Number *"
          aria-label="Phone Number"
        />
      </label>

      <button type="submit">Submit</button>

      <p>
        By submitting, I accept the{" "}
        <a href="/terms-and-conditions" style={{ fontWeight: "normal" }}>
          T&C
        </a>{" "}
        and{" "}
        <a href="/privacy-policy" style={{ fontWeight: "normal" }}>
          Privacy Policy
        </a>
      </p>

      <style>{`
        .consultation-card {
          width: 100%;
          padding: 32px 16px 31px;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0 16px 34px rgba(17, 24, 39, 0.06);
        }

        .consultation-card h2 {
          margin: 0 0 26px;
          color: #000000;
          font-size: 25px;
          line-height: 1.25;
          font-weight: 600;
          letter-spacing: 0;
        }

        .phone-field {
          display: flex;
          align-items: center;
          width: 100%;
          height: 60px;
          margin-bottom: 60px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          background: #ffffff;
        }

        .country-code {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          height: 100%;
          padding: 0 20px;
          color: #4b5563;
          font-size: 15px;
          white-space: nowrap;
          border-right: 1px solid #e5e7eb;
        }

        .flag {
          width: 34px;
          height: 22px;
          flex: 0 0 auto;
          border: 1px solid #e5e7eb;
          background: linear-gradient(
            to bottom,
            #ff9933 0 33.33%,
            #ffffff 33.33% 66.66%,
            #138808 66.66% 100%
          );
        }

        .phone-field input {
          min-width: 0;
          flex: 1;
          height: 100%;
          border: 0;
          outline: 0;
          padding: 0 18px;
          color: #111827;
          font: inherit;
          font-size: 16px;
        }

        .phone-field input::placeholder {
          color: #9ca3af;
          font-weight: 500;
        }

      .consultation-card button {
  width: 90%;
  height: 30px;
  border: 0;
  border-radius: 8px;
  background: #171515;
  color: #ffffff;
  font-size: 20px;
  line-height: 1;
  font-weight: 400;
  cursor: pointer;

  display: block;
  margin: 0 auto;
}
        .consultation-card p {
          max-width: 260px;
          margin: 15px auto 0;
          color: #6b7280;
          text-align: center;
          font-size: 14px;
          line-height: 1.35;
        }

        .consultation-card a {
          color: #111827;
          font-weight: 700;
          text-decoration: underline;
        }

        @media (max-width: 720px) {
          .consultation-card {
            padding: 24px 16px;
            border-radius: 18px;
          }

          .consultation-card h2 {
            font-size: 22px;
          }

          .phone-field {
            margin-bottom: 28px;
          }
        }
      `}</style>
    </form>
  );
}
