import React, { useState, useRef } from 'react';
import { VideoItem } from '../types';
import { X, Plus, Edit2, Trash2, Video, Eye, Film, Upload } from 'lucide-react';
import { ThumbnailGraphic } from './ThumbnailGraphic';

interface VideoManagerModalProps {
  videos: VideoItem[];
  onSaveVideos: (updatedVideos: VideoItem[]) => void;
  onClose: () => void;
}

export const VideoManagerModal: React.FC<VideoManagerModalProps> = ({
  videos,
  onSaveVideos,
  onClose,
}) => {
  const [localVideos, setLocalVideos] = useState<VideoItem[]>(videos);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(
    videos.length > 0 ? videos[0].id : null
  );

  // Form states
  const [playCount, setPlayCount] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [currentVideoExtra, setCurrentVideoExtra] = useState<Partial<VideoItem>>({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load video details into form
  const loadVideoIntoForm = (video: VideoItem) => {
    setSelectedVideoId(video.id);
    setIsAddingNew(false);
    setPlayCount(video.playCount);
    setImageUrl(video.imageUrl || '');
    setCurrentVideoExtra({
      topBadge: video.topBadge,
      middleBadge: video.middleBadge,
      bottomBadge: video.bottomBadge,
      caption: video.caption,
      soundName: video.soundName,
      likesCount: video.likesCount,
      commentsCount: video.commentsCount,
      sharesCount: video.sharesCount,
      thumbnailBg: video.thumbnailBg,
      thumbnailType: video.thumbnailType,
    });
  };

  // Initial load
  React.useEffect(() => {
    if (videos.length > 0) {
      loadVideoIntoForm(videos[0]);
    } else {
      handleAddNewClick();
    }
  }, []);

  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setSelectedVideoId(null);
    setPlayCount('25K');
    setImageUrl('');
    setCurrentVideoExtra({
      caption: 'Nouveau contenu vidéo',
      soundName: 'Son original',
      likesCount: '542',
      commentsCount: '24',
      sharesCount: '11',
      thumbnailBg: 'from-amber-950 via-slate-900 to-zinc-900',
      thumbnailType: 'night_street_women',
    });
  };

  // Handle local file selection from PC
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();

    if (isAddingNew) {
      const newVideo: VideoItem = {
        id: String(Date.now()),
        playCount,
        imageUrl: imageUrl.trim() || undefined,
        caption: currentVideoExtra.caption || 'Nouveau contenu',
        soundName: currentVideoExtra.soundName || 'Son original',
        likesCount: currentVideoExtra.likesCount || '500',
        commentsCount: currentVideoExtra.commentsCount || '50',
        sharesCount: currentVideoExtra.sharesCount || '25',
        thumbnailBg: currentVideoExtra.thumbnailBg || 'from-amber-950 via-slate-900 to-zinc-900',
        thumbnailType: currentVideoExtra.thumbnailType || 'night_street_women',
      };
      const updated = [...localVideos, newVideo];
      setLocalVideos(updated);
      onSaveVideos(updated);
      setSelectedVideoId(newVideo.id);
      setIsAddingNew(false);
    } else if (selectedVideoId) {
      const updated = localVideos.map((v) => {
        if (v.id === selectedVideoId) {
          return {
            ...v,
            playCount,
            imageUrl: imageUrl.trim() || undefined,
          };
        }
        return v;
      });
      setLocalVideos(updated);
      onSaveVideos(updated);
    }
  };

  const handleDeleteVideo = (id: string) => {
    const updated = localVideos.filter((v) => v.id !== id);
    setLocalVideos(updated);
    onSaveVideos(updated);
    
    if (selectedVideoId === id) {
      if (updated.length > 0) {
        loadVideoIntoForm(updated[0]);
      } else {
        setSelectedVideoId(null);
        setIsAddingNew(true);
      }
    }
  };

  const getPreviewVideoItem = (): VideoItem => {
    return {
      id: selectedVideoId || 'preview',
      playCount: playCount || '0',
      imageUrl: imageUrl.trim() || undefined,
      topBadge: currentVideoExtra.topBadge,
      middleBadge: currentVideoExtra.middleBadge,
      bottomBadge: currentVideoExtra.bottomBadge,
      caption: currentVideoExtra.caption,
      soundName: currentVideoExtra.soundName,
      likesCount: currentVideoExtra.likesCount,
      commentsCount: currentVideoExtra.commentsCount,
      sharesCount: currentVideoExtra.sharesCount,
      thumbnailBg: currentVideoExtra.thumbnailBg || 'from-amber-950 via-slate-900 to-zinc-900',
      thumbnailType: currentVideoExtra.thumbnailType || 'night_street_women',
    };
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl h-[92vh] sm:h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-gray-900">
        
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-[#ff2c55]" />
            <h3 className="font-bold text-[15px]">Gestionnaire de Vidéos</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Split Layout */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Column: Grid list of all videos (Scrollable) */}
          <div className="w-full md:w-[35%] border-r border-gray-100 p-4 flex flex-col overflow-y-auto bg-gray-50/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Vos Vidéos ({localVideos.length})
              </span>
              <button
                type="button"
                onClick={handleAddNewClick}
                className="flex items-center gap-1 text-xs font-bold text-white bg-[#ff2c55] hover:bg-[#e02649] px-2.5 py-1.5 rounded-lg transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Ajouter
              </button>
            </div>

            {localVideos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400">
                <Video className="w-10 h-10 mb-2 stroke-1" />
                <p className="text-sm">Aucune vidéo</p>
                <button
                  type="button"
                  onClick={handleAddNewClick}
                  className="mt-3 text-xs text-[#ff2c55] font-semibold hover:underline"
                >
                  Ajouter une vidéo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {localVideos.map((vid) => {
                  const isSelected = vid.id === selectedVideoId && !isAddingNew;
                  return (
                    <div
                      key={vid.id}
                      onClick={() => loadVideoIntoForm(vid)}
                      className={`relative aspect-[3/3.8] rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#ff2c55] ring-2 ring-[#ff2c55]/20 shadow-md scale-[1.02]'
                          : 'border-transparent shadow-xs hover:border-gray-300'
                      }`}
                    >
                      <ThumbnailGraphic video={vid} />
                      <div className="absolute top-1 right-1 z-30 flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteVideo(vid.id);
                          }}
                          className="bg-black/75 hover:bg-red-600 p-1.5 rounded-md text-white transition-colors"
                          title="Supprimer la vidéo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      {/* Selection overlay indicator */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#ff2c55]/10 border border-[#ff2c55] z-10 pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Simplified Form */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto flex flex-col lg:flex-row gap-5">
            
            {/* Real-time Visual Preview Panel */}
            <div className="w-full lg:w-[170px] shrink-0 flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Aperçu
              </span>
              <div className="w-[145px] aspect-[3/3.8] rounded-xl overflow-hidden shadow-xl border border-gray-200/50 bg-black relative">
                <ThumbnailGraphic video={getPreviewVideoItem()} />
              </div>
              <p className="text-[11px] text-gray-400 mt-2 text-center max-w-[140px] leading-tight">
                Reflète instantanément l'affichage sur votre profil.
              </p>
            </div>

            {/* Editor form */}
            <form onSubmit={handleSaveVideo} className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                <Edit2 className="w-4 h-4 text-[#ff2c55]" />
                <h4 className="font-bold text-gray-800 text-sm">
                  {isAddingNew ? 'Ajouter une nouvelle vidéo' : 'Modifier les paramètres'}
                </h4>
              </div>

              {/* Views Count */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
                  <Eye className="w-3.5 h-3.5 text-gray-500" />
                  Nombre de Vues (Ex: 145K, 1.2M, 5240)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 24.5K"
                  value={playCount}
                  onChange={(e) => setPlayCount(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#ff2c55]"
                />
              </div>

              {/* Local File Upload from PC */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-3">
                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                  <Upload className="w-3.5 h-3.5 text-[#ff2c55]" />
                  Importer la Miniature depuis votre PC / Téléphone
                </label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-[#ff2c55] rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-white group"
                >
                  {imageUrl ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-xs">
                      <img src={imageUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400 group-hover:text-[#ff2c55] transition-colors" />
                  )}
                  <p className="text-xs font-bold text-gray-700">
                    {imageUrl ? 'Modifier la miniature' : 'Sélectionner un fichier image'}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Soutient PNG, JPG ou GIF. Directement importé de votre appareil.
                  </p>
                </div>

                {/* Option to clear/reset the image if desired */}
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="text-[11px] text-red-500 font-semibold text-right hover:underline"
                  >
                    Effacer l'image importée
                  </button>
                )}
              </div>

              {/* Submit / Action Buttons */}
              <div className="flex items-center gap-2.5 mt-auto pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 rounded-lg font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-xs text-center"
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg font-bold text-white bg-[#ff2c55] hover:bg-[#e02649] transition-colors shadow-xs text-xs"
                >
                  {isAddingNew ? 'Ajouter cette vidéo' : 'Enregistrer les modifications'}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
