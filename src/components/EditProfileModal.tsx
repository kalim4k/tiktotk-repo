import React, { useState, useRef } from 'react';
import { ProfileData } from '../types';
import { X, Camera, RotateCcw, Upload } from 'lucide-react';
import { initialProfileData } from '../data/mockData';

interface EditProfileModalProps {
  profile: ProfileData;
  onSave: (updated: ProfileData) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  onSave,
  onClose,
}) => {
  const [username, setUsername] = useState(profile.username);
  const [handle, setHandle] = useState(profile.handle);
  const [following, setFollowing] = useState(profile.following.toString());
  const [followers, setFollowers] = useState(profile.followers);
  const [likes, setLikes] = useState(profile.likes);
  const [bio, setBio] = useState(profile.bio);
  const [website, setWebsite] = useState(profile.website || '');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...profile,
      username,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      following: parseInt(following, 10) || 0,
      followers,
      likes,
      bio,
      website,
      avatarUrl,
    });
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setUsername(initialProfileData.username);
    setHandle(initialProfileData.handle);
    setFollowing(initialProfileData.following.toString());
    setFollowers(initialProfileData.followers);
    setLikes(initialProfileData.likes);
    setBio(initialProfileData.bio);
    setWebsite(initialProfileData.website || '');
    setAvatarUrl(initialProfileData.avatarUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="font-bold text-gray-900 text-base">Edit Profile</h3>
          <button
            onClick={handleReset}
            className="text-xs text-[#ff2c55] font-semibold flex items-center gap-1 hover:underline"
            title="Reset to original screenshot values"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3.5 text-sm">
          {/* Avatar Preview & URL */}
          <div className="flex flex-col items-center gap-2 bg-neutral-50 p-3 rounded-xl border border-gray-100">
            <span className="text-xs font-bold text-gray-700 self-start">Photo de Profil</span>
            
            <div className="flex items-center gap-4 w-full">
              <div className="w-16 h-16 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden relative shadow-xs shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-6 h-6 text-gray-400" />
                )}
              </div>

              <div className="flex-1 flex flex-col gap-1.5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-[#ff2c55] hover:bg-[#e02649] px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Importer du PC
                </button>
                <p className="text-[10px] text-gray-400">
                  Sélectionnez un fichier image sur votre PC.
                </p>
              </div>
            </div>
            
            <div className="w-full mt-2 pt-2 border-t border-gray-200/50">
              <label className="block text-[10px] font-semibold text-gray-500 mb-1">Ou importer via URL :</label>
              <input
                type="text"
                placeholder="Collez l'URL de votre image ici..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#ff2c55]"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Handle */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Username Handle
            </label>
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg font-medium text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                Following
              </label>
              <input
                type="number"
                value={following}
                onChange={(e) => setFollowing(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg font-semibold text-gray-900 text-xs text-center"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                Followers
              </label>
              <input
                type="text"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg font-semibold text-gray-900 text-xs text-center"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                Likes
              </label>
              <input
                type="text"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg font-semibold text-gray-900 text-xs text-center"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Bio
            </label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg font-normal text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Website / Link */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Website / Link
            </label>
            <input
              type="text"
              placeholder="https://..."
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg font-normal text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg font-semibold text-white bg-[#ff2c55] hover:bg-[#e02649] transition-colors shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
