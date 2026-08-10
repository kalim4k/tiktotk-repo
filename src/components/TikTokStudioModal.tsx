import React from 'react';
import { X, Sparkles, TrendingUp, Eye, DollarSign, Video, Users2 } from 'lucide-react';
import { ProfileData } from '../types';

interface TikTokStudioModalProps {
  profile: ProfileData;
  onClose: () => void;
}

export const TikTokStudioModal: React.FC<TikTokStudioModalProps> = ({
  profile,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-red-500/10 to-pink-500/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ff2c55] fill-[#ff2c55]" />
            <h3 className="font-bold text-gray-900 text-base">TikTok Studio</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200/50 rounded-full transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 flex flex-col gap-4 text-sm">
          {/* Overview Cards */}
          <div className="bg-neutral-900 text-white rounded-xl p-3.5 flex flex-col gap-2 shadow-md">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Analytics (Last 7 days)</span>
              <span className="text-emerald-400 font-semibold">+24.8%</span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Video views
                </span>
                <span className="text-lg font-bold text-white">212.8K</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Users2 className="w-3 h-3" /> Net followers
                </span>
                <span className="text-lg font-bold text-white">+1,240</span>
              </div>
            </div>
          </div>

          {/* Tools List */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Creator Tools
            </h4>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-pink-100 text-[#ff2c55] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-xs">Monetization</div>
                  <div className="text-[11px] text-gray-500">Creator Rewards Program</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">$184.20</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-xs">Video Analytics</div>
                  <div className="text-[11px] text-gray-500">Audience demographics & watch time</div>
                </div>
              </div>
              <span className="text-xs text-gray-400">View</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-bold text-white bg-[#ff2c55] hover:bg-[#e02649] transition-colors shadow-sm"
          >
            Close Studio
          </button>
        </div>
      </div>
    </div>
  );
};
