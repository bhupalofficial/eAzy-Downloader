
import { ApiResponse, DownloadFormat, DownloadQuality, ServerStatus } from '../types';
import { translations } from '../locales/translations';

// Use relative path for API, proxied by Vite/Express
const API_BASE_URL = '/api';

const getErrorMsg = (key: keyof typeof translations.en.errors, lang: keyof typeof translations = 'en') => {
  return translations[lang]?.errors[key] || translations['en'].errors[key];
};

export const checkServerStatus = async (): Promise<ServerStatus> => {
  try {
    const response = await fetch(`${API_BASE_URL}/status`);
    if (!response.ok) throw new Error('Status check failed');
    return await response.json();
  } catch (error) {
    console.warn("Backend status check failed:", error);
    // Default to false safety if server is unreachable
    return { status: 'offline' };
  }
};

export const fetchVideoInfo = async (url: string, mode: 'video' | 'playlist' = 'video', platform: string = 'youtube', lang: any = 'en'): Promise<ApiResponse> => {
  if (!url) throw new Error(getErrorMsg('invalidUrl', lang));
  const lowerUrl = url.toLowerCase();

  // Strict Platform Validation to ensure we don't fetch other sites' links
  if (platform === 'youtube') {
    if (!lowerUrl.includes('youtube.com') && !lowerUrl.includes('youtu.be')) {
       // Only allow if auto-detect hasn't switched yet, but usually SearchInput handles this.
       // We allow it to pass if it looks like a generic URL, but prefer specific validation.
    }
    
    const isPlaylistUrl = url.includes('list=');
    if (mode === 'video' && isPlaylistUrl) {
      throw new Error(getErrorMsg('playlistInVideo', lang));
    }
    if (mode === 'playlist' && !isPlaylistUrl) {
      throw new Error(getErrorMsg('videoInPlaylist', lang));
    }
  } else if (platform === 'facebook') {
    if (!lowerUrl.includes('facebook.com') && !lowerUrl.includes('fb.watch') && !lowerUrl.includes('fb.com')) {
       throw new Error("Invalid Facebook URL. Please check the link.");
    }
  } else if (platform === 'instagram') {
    if (!lowerUrl.includes('instagram.com')) {
       throw new Error("Invalid Instagram URL. Please check the link.");
    }
  } else if (platform === 'tiktok') {
    if (!lowerUrl.includes('tiktok.com')) {
       throw new Error("Invalid TikTok URL. Please check the link.");
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, type: mode, platform }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to fetch video info');
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    console.error("API Error:", err);
    if (err.message === 'Failed to fetch') {
      throw new Error(getErrorMsg('backendError', lang));
    }
    throw err;
  }
};

export const getDownloadLink = (url: string, format: DownloadFormat, quality: DownloadQuality, platform: string = 'youtube'): string => {
  // Construct the backend download URL
  // format is 'mp4' or 'mp3'
  // quality is the format_id from the backend (e.g., '137+140' or 'best')
  const params = new URLSearchParams({
    url: url,
    format_id: quality, // We pass the format_id as 'quality'
    ext: format,
    platform: platform
  });
  return `${API_BASE_URL}/download?${params.toString()}`;
};