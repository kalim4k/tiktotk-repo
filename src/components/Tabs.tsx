import React from 'react';

interface TabsProps {
  activeTab: 'grid' | 'lock' | 'bookmark' | 'heart';
  onTabChange: (tab: 'grid' | 'lock' | 'bookmark' | 'heart') => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full bg-white border-b border-gray-200 text-black">
      <div className="grid grid-cols-4 w-full">
        {/* Tab 1: Grid / Sliders icon (3 short vertical bars + chevron) */}
        <button
          onClick={() => onTabChange('grid')}
          className={`flex flex-col items-center justify-center py-1.5 relative transition-colors ${
            activeTab === 'grid' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Videos"
        >
          <div className="flex items-center justify-center">
            <svg className="w-7 h-[21px]" viewBox="0 0 120 90" fill="currentColor">
              {/* Rangée du haut */}
              <rect x="15" y="10" width="10" height="40" rx="5" />
              <rect x="40" y="10" width="10" height="40" rx="5" />
              <rect x="65" y="10" width="10" height="40" rx="5" />

              {/* Rangée du bas */}
              <rect x="15" y="55" width="10" height="40" rx="5" />
              <rect x="40" y="55" width="10" height="40" rx="5" />
              <rect x="65" y="55" width="10" height="40" rx="5" />

              {/* Flèche triangle vers le bas */}
              <path d="M 90 35 L 115 35 L 102.5 55 Z" />
            </svg>
          </div>

          {/* Active bottom line indicator */}
          {activeTab === 'grid' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-black rounded-full" />
          )}
        </button>

        {/* Tab 2: Lock Icon (Private videos) */}
        <button
          onClick={() => onTabChange('lock')}
          className={`flex flex-col items-center justify-center py-1.5 relative transition-colors ${
            activeTab === 'lock' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Private videos"
        >
          {/* Classic padlock: rectangular body + semi-circular shackle */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {activeTab === 'lock' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-black rounded-full" />
          )}
        </button>

        {/* Tab 3: Bookmark Icon (Saved / Favorites) */}
        <button
          onClick={() => onTabChange('bookmark')}
          className={`flex flex-col items-center justify-center py-1.5 relative transition-colors ${
            activeTab === 'bookmark' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Saved videos"
        >
          {/* Rectangle label with triangular notch at bottom */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          {activeTab === 'bookmark' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-black rounded-full" />
          )}
        </button>

        {/* Tab 4: Heart Icon (Liked videos) */}
        <button
          onClick={() => onTabChange('heart')}
          className={`flex flex-col items-center justify-center py-1.5 relative transition-colors ${
            activeTab === 'heart' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Liked videos"
        >
          {/* Classic outline heart */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {activeTab === 'heart' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-black rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
};

