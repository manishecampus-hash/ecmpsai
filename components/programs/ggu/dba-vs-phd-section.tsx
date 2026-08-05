"use client";

import { Target, TrendingUp, Search, Clock, Users } from "lucide-react";

const comparisonData = [
  {
    aspect: "Program Focus",
    icon: Target,
    dba: "Focuses on solving real-world business problems using a scholar-practitioner approach.",
    phd: "Focuses on theoretical research and academic knowledge development.",
  },
  {
    aspect: "Career Enhancement",
    icon: TrendingUp,
    dba: "Ideal for professionals aiming for leadership, consulting, or senior management roles.",
    phd: "Ideal for those who want to build a career in academia or research.",
  },
  {
    aspect: "Research with Impact",
    icon: Search,
    dba: "Applied research with practical business impact.",
    phd: "Theoretical research contributing to academic fields.",
  },
  {
    aspect: "Time Commitment",
    icon: Clock,
    dba: "Flexible and suitable for working professionals.",
    phd: "Long-term commitment, usually 4–6+ years.",
  },
  {
    aspect: "Learning Approach",
    icon: Target,
    dba: "Combines business knowledge with real-world case studies.",
    phd: "Deep academic research with strong theoretical foundation.",
  },
  {
    aspect: "Networking Opportunities",
    icon: Users,
    dba: "Strong industry networking with professionals and executives.",
    phd: "Networking mainly within academic and research communities.",
  },
  {
    aspect: "Best For",
    icon: Users,
    dba: "Mid-career professionals looking for career growth.",
    phd: "Individuals interested in teaching or advanced research.",
  },
];

export default function GguDBAVsPhDSection() {
  return (
    <>
      <style>{`
        .dba-wrap *,
        .dba-wrap *::before,
        .dba-wrap *::after { box-sizing: border-box; }

        .dba-wrap {
          padding: 40px 24px;
          background: #ffffff;
          font-family: 'Segoe UI', system-ui, sans-serif;
          width: 100%;
        }

        .dba-heading {
          text-align: center;
          margin-bottom: 32px;
        }
        .dba-heading h2 {
          font-size: clamp(28px, 5vw, 42px);
          color: #1a1a1a;
          margin: 0;
          line-height: 1.3;
          font-weight: 700;
        }
        .dba-heading h2 .red { color: #FF5563; }

        /* ── DESKTOP TABLE ── */
        .dt-table {
          max-width: 1200px;
          margin: 0 auto;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .dt-hrow {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr;
          background: #FF5563;
          border-bottom: 1px solid #FF5563;
        }
        .dt-hempty { padding: 16px 20px; }
        .dt-hcell {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 20px;
          border-left: 1px solid rgba(255,255,255,0.2);
        }
        .dt-hcell:first-child { border-left: none; }
        .dt-heading {
          font-weight: 700;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dt-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr;
          border-top: 1px solid #f0f0f0;
        }
        .dt-row:nth-child(even) {
          background: #f9f9f9;
        }
        .dt-row:hover {
          background: #f5f5f5;
        }
        
        .dt-aspect {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: inherit;
        }
        .dt-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: #FFE5E9;
          border-radius: 6px;
          flex-shrink: 0;
          color: #FF5563;
        }
        .dt-aspect-label {
          font-weight: 600;
          font-size: 14px;
          color: #1a1a1a;
        }
        .dt-dba {
          padding: 16px 20px;
          background: inherit;
          border-left: 1px solid #e0e0e0;
        }
        .dt-dba p { margin: 0; font-size: 13px; color: #333333; line-height: 1.6; }
        .dt-phd {
          padding: 16px 20px;
          background: inherit;
          border-left: 1px solid #e0e0e0;
        }
        .dt-phd p { margin: 0; font-size: 13px; color: #666666; line-height: 1.6; }

        /* ── MOBILE CARDS ── */
        .mb-cards {
          display: none;
          flex-direction: column;
          gap: 12px;
          max-width: 520px;
          margin: 0 auto;
        }
        .mb-headers {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin-bottom: 8px;
        }
        .mb-col-hdr {
          border-radius: 0;
          padding: 12px 0;
          text-align: center;
          font-weight: 700;
          font-size: 14px;
          color: #ffffff;
        }
        .mb-col-hdr.dba { background: #FF5563; }
        .mb-col-hdr.phd { background: #FF5563; }

        .mb-card {
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e0e0e0;
          background: #ffffff;
        }
        .mb-card-hdr {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #f9f9f9;
          padding: 10px 12px;
          border-bottom: 1px solid #e0e0e0;
        }
        .mb-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: #FFE5E9;
          border-radius: 4px;
          flex-shrink: 0;
          color: #FF5563;
        }
        .mb-aspect-label {
          font-weight: 700;
          font-size: 13px;
          color: #1a1a1a;
          text-align: center;
        }
        .mb-card-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .mb-dba {
          padding: 10px 10px;
          background: #ffffff;
          border-right: 1px solid #e0e0e0;
        }
        .mb-dba p { margin: 0; font-size: 12px; color: #333333; line-height: 1.55; }
        .mb-phd {
          padding: 10px 10px;
          background: #f9f9f9;
        }
        .mb-phd p { margin: 0; font-size: 12px; color: #666666; line-height: 1.55; }

        @media (max-width: 700px) {
          .dba-wrap { padding: 24px 14px; }
          .dba-heading { margin-bottom: 24px; }
          .dt-table { display: none; }
          .mb-cards { display: flex; }
        }
      `}</style>

      <section className="dba-wrap">
        <div className="dba-heading">
          <h2>
            Why <span className="red">Choose a DBA</span> Over a PhD?
          </h2>
        </div>

        {/* DESKTOP TABLE */}
        <div className="dt-table">
          <div className="dt-hrow">
            <div className="dt-hempty" />
            <div className="dt-hcell">
              <span className="dt-heading">DBA</span>
            </div>
            <div className="dt-hcell">
              <span className="dt-heading">PhD</span>
            </div>
          </div>

          {comparisonData.map((item, i) => {
            const Icon = item.icon;
            return (
              <div className="dt-row" key={i}>
                <div className="dt-aspect">
                  <span className="dt-icon">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <span className="dt-aspect-label">{item.aspect}</span>
                </div>
                <div className="dt-dba">
                  <p>{item.dba}</p>
                </div>
                <div className="dt-phd">
                  <p>{item.phd}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE CARDS */}
        <div className="mb-cards">
          <div className="mb-headers">
            <div className="mb-col-hdr dba">DBA</div>
            <div className="mb-col-hdr phd">PhD</div>
          </div>

          {comparisonData.map((item, i) => {
            const Icon = item.icon;
            return (
              <div className="mb-card" key={i}>
                <div className="mb-card-hdr">
                  <span className="mb-icon">
                    <Icon size={14} strokeWidth={2} />
                  </span>
                  <span className="mb-aspect-label">{item.aspect}</span>
                </div>
                <div className="mb-card-body">
                  <div className="mb-dba">
                    <p>{item.dba}</p>
                  </div>
                  <div className="mb-phd">
                    <p>{item.phd}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
