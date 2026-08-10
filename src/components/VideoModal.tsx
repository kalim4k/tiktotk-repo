import React, { useState } from 'react';
import { VideoItem, ProfileData } from '../types';
import {
  X,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Music2,
  Disc,
  Play,
  Pause,
  UserCheck,
} from 'lucide-react';
import { ThumbnailGraphic } from './ThumbnailGraphic';

interface VideoModalProps {
  video: VideoItem;
  profile: ProfileData;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  profile,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likesCount);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setLikeCount((prev) => {
        if (prev.endsWith('K')) return prev;
        const num = parseInt(prev.replace(/,/g, ''), 10) || 0;
        return (num + 1).toLocaleString();
      });
    } else {
      setLikeCount(video.likesCount);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center max-w-md mx-auto select-none overflow-hidden">
      {/* Main Video Stage */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {/* Render Thumbnail Graphic inside fullscreen view */}
        <div className="w-full h-full relative">
          <ThumbnailGraphic video={video} />

          {/* Pause overlay icon if user paused */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-30 pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center text-white pl-1">
                <Play className="w-8 h-8 fill-white" />
              </div>
            </div>
          )}
        </div>

        {/* Top bar controls */}
        <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between text-white">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-xs font-semibold bg-black/40 px-3 py-1 rounded-full">
            TikTok Video
          </div>
        </div>

        {/* Right Action Bar */}
        <div
          className="absolute right-3 bottom-20 z-40 flex flex-col items-center gap-5 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Profile Avatar with follow badge */}
          <div className="relative mb-2">
            <div className="w-11 h-11 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center overflow-hidden">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-bold text-gray-700 text-xs">
                  {profile.username.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#ff2c55] text-white rounded-full p-0.5 shadow-md">
              <UserCheck className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          {/* Like */}
          <button
            onClick={toggleLike}
            className="flex flex-col items-center gap-1 group active:scale-90 transition-transform"
          >
            <div
              className={`p-2 rounded-full bg-black/30 ${
                isLiked ? 'text-[#ff2c55]' : 'text-white'
              }`}
            >
              <Heart
                className={`w-7 h-7 ${
                  isLiked ? 'fill-[#ff2c55] stroke-[#ff2c55]' : 'stroke-[2]'
                }`}
              />
            </div>
            <span className="text-[11px] font-bold shadow-xs">
              {likeCount}
            </span>
          </button>

          {/* Comment */}
          <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
            <div className="p-2 rounded-full bg-black/30 text-white">
              <MessageCircle className="w-7 h-7 stroke-[2] fill-white/10" />
            </div>
            <span className="text-[11px] font-bold shadow-xs">
              {video.commentsCount}
            </span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
          >
            <div
              className={`p-2 rounded-full bg-black/30 ${
                isBookmarked ? 'text-amber-400' : 'text-white'
              }`}
            >
              <Bookmark
                className={`w-7 h-7 ${
                  isBookmarked ? 'fill-amber-400 stroke-amber-400' : 'stroke-[2]'
                }`}
              />
            </div>
            <span className="text-[11px] font-bold shadow-xs">
              {video.sharesCount}
            </span>
          </button>

          {/* Share */}
          <button className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
            <div className="p-2 rounded-full bg-black/30 text-white">
              <Share2 className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[11px] font-bold shadow-xs">Share</span>
          </button>

          {/* Spinning Sound Record Disk */}
          <div className="mt-2 relative">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center animate-spin text-white">
              <Disc className="w-6 h-6 text-zinc-400" />
            </div>
          </div>
        </div>

        {/* Bottom Details Overlay */}
        <div
          className="absolute bottom-6 left-3 right-16 z-40 text-white flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* User handle */}
          <h4 className="font-bold text-sm tracking-tight hover:underline cursor-pointer">
            @{profile.username}
          </h4>

          {/* Caption */}
          <p className="text-xs font-normal line-clamp-2 leading-snug drop-shadow-md">
            {video.caption}
          </p>

          {/* Audio bar */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-200 mt-1">
            <Music2 className="w-3.5 h-3.5 animate-bounce" />
            <span className="truncate text-[11px]">{video.soundName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
