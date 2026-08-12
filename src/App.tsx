import React, { useState } from 'react';
import { initialProfileData, initialVideos } from './data/mockData';
import { ProfileData, VideoItem } from './types';
import { Header } from './components/Header';
import { ProfileInfo } from './components/ProfileInfo';
import { Tabs } from './components/Tabs';
import { VideoGrid } from './components/VideoGrid';
import { BottomNav } from './components/BottomNav';
import { VideoModal } from './components/VideoModal';
import { EditProfileModal } from './components/EditProfileModal';
import { TikTokStudioModal } from './components/TikTokStudioModal';
import { PromoteModal } from './components/PromoteModal';
import { VideoManagerModal } from './components/VideoManagerModal';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('tiktok_profile_data');
      return saved ? JSON.parse(saved) : initialProfileData;
    } catch (e) {
      return initialProfileData;
    }
  });
  
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('tiktok_videos_data');
      return saved ? JSON.parse(saved) : initialVideos;
    } catch (e) {
      return initialVideos;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('tiktok_profile_data', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  React.useEffect(() => {
    try {
      localStorage.setItem('tiktok_videos_data', JSON.stringify(videos));
    } catch (e) {
      console.error(e);
    }
  }, [videos]);

  const [activeTab, setActiveTab] = useState<'grid' | 'lock' | 'bookmark' | 'heart'>('grid');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVideoManagerOpen, setIsVideoManagerOpen] = useState(false);
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-black selection:bg-[#ff2c55]/20">
      {/* Main Container - Responsive Web App */}
      <div
        className="w-full max-w-lg mx-auto min-h-screen bg-white relative flex flex-col shadow-xs border-x border-gray-200/60"
        style={{ paddingBottom: 'calc(60px + env(safe-area-inset-bottom, 0px))' }}
      >
        
        {/* Top Header Bar */}
        <Header
          profileViews={profile.profileViews}
          onOpenViews={() => showNotification(`Profile viewed by ${profile.profileViews} people in the last 30 days`)}
          onOpenMenu={() => setIsVideoManagerOpen(true)}
          onShare={() => showNotification(`Profile link @${profile.username} copied!`)}
          onAddUser={() => showNotification('Switch or add account')}
        />

        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-black/90 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-neutral-700 animate-in fade-in duration-200">
            {notification}
          </div>
        )}

        {/* Profile Info Section */}
        <ProfileInfo
          profile={profile}
          onEditProfile={() => setIsEditModalOpen(true)}
          onOpenTikTokStudio={() => setIsStudioModalOpen(true)}
          onOpenPromote={() => setIsPromoteModalOpen(true)}
          onAvatarClick={() => setIsEditModalOpen(true)}
        />

        {/* Sub-Navigation Tabs */}
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Video Grid */}
        <VideoGrid
          videos={videos}
          activeTab={activeTab}
          onVideoSelect={(v) => setSelectedVideo(v)}
        />

        {/* Bottom Navigation Bar */}
        <BottomNav
          activeTab="profile"
          onTabSelect={(t) => showNotification(`Switched to ${t} tab`)}
          onUploadClick={() => showNotification('Opening camera / video upload tool...')}
        />

        {/* Modals */}
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            profile={profile}
            onClose={() => setSelectedVideo(null)}
          />
        )}

        {isEditModalOpen && (
          <EditProfileModal
            profile={profile}
            onSave={(updated) => {
              setProfile(updated);
              showNotification('Profile updated successfully!');
            }}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}

        {isStudioModalOpen && (
          <TikTokStudioModal
            profile={profile}
            onClose={() => setIsStudioModalOpen(false)}
          />
        )}

        {isPromoteModalOpen && (
          <PromoteModal
            profile={profile}
            onClose={() => setIsPromoteModalOpen(false)}
          />
        )}

        {isVideoManagerOpen && (
          <VideoManagerModal
            videos={videos}
            onSaveVideos={(updated) => {
              setVideos(updated);
              showNotification('Video grid updated successfully!');
            }}
            onClose={() => setIsVideoManagerOpen(false)}
          />
        )}

        {/* PWA Install Notification Prompt */}
        <PWAInstallPrompt />
      </div>
    </div>
  );
}
