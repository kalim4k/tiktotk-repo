export interface ProfileData {
  username: string;
  handle: string;
  avatarUrl: string;
  following: number;
  followers: string;
  likes: string;
  bio: string;
  website?: string;
  profileViews: string;
  hasBio: boolean;
}

export interface VideoItem {
  id: string;
  playCount: string;
  imageUrl?: string; // Custom imported thumbnail image URL
  topBadge?: {
    text: string;
    bgColor: string; // 'red' | 'blue'
  };
  middleBadge?: {
    text: string;
    bgColor: string;
    hasArrow?: boolean;
  };
  bottomBadge?: {
    text: string;
    bgColor: string;
  };
  caption: string;
  soundName: string;
  likesCount: string;
  commentsCount: string;
  sharesCount: string;
  // Visual styling parameters for realistic thumbnail rendering
  thumbnailBg: string;
  thumbnailType: 'night_street_women' | 'night_street_group' | 'car_window_view' | 'woman_red_dress' | 'motorbikes_night' | 'car_colorful_dress' | 'indoor_room';
}
