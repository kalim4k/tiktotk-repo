import React from 'react';

interface BottomNavProps {
  activeTab?: string;
  onTabSelect?: (tab: string) => void;
  onUploadClick?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab = 'profile',
  onTabSelect,
  onUploadClick,
}) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200/80 text-black max-w-lg mx-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-[50px] px-2 relative">
        {/* 1. Home (house outline, gray) */}
        <button
          onClick={() => onTabSelect?.('home')}
          className="flex flex-col items-center justify-center flex-1 h-full text-gray-500 hover:text-black transition-colors"
        >
          <svg
            className="w-[22px] h-[22px]"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Toit + murs (contour maison) */}
            <path d="M 20 45 L 50 15 L 80 45 L 80 82 C 80 85, 78 87, 75 87 L 25 87 C 22 87, 20 85, 20 82 Z" />
            {/* Petits chevrons du toit qui dépassent */}
            <line x1="18" y1="47" x2="20" y2="45" />
            <line x1="82" y1="47" x2="80" y2="45" />
            {/* Porte */}
            <line x1="50" y1="65" x2="50" y2="87" />
          </svg>
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </button>

        {/* 2. Friends (two silhouettes) */}
        <button
          onClick={() => onTabSelect?.('friends')}
          className="flex flex-col items-center justify-center flex-1 h-full text-gray-500 hover:text-black transition-colors"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-[10px] font-medium mt-0.5">Friends</span>
        </button>

        {/* 3. Center (+) Upload Button */}
        <button
          onClick={onUploadClick}
          className="flex items-center justify-center flex-1 h-full cursor-pointer group active:scale-95 transition-transform"
          title="Create post"
        >
          <svg className="w-[45px] h-[32px]" viewBox="0 0 120 90">
            {/* Ombre cyan (décalée en haut à gauche) */}
            <rect x="4" y="4" width="90" height="70" rx="20" fill="#25F4EE" />
            {/* Ombre rose/rouge (décalée en bas à droite) */}
            <rect x="18" y="10" width="90" height="70" rx="20" fill="#FE2C55" />
            {/* Rectangle principal noir/bleu foncé */}
            <rect x="11" y="7" width="90" height="70" rx="20" fill="#0E0E12" />
            {/* Signe plus blanc */}
            <line x1="56" y1="26" x2="56" y2="58" stroke="white" strokeWidth="7" strokeLinecap="round" />
            <line x1="40" y1="42" x2="72" y2="42" stroke="white" strokeWidth="7" strokeLinecap="round" />
          </svg>
        </button>

        {/* 4. Inbox (speech bubble + 99+ badge overlay SVG) */}
        <button
          onClick={() => onTabSelect?.('inbox')}
          className="flex flex-col items-center justify-center flex-1 h-full text-gray-500 hover:text-black transition-colors"
        >
          <svg className="w-[46px] h-[30px]" viewBox="0 0 200 130" fill="none">
            {/* Bulle de message (contour gris) */}
            <path
              d="M 30 25 L 105 25 L 105 90 L 70 90 L 55 110 L 55 90 L 30 90 Z"
              stroke="#808080"
              strokeWidth="8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Petit trait horizontal dans la bulle */}
            <line
              x1="62"
              y1="60"
              x2="90"
              y2="60"
              stroke="#808080"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Badge rose "99+" */}
            <rect x="75" y="5" width="120" height="65" rx="32.5" fill="#FE2C55" />
            <text
              x="135"
              y="52"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
              fontSize="45"
              fill="white"
              textAnchor="middle"
            >
              99+
            </text>
          </svg>
          <span className="text-[10px] font-medium mt-0.5">Inbox</span>
        </button>

        {/* 5. Profile (filled black human silhouette for active tab) */}
        <button
          onClick={() => onTabSelect?.('profile')}
          className="flex flex-col items-center justify-center flex-1 h-full text-black"
        >
          <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
            <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 12c-5.33 0-10 2.67-10 6v2h20v-2c0-3.33-4.67-6-10-6z" />
          </svg>
          <span className="text-[10px] font-bold mt-0.5">Profile</span>
        </button>
      </div>
    </nav>
  );
};

