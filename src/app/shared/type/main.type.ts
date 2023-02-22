export interface SongType {
  artist: string;
  description: string;
  downloadCount: number;
  duration: string;
  id: string;
  media_file: string;
  playCount: number;
  thumb_img: string;
  title: string;
}

export interface MoodType {
  description: string;
  id: string;
  img: string;
  songs: Array<SongType>;
  title: string;
}

export interface TopPickSubType {
  id: string;
  img: string;
  title: string;
}

export interface AudioPlayerTrackType {
  title: string;
  link: string;
  artist: string;
  duration?: 150;
}

export interface TrendingType {
  id: string;
  songs: Array<SongType>;
  title: string;
}
