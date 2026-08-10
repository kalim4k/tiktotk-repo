import React from 'react';
import { VideoItem } from '../types';

export function formatTikTokPlayCount(playCount: string): string {
  if (!playCount) return '0';
  
  // Normalize string: remove spaces, replace commas with dots
  let clean = playCount.trim().toUpperCase().replace(/\s/g, '').replace(/,/g, '.');
  
  // Check if it has a suffix K or M
  let multiplier = 1;
  if (clean.endsWith('K')) {
    multiplier = 1000;
    clean = clean.slice(0, -1);
  } else if (clean.endsWith('M')) {
    multiplier = 1000000;
    clean = clean.slice(0, -1);
  }
  
  const numericValue = parseFloat(clean);
  if (isNaN(numericValue)) {
    return playCount;
  }
  
  const totalViews = numericValue * multiplier;
  
  // If views are under 10 000 (10K), display in full (e.g., 3 000)
  if (totalViews < 10000) {
    return Math.floor(totalViews).toLocaleString('fr-FR').replace(/\u00a0/g, ' ');
  }
  
  // From 10K and above: display in K or M
  if (totalViews >= 1000000) {
    const millions = totalViews / 1000000;
    return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1).replace('.', ',')}M`;
  } else {
    const thousands = totalViews / 1000;
    return thousands % 1 === 0 ? `${thousands}K` : `${thousands.toFixed(1).replace('.', ',')}K`;
  }
}

interface ThumbnailGraphicProps {
  video: VideoItem;
}

export const ThumbnailGraphic: React.FC<ThumbnailGraphicProps> = ({ video }) => {
  const { thumbnailType } = video;

  // Visual background SVG / CSS illustration representing each scene from screenshot
  const renderBackgroundScene = () => {
    switch (thumbnailType) {
      case 'woman_red_dress':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-800 to-amber-950 flex flex-col items-center justify-center overflow-hidden">
            {/* Night street background wall */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-zinc-900 to-black opacity-90" />
            
            {/* Woman silhouette with blonde hair & red dress */}
            <div className="relative z-10 flex flex-col items-center translate-y-2">
              {/* Blonde hair */}
              <div className="w-10 h-10 bg-amber-200 rounded-full blur-[1px] relative">
                {/* Face outline */}
                <div className="w-6 h-7 bg-amber-100 rounded-full mx-auto translate-y-2" />
              </div>
              {/* Red dress body */}
              <div className="w-14 h-32 bg-gradient-to-b from-red-600 to-red-700 rounded-t-xl -mt-2 flex flex-col items-center pt-3 shadow-lg" />
            </div>
          </div>
        );

      case 'car_window_view':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-stone-900 to-black overflow-hidden">
            {/* Car door frame outline on left */}
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-black/80 z-10 border-r border-zinc-700/50 shadow-2xl flex flex-col justify-center">
              {/* Car window curve */}
              <div className="w-full h-2/3 border-r-2 border-zinc-600 rounded-r-3xl opacity-40" />
            </div>

            {/* Night street outside with city lights */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,_var(--tw-gradient-stops))] from-amber-700/40 via-zinc-900 to-black flex items-center justify-end pr-3">
              {/* Street light glow */}
              <div className="absolute top-4 right-6 w-12 h-12 bg-amber-400/20 rounded-full blur-md" />
              
              {/* Woman on sidewalk outside car */}
              <div className="flex flex-col items-center translate-y-3 z-0">
                <div className="w-6 h-6 bg-amber-900 rounded-full" />
                <div className="w-9 h-24 bg-zinc-800 rounded-t-lg -mt-1 flex flex-col items-center pt-2">
                  <div className="w-4 h-3 bg-cyan-400/80 rounded-xs blur-[0.5px]" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'car_colorful_dress':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-zinc-900 to-black overflow-hidden">
            {/* Car door mirror frame on left */}
            <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-black/85 z-10 border-r border-zinc-800" />
            
            {/* Street night scene */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,_var(--tw-gradient-stops))] from-orange-800/30 via-zinc-900 to-black flex items-center justify-end pr-5">
              {/* Woman in colorful dress */}
              <div className="flex flex-col items-center translate-y-2">
                <div className="w-6 h-6 bg-stone-700 rounded-full" />
                <div className="w-10 h-24 bg-gradient-to-b from-orange-500 via-pink-500 to-cyan-500 rounded-t-lg -mt-1 shadow-md" />
              </div>
            </div>
          </div>
        );

      case 'motorbikes_night':
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/40 via-stone-900 to-black overflow-hidden flex flex-col justify-end p-2">
            {/* Street lights and headlight blurs */}
            <div className="absolute top-6 left-1/3 w-16 h-16 bg-amber-300/20 rounded-full blur-lg" />
            <div className="absolute bottom-12 left-6 w-8 h-8 bg-yellow-200/40 rounded-full blur-xs" />
            <div className="absolute bottom-10 right-8 w-10 h-10 bg-red-500/30 rounded-full blur-sm" />
            
            {/* Motorbike headlights street vibe */}
            <div className="w-full h-1/2 bg-gradient-to-t from-black via-zinc-900/80 to-transparent relative">
              <div className="absolute bottom-4 left-4 w-12 h-6 bg-zinc-800 rounded-full border border-zinc-700" />
              <div className="absolute bottom-6 right-6 w-14 h-7 bg-stone-800 rounded-full border border-zinc-700" />
            </div>
          </div>
        );

      case 'indoor_room':
        return (
          <div className="absolute inset-0 bg-[#d1c2ab] flex items-center justify-between p-3 overflow-hidden">
            {/* Wooden Door */}
            <div className="w-1/2 h-full bg-[#7a482b] border-2 border-[#5c341e] rounded-t-sm shadow-inner flex items-center justify-end pr-2">
              <div className="w-2 h-2 rounded-full bg-amber-200 border border-amber-400" />
            </div>

            {/* Wall AC Unit */}
            <div className="w-5/12 h-full flex flex-col justify-center gap-3 items-end pr-1">
              <div className="w-10 h-16 bg-gray-100 border border-gray-300 rounded-sm shadow-xs flex flex-col justify-between p-1">
                <div className="w-full h-2 bg-gray-300 rounded-xs" />
                <div className="w-2 h-2 rounded-full bg-green-500 self-center" />
              </div>
              <div className="w-6 h-6 bg-gray-100 border border-gray-300 rounded-xs" />
            </div>
          </div>
        );

      case 'night_street_group':
      case 'night_street_women':
      default:
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-zinc-900 to-neutral-950 overflow-hidden flex items-end justify-center pb-2">
            {/* Street background glow */}
            <div className="absolute top-2 left-4 w-20 h-12 bg-amber-500/20 rounded-full blur-md" />
            <div className="absolute top-10 right-2 w-16 h-16 bg-blue-500/20 rounded-full blur-md" />
            
            {/* Sidewalk & stall lights */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-zinc-950 to-transparent" />
            
            {/* Multiple women standing on street */}
            <div className="relative z-0 flex items-end gap-1 translate-y-1">
              <div className="w-7 h-20 bg-gradient-to-b from-pink-600 to-purple-800 rounded-t-md opacity-90" />
              <div className="w-8 h-24 bg-gradient-to-b from-blue-600 to-indigo-900 rounded-t-md opacity-90" />
              <div className="w-7 h-22 bg-gradient-to-b from-rose-600 to-red-900 rounded-t-md opacity-90" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full relative select-none overflow-hidden bg-black">
      {/* Background Graphic Scene or Custom Imported Image */}
      {video.imageUrl ? (
        <img
          src={video.imageUrl}
          alt={video.caption || "Video thumbnail"}
          className="w-full h-full object-cover absolute inset-0"
          referrerPolicy="no-referrer"
        />
      ) : (
        renderBackgroundScene()
      )}

      {/* Dark overlay gradient for readable overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 z-10 pointer-events-none" />

      {/* Overlay Text Badges & Banners */}
      <div className="absolute inset-x-1 top-2.5 z-20 flex flex-col items-center gap-1.5 px-0.5 text-center">
        {/* Top Badge */}
        {video.topBadge && (
          <div
            className={`w-full max-w-[96%] py-1 px-1 rounded-[3px] text-[10px] sm:text-[11.5px] font-black tracking-tight text-white shadow-md leading-tight uppercase ${
              video.topBadge.bgColor === 'transparent'
                ? 'bg-transparent text-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] text-[13px] font-black'
                : video.topBadge.bgColor
            }`}
          >
            {video.topBadge.text}
          </div>
        )}

        {/* Middle Badge */}
        {video.middleBadge && (
          <div
            className={`w-full max-w-[96%] py-1 px-1 rounded-[3px] text-[9.5px] sm:text-[11px] font-black tracking-tight text-white shadow-md leading-tight uppercase flex items-center justify-center gap-1 ${video.middleBadge.bgColor}`}
          >
            <span>{video.middleBadge.text}</span>
            {video.middleBadge.hasArrow && (
              <span className="text-yellow-300 font-extrabold text-xs">↗</span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Badge if present */}
      {video.bottomBadge && (
        <div className="absolute inset-x-1 bottom-8 z-20 flex justify-center px-0.5">
          <div
            className={`w-full max-w-[96%] py-1 px-1 rounded-[3px] text-[10px] sm:text-[11px] font-black tracking-tight text-white shadow-md leading-tight text-center uppercase ${video.bottomBadge.bgColor}`}
          >
            {video.bottomBadge.text}
          </div>
        </div>
      )}

      {/* Play Count Overlay at Bottom-Left */}
      <div className="absolute left-1.5 bottom-1.5 z-20 flex items-center gap-1 text-white text-[13px] font-bold tracking-tight drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
        {/* Outlined Play Icon Triangle (▷) */}
        <svg
          className="w-3.5 h-3.5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        >
          <polygon points="6,4 20,12 6,20" />
        </svg>
        <span>{formatTikTokPlayCount(video.playCount)}</span>
      </div>
    </div>
  );
};
