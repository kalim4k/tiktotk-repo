import React from 'react';
import { ChevronDown, Plus, Link as LinkIcon } from 'lucide-react';
import { ProfileData } from '../types';

interface ProfileInfoProps {
  profile: ProfileData;
  onEditProfile: () => void;
  onOpenTikTokStudio: () => void;
  onOpenPromote: () => void;
  onAvatarClick?: () => void;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profile,
  onEditProfile,
  onOpenTikTokStudio,
  onOpenPromote,
  onAvatarClick,
}) => {
  return (
    <div className="flex flex-col items-center pt-1.5 pb-1 px-4 bg-white text-black">
      {/* Avatar Container */}
      <div className="relative mb-2">
        <div
          onClick={onAvatarClick || onEditProfile}
          className="w-[96px] h-[96px] sm:w-[104px] sm:h-[104px] rounded-full bg-[#D0D0D0] flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
        >
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.username}
              className="w-full h-full object-cover"
            />
          ) : (
            /* User Silhouette in slightly darker gray (#B8B8BD), head + rounded body */
            <svg
              className="w-[72px] h-[72px] text-[#B8B8BD] fill-current translate-y-1.5"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="38" r="22" />
              <path d="M16 92c0-18.8 15.2-34 34-34s34 15.2 34 34H16z" />
            </svg>
          )}
        </div>

        {/* Plus Badge on Avatar: Turquoise (#00D9F5) with thick white border */}
        <button
          onClick={onEditProfile}
          className="absolute bottom-0 right-0 bg-[#00D9F5] text-white w-7 h-7 rounded-full flex items-center justify-center border-[3px] border-white shadow-xs hover:scale-105 transition-transform"
          title="Add profile photo / Edit profile"
        >
          <Plus className="w-4 h-4 stroke-[3.5]" />
        </button>
      </div>

      {/* Username & Edit Button Row */}
      <div className="flex items-center gap-2 mb-0.5">
        <button
          onClick={onEditProfile}
          className="flex items-center gap-1 font-bold text-[17px] text-gray-900 tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="blur-[6px] select-none">{profile.username}</span>
          {/* Small "v" chevron dropdown (~11px) */}
          <ChevronDown className="w-3.5 h-3.5 text-black stroke-[2.5]" />
        </button>

        {/* Edit Button Pill */}
        <button
          onClick={onEditProfile}
          className="bg-[#f1f1f2] hover:bg-gray-200 text-black text-[13px] font-semibold px-3 py-0.5 rounded-full transition-colors border border-gray-200/50 active:scale-95"
        >
          Edit
        </button>
      </div>

      {/* Handle */}
      <p className="text-[13px] text-gray-500 font-normal mb-2 tracking-normal blur-[5px] select-none">
        {profile.handle}
      </p>

      {/* Stats Row */}
      <div className="flex items-center justify-center gap-6 sm:gap-8 mb-2 w-full max-w-xs">
        {/* Following */}
        <div className="flex flex-col items-center">
          <span className="font-bold text-[16px] sm:text-[17px] text-gray-900 leading-none">
            {profile.following}
          </span>
          <span className="text-[12px] text-gray-500 font-normal mt-0.5">
            Following
          </span>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-3.5 bg-gray-200" />

        {/* Followers */}
        <div className="flex flex-col items-center">
          <span className="font-bold text-[16px] sm:text-[17px] text-gray-900 leading-none">
            {profile.followers}
          </span>
          <span className="text-[12px] text-gray-500 font-normal mt-0.5">
            Followers
          </span>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-3.5 bg-gray-200" />

        {/* Likes */}
        <div className="flex flex-col items-center">
          <span className="font-bold text-[16px] sm:text-[17px] text-gray-900 leading-none">
            {profile.likes}
          </span>
          <span className="text-[12px] text-gray-500 font-normal mt-0.5">
            Likes
          </span>
        </div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <p className="text-[13px] text-gray-800 font-normal mb-1 text-center px-4">
          {profile.bio}
        </p>
      )}

      {/* Website Link */}
      {profile.website && (
        <a
          href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-[2px] font-semibold text-[14px] text-gray-900 my-1 hover:underline active:opacity-80 transition-opacity"
        >
          <svg
            className="w-[19px] h-[19px] text-black shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Top-right U loop */}
            <path d="M 12.5 7.5 C 16.5 3.5, 20.5 7.5, 16.5 11.5" />
            {/* Bottom-left U loop */}
            <path d="M 11.5 16.5 C 7.5 20.5, 3.5 16.5, 7.5 12.5" />
            {/* Center diagonal bar */}
            <line x1="10.5" y1="13.5" x2="13.5" y2="10.5" />
          </svg>
          <span>{profile.website}</span>
        </a>
      )}

      {/* Action Buttons: TikTok Studio & Promote */}
      <div className="flex items-center justify-center gap-5 my-1 py-0.5 w-full">
        {/* TikTok Studio Button */}
        <button
          onClick={onOpenTikTokStudio}
          className="flex items-center justify-center gap-1 text-[14px] font-semibold text-[#0f0f0f] hover:opacity-80 transition-opacity active:scale-95"
        >
          <svg
            className="w-[15px] h-[15px] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
          >
            {/* Head */}
            <circle cx="8.5" cy="8.5" r="3.2" stroke="#FE2C55" strokeWidth="1.8" />
            {/* Body */}
            <path
              d="M 3.5 18 C 3.5 14.5, 6 13.5, 8.5 13.5 C 10.5 13.5, 12 14.2, 13 15.5"
              stroke="#FE2C55"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Star */}
            <path
              d="M 17.5 7.5 L 18.6 10.2 L 21.5 10.4 L 19.3 12.3 L 20 15.2 L 17.5 13.7 L 15 15.2 L 15.7 12.3 L 13.5 10.4 L 16.4 10.2 Z"
              fill="#FE2C55"
            />
          </svg>
          <span>TikTok Studio</span>
        </button>

        {/* Promote Button */}
        <button
          onClick={onOpenPromote}
          className="flex items-center justify-center gap-1 text-[14px] font-semibold text-[#0f0f0f] hover:opacity-80 transition-opacity active:scale-95"
        >
          <svg
            className="w-[15px] h-[15px] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FE2C55"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 12 2.5 C 10 7, 13 9.5, 13 13 C 14.5 11.5, 15.5 10, 15 8 C 18.5 11, 19.5 14.5, 19.5 17 C 19.5 20.8, 16.5 22.5, 12 22.5 C 7.5 22.5, 4.5 20.8, 4.5 17 C 4.5 14.5, 6 12.5, 7.5 11.2 C 7.5 13.5, 8.8 14.8, 9.5 15.2 C 8.8 12, 10 9.5, 12 2.5 Z" />
          </svg>
          <span>Promote</span>
        </button>
      </div>
    </div>
  );
};

