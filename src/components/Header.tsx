import React from 'react';

interface HeaderProps {
  profileViews: string;
  onOpenViews?: () => void;
  onOpenMenu?: () => void;
  onShare?: () => void;
  onAddUser?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profileViews,
  onOpenViews,
  onOpenMenu,
  onShare,
  onAddUser,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white text-black px-4 py-1 flex items-center justify-between border-b border-gray-100/80">
      {/* Left: "Add friend" icon: Human silhouette with small + attached bottom-right */}
      <button
        onClick={onAddUser}
        className="w-[44px] h-[44px] flex items-center justify-center hover:bg-gray-100/80 rounded-full transition-colors text-black active:scale-95"
        title="Add account / friend"
      >
        <svg
          className="w-[28px] h-[28px]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        >
          {/* Tête (cercle) */}
          <circle cx="45" cy="30" r="16" />
          {/* Épaule / corps (arc ouvert) */}
          <path d="M 25 62 A 20 20 0 0 1 55 47" />
          {/* Signe plus */}
          <line x1="72" y1="45" x2="72" y2="65" />
          <line x1="62" y1="55" x2="82" y2="55" />
        </svg>
      </button>

      {/* Right side controls */}
      <div className="flex items-center gap-0.5">
        {/* Calendar icon with star */}
        <button
          className="w-[34px] h-[34px] flex items-center justify-center hover:bg-gray-100/80 rounded-full transition-colors text-black active:scale-95"
          title="Calendrier"
        >
          <svg
            className="w-[26px] h-[26px]"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="8.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Corps du calendrier */}
            <rect x="18" y="25" width="64" height="58" rx="14" />
            {/* Anneaux/attaches du haut */}
            <line x1="36" y1="14" x2="36" y2="33" />
            <line x1="64" y1="14" x2="64" y2="33" />
            {/* Étoile centrale (pleine) */}
            <path
              d="M 50 38.5 L 54.0 48.5 L 64.7 49.2 L 56.5 56.1 L 59.1 66.5 L 50 60.8 L 40.9 66.5 L 43.5 56.1 L 35.3 49.2 L 46.0 48.5 Z"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </button>

        {/* Share icon: curved outbound arrow pointing right */}
        <button
          onClick={onShare}
          className="w-[34px] h-[34px] flex items-center justify-center hover:bg-gray-100/80 rounded-full transition-colors text-black active:scale-95"
          title="Share profile"
        >
          <svg
            className="w-[26px] h-[22px]"
            viewBox="0 0 120 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path
              d="M 50 12 L 95 50 L 50 88 L 50 65 C 25 65, 10 75, 5 90 C 5 55, 20 32, 50 32 Z"
            />
          </svg>
        </button>

        {/* Hamburger Menu: 3 parallel horizontal lines */}
        <button
          onClick={onOpenMenu}
          className="w-[34px] h-[34px] flex items-center justify-center hover:bg-gray-100/80 rounded-full transition-colors text-black active:scale-95"
          title="Settings and privacy"
        >
          <svg
            className="w-[24px] h-[20px]"
            viewBox="0 0 24 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="0" y1="2" x2="24" y2="2" />
            <line x1="0" y1="9" x2="24" y2="9" />
            <line x1="0" y1="16" x2="24" y2="16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

