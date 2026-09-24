"use client";

const PARTICLES = ["🎉", "✨", "⭐", "🎊", "💫", "✨"];

interface GiftFabProps {
  onClick: () => void;
}

/**
 * Floating "Spin & Win" trigger — a 3D-styled gift box in a fixed bottom-left
 * bubble, styled after eCampus's existing scholarship-offer widget but
 * recolored to this dashboard's red/gold brand instead of blue.
 */
export default function GiftFab({ onClick }: GiftFabProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        title="Click to spin for a scholarship reward"
        aria-label="Open Spin & Win scholarship wheel"
        className="sw-fab fixed bottom-4 left-20 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-600 bg-gradient-to-br from-white to-gray-50 shadow-[0_10px_24px_rgba(220,38,38,0.3),0_4px_10px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_16px_32px_rgba(220,38,38,0.38)] sm:h-[54px] sm:w-[54px]"
      >
        <span className="sw-fab-wrapper relative flex h-full w-full items-center justify-center">
          <span className="sw-fab-pulse-ring pointer-events-none absolute -inset-1.5 rounded-full border-2 border-red-500" />

          <span className="sw-fab-blast pointer-events-none absolute inset-0">
            {PARTICLES.map((p, i) => (
              <span key={i} className={`sw-fab-particle sw-fab-p${i + 1} absolute left-1/2 top-1/2 text-[10px] opacity-0`}>
                {p}
              </span>
            ))}
          </span>

          <span className="sw-fab-box relative h-6 w-7 sm:h-7 sm:w-8" aria-hidden>
            <span className="sw-fab-body absolute bottom-0 left-0 h-[60%] w-full overflow-hidden rounded-[3px_3px_5px_5px] bg-gradient-to-b from-amber-200 to-amber-400 shadow-[inset_0_-3px_4px_rgba(0,0,0,0.18),0_2px_4px_rgba(0,0,0,0.18)]">
              <span className="absolute left-1/2 top-0 h-full w-[22%] -translate-x-1/2 bg-red-600" />
            </span>
            <span className="sw-fab-lid absolute -left-[6%] top-[26%] h-[26%] w-[112%] origin-[10%_100%] rounded-[4px] bg-gradient-to-b from-amber-100 to-amber-300 shadow-[0_2px_5px_rgba(0,0,0,0.22)]">
              <span className="absolute left-1/2 top-0 h-full w-[26%] -translate-x-1/2 rounded-sm bg-red-600" />
              <span className="sw-fab-bow absolute -top-1.5 left-1/2 h-2 w-3.5 -translate-x-1/2" />
            </span>
          </span>
        </span>
      </button>

      <style jsx global>{`
        .sw-fab-box {
          animation: swFabBoxPop 3s ease-in-out infinite;
        }
        .sw-fab-lid {
          animation: swFabLidOpen 3s ease-in-out infinite;
        }
        .sw-fab-pulse-ring {
          animation: swFabPulse 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .sw-fab-bow::before,
        .sw-fab-bow::after {
          content: "";
          position: absolute;
          top: 0;
          width: 8px;
          height: 8px;
          background: #dc2626;
          border-radius: 50% 50% 50% 0;
        }
        .sw-fab-bow::before {
          left: -4px;
          transform: rotate(-45deg);
        }
        .sw-fab-bow::after {
          left: 1px;
          transform: rotate(45deg) scaleX(-1);
        }
        .sw-fab:hover .sw-fab-box,
        .sw-fab:hover .sw-fab-lid {
          animation-duration: 1.4s;
        }
        .sw-fab:hover .sw-fab-particle {
          animation-play-state: running;
        }
        .sw-fab-particle {
          animation-duration: 1.1s;
          animation-timing-function: ease-out;
          animation-iteration-count: infinite;
          animation-play-state: paused;
        }
        .sw-fab-p1 { animation-name: swFabBlast1; }
        .sw-fab-p2 { animation-name: swFabBlast2; }
        .sw-fab-p3 { animation-name: swFabBlast3; }
        .sw-fab-p4 { animation-name: swFabBlast4; }
        .sw-fab-p5 { animation-name: swFabBlast5; }
        .sw-fab-p6 { animation-name: swFabBlast6; }

        @keyframes swFabBoxPop {
          0%, 54%, 100% { transform: translateY(0) scale(1, 1); }
          60% { transform: translateY(1px) scale(1.08, 0.9); }
          68% { transform: translateY(-3px) scale(0.94, 1.08); }
          80% { transform: translateY(0) scale(1, 1); }
        }
        @keyframes swFabLidOpen {
          0%, 56%, 94%, 100% { transform: rotate(0deg) translateY(0); }
          68% { transform: rotate(-34deg) translateY(-4px); }
          82% { transform: rotate(-22deg) translateY(-2px); }
        }
        @keyframes swFabPulse {
          0% { transform: scale(0.95); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(0.95); opacity: 1; }
        }
        @keyframes swFabBlast1 {
          0%, 58% { transform: translate(-50%, -50%) scale(0.2) rotate(0deg); opacity: 0; }
          66% { opacity: 1; transform: translate(calc(-50% + 4px), calc(-50% - 6px)) scale(0.6) rotate(20deg); }
          100% { transform: translate(calc(-50% + 22px), calc(-50% - 30px)) scale(1) rotate(150deg); opacity: 0; }
        }
        @keyframes swFabBlast2 {
          0%, 58% { transform: translate(-50%, -50%) scale(0.2) rotate(0deg); opacity: 0; }
          66% { opacity: 1; transform: translate(calc(-50% - 4px), calc(-50% - 6px)) scale(0.6) rotate(-20deg); }
          100% { transform: translate(calc(-50% - 22px), calc(-50% - 32px)) scale(1) rotate(-150deg); opacity: 0; }
        }
        @keyframes swFabBlast3 {
          0%, 58% { transform: translate(-50%, -50%) scale(0.2) rotate(0deg); opacity: 0; }
          66% { opacity: 1; transform: translate(calc(-50% + 2px), calc(-50% - 8px)) scale(0.55) rotate(10deg); }
          100% { transform: translate(calc(-50% + 9px), calc(-50% - 38px)) scale(1.05) rotate(100deg); opacity: 0; }
        }
        @keyframes swFabBlast4 {
          0%, 58% { transform: translate(-50%, -50%) scale(0.2) rotate(0deg); opacity: 0; }
          66% { opacity: 1; transform: translate(calc(-50% - 2px), calc(-50% - 8px)) scale(0.55) rotate(-10deg); }
          100% { transform: translate(calc(-50% - 11px), calc(-50% - 36px)) scale(1.05) rotate(-100deg); opacity: 0; }
        }
        @keyframes swFabBlast5 {
          0%, 58% { transform: translate(-50%, -50%) scale(0.15) rotate(0deg); opacity: 0; }
          66% { opacity: 0.9; transform: translate(-50%, calc(-50% - 6px)) scale(0.5) rotate(0deg); }
          100% { transform: translate(calc(-50% + 2px), calc(-50% - 40px)) scale(0.9) rotate(210deg); opacity: 0; }
        }
        @keyframes swFabBlast6 {
          0%, 58% { transform: translate(-50%, -50%) scale(0.15) rotate(0deg); opacity: 0; }
          66% { opacity: 0.9; transform: translate(-50%, calc(-50% - 6px)) scale(0.5) rotate(0deg); }
          100% { transform: translate(calc(-50% - 6px), calc(-50% - 34px)) scale(0.9) rotate(-210deg); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sw-fab-box,
          .sw-fab-lid,
          .sw-fab-pulse-ring,
          .sw-fab-particle {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
