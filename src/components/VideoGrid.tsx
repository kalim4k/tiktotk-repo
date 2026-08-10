import React from 'react';
import { VideoItem } from '../types';
import { ThumbnailGraphic } from './ThumbnailGraphic';
import { Lock, Bookmark, Heart } from 'lucide-react';

interface VideoGridProps {
  videos: VideoItem[];
  activeTab: 'grid' | 'lock' | 'bookmark' | 'heart';
  onVideoSelect: (video: VideoItem) => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  activeTab,
  onVideoSelect,
}) => {
  if (activeTab === 'lock') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <Lock className="w-8 h-8 text-gray-400 stroke-[1.5]" />
        </div>
        <h3 className="font-bold text-gray-900 text-base mb-1">
          Your private videos
        </h3>
        <p className="text-gray-500 text-xs max-w-xs">
          To make your videos visible only to yourself, set them to "Only me" in privacy settings.
        </p>
      </div>
    );
  }

  if (activeTab === 'bookmark') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <Bookmark className="w-8 h-8 text-gray-400 stroke-[1.5]" />
        </div>
        <h3 className="font-bold text-gray-900 text-base mb-1">
          Favorite posts
        </h3>
        <p className="text-gray-500 text-xs max-w-xs">
          Your saved videos and collections will appear here.
        </p>
      </div>
    );
  }

  if (activeTab === 'heart') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <Heart className="w-8 h-8 text-gray-400 stroke-[1.5]" />
        </div>
        <h3 className="font-bold text-gray-900 text-base mb-1">
          Liked videos are private
        </h3>
        <p className="text-gray-500 text-xs max-w-xs">
          Videos liked by user69287610126 are currently hidden.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white pb-24">
      {/* 3-Column Grid */}
      <div className="grid grid-cols-3 gap-[1px] bg-white border-b border-gray-100">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => onVideoSelect(video)}
            className="aspect-[3/3.8] w-full relative overflow-hidden group cursor-pointer active:opacity-90 transition-opacity bg-black"
          >
            <ThumbnailGraphic video={video} />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
};
