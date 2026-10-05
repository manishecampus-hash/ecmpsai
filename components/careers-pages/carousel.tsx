import React from 'react';

export const LogoCarousel = () => {
  return (
    <div className="mx-auto mt-8 max-w-7xl px-4">
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
          /* soft fade on both edges so logos glide in and out */
          -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
        }
        .__carousel-container {
          display: flex;
          /* two identical strips; moving by -50% loops seamlessly.
             32s keeps the same on-screen speed as before now that the logos are larger */
          animation: scroll-left 32s linear infinite;
          width: max-content;
        }
        .__carousel-wrapper:hover .__carousel-container {
          animation-play-state: paused;
        }
        .__logo-strip {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .__logo-strip img {
          height: 60px;
          width: auto;
          max-width: none;
          object-fit: contain;
        }
        @media (min-width: 768px) {
          .__logo-strip img {
            height: 88px;
          }
        }
      `}</style>

      <div className="__carousel-wrapper">
        <div className="__carousel-container">
          {/* First set */}
          <div className="__logo-strip">
            <img src="/career/logo-strip.png" alt="Company logos" />
          </div>

          {/* Duplicate for seamless loop */}
          <div className="__logo-strip" aria-hidden>
            <img src="/career/logo-strip.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
