import React from 'react';
import { X, Flame, Target, Users, Zap } from 'lucide-react';
import { ProfileData } from '../types';

interface PromoteModalProps {
  profile: ProfileData;
  onClose: () => void;
}

export const PromoteModal: React.FC<PromoteModalProps> = ({
  profile,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-red-500/10">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#ff2c55] fill-[#ff2c55]" />
            <h3 className="font-bold text-gray-900 text-base">Promote</h3>
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
          <div className="text-center px-2">
            <h4 className="font-bold text-gray-900 text-base mb-1">
              Boost your video reach
            </h4>
            <p className="text-gray-500 text-xs">
              Get more views, followers, and website visits with TikTok Promote campaigns.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-xs">More Video Views</div>
                <div className="text-[11px] text-gray-500">Reach up to 10,000+ targeted viewers</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-xs">More Followers</div>
                <div className="text-[11px] text-gray-500">Grow your profile audience quickly</div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-xs">More Website Clicks</div>
                <div className="text-[11px] text-gray-500">Drive traffic directly to your bio link</div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-bold text-white bg-[#ff2c55] hover:bg-[#e02649] transition-colors shadow-sm"
          >
            Start Campaign
          </button>
        </div>
      </div>
    </div>
  );
};
