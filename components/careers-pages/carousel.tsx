import React from 'react';

export const LogoCarousel = () => {
  return (
    <div className="mx-auto mt-8 max-w-5xl">
      <p className="mb-6 text-sm font-extrabold text-gray-500">
        Our alumni work at top companies
      </p>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .__carousel-wrapper {
          overflow: hidden;
          width: 100%;
          background: white;
        }
        .__carousel-container {
          display: flex;
          animation: scroll-left 20s linear infinite;
          width: 200%;
        }
        .__carousel-wrapper:hover .__carousel-container {
          animation-play-state: paused;
        }
        .__logo-strip {
          width: 50%;
          height: auto;
          display: flex;
          align-items: center;
        }
        .__logo-strip img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
      `}</style>

      <div className="__carousel-wrapper">
        <div className="__carousel-container">
          {/* First set */}
          <div className="__logo-strip">
            <img src="/career/logo-strip.png" alt="Company logos" />
          </div>
          
          {/* Duplicate for seamless loop */}
          <div className="__logo-strip">
            <img src="/career/logo-strip.png" alt="Company logos" />
          </div>
        </div>
      </div>
    </div>
  );
};