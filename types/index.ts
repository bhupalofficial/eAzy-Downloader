
export interface VideoFormat {
  format_id: string;
  resolution: string; // e.g., "1080p", "720p", "audio only"
  ext: string;
  note?: string; // e.g., "HDR", "60fps", "128kbps"
  filesize?: number;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration?: number;
  url: string; // The original webpage URL
}

export interface TrackMetadata {
  artist: string;
  album: string;
  release_date: string;
  lyrics: string;
}

export interface ApiResponse {
  type: 'video' | 'playlist';
  title: string;
  id?: string;
  url?: string;
  thumbnail?: string;
  formats?: VideoFormat[]; // Available video formats
  audio_formats?: VideoFormat[]; // Available audio formats (YouTube only)
  videos?: Video[]; // For playlists
  metadata?: TrackMetadata; // Track metadata
}

export interface ServerStatus {
  status: string;
}

export type DownloadFormat = 'mp4' | 'mp3' | 'm4a';
export type DownloadQuality = string; // Now dynamic based on format_id

export interface QueueItem {
  id: string; // The url or a unique id for tracking
  title: string;
  thumbnail: string;
  url: string;
  status: 'queued' | 'downloading' | 'completed' | 'failed';
  progress: number; // 0 to 100
  error?: string;
  format: DownloadFormat;
  quality: DownloadQuality;
  platform: string;
}

