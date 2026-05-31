import React from 'react';
import { FileAudio, FileVideo, SlidersHorizontal, Mic2, Trash2, MonitorPlay } from 'lucide-react';
import { DownloadFormat, DownloadQuality, VideoFormat } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SettingsBarProps {
  format: DownloadFormat;
  quality: DownloadQuality;
  onFormatChange: (f: DownloadFormat) => void;
  setQuality: (q: DownloadQuality) => void;
  onClear?: () => void;
  platform?: string;
  availableFormats?: VideoFormat[];
  availableAudioFormats?: VideoFormat[];
}

// Standardized YouTube Video Options (Used for Single Video & Playlist fallback)
// The backend now supports these abstract IDs dynamically
const YOUTUBE_VIDEO_OPTIONS: VideoFormat[] = [
  { format_id: '2160p', resolution: '2160p', ext: 'mp4', note: '4K Ultra HD' },
  { format_id: '1440p', resolution: '1440p', ext: 'mp4', note: '2K QHD' },
  { format_id: '1080p', resolution: '1080p', ext: 'mp4', note: 'Full HD' },
  { format_id: '720p', resolution: '720p', ext: 'mp4', note: 'HD' },
  { format_id: '480p', resolution: '480p', ext: 'mp4', note: 'Standard' },
  { format_id: '360p', resolution: '360p', ext: 'mp4', note: 'Data Saver' },
];

const YOUTUBE_AUDIO_OPTIONS: VideoFormat[] = [
  { format_id: '320', resolution: 'High Quality', ext: 'mp3', note: '320kbps' },
  { format_id: '256', resolution: 'Good Quality', ext: 'mp3', note: '256kbps' },
  { format_id: '192', resolution: 'Standard', ext: 'mp3', note: '192kbps' },
  { format_id: '128', resolution: 'Low Data', ext: 'mp3', note: '128kbps' },
];

export const SettingsBar: React.FC<SettingsBarProps> = ({ 
  format, 
  quality, 
  onFormatChange, 
  setQuality, 
  onClear,
  platform = 'youtube',
  availableFormats = [],
  availableAudioFormats = []
}) => {
  const { t } = useLanguage();
  
  // --- OPTION LOGIC ---
  let currentOptions: VideoFormat[] = [];

  if (platform === 'youtube') {
      // For YouTube, we prioritize downloading high-quality Audio in either MP3 or M4A formats as requested
      currentOptions = format === 'm4a' 
        ? [{ format_id: 'bestaudio/best', resolution: 'Audio', ext: 'm4a', note: 'Best M4A Audio' }]
        : [{ format_id: 'bestaudio/best', resolution: 'Audio', ext: 'mp3', note: 'Best MP3 Audio' }];
  } else {
      // Non-YouTube (FB, TikTok, etc) - Use the specific formats returned by the API
      // These usually just need HD / SD distinction
      currentOptions = format === 'mp4' ? availableFormats : availableAudioFormats;
      if (!currentOptions || currentOptions.length === 0) {
          currentOptions = [{ format_id: 'best', resolution: 'Best Available', ext: 'mp4', note: 'Auto' }];
      }
  }

  // Ensure selected quality is valid
  const isQualityInOptions = currentOptions.some(opt => opt.format_id === quality);
  // Default to best (first option) if current selection is invalid
  const displayQuality = isQualityInOptions ? quality : (currentOptions.length > 0 ? currentOptions[0].format_id : 'best');


  // --- LABEL GENERATOR ---
  const getLabel = (fmt: VideoFormat) => {
    // YouTube Audio
    if (platform === 'youtube' && (format === 'mp3' || format === 'm4a')) {
        return format === 'mp3' ? '🎵 Best MP3 Audio' : '🎼 Best M4A Audio';
    }

    // YouTube Video
    if (platform === 'youtube' && format === 'mp4') {
        const res = fmt.resolution;
        if (res === '2160p') return '🌟 4K Ultra HD';
        if (res === '1440p') return '✨ 2K Quad HD';
        if (res === '1080p') return '💎 Full HD (1080p)';
        if (res === '720p') return '🔵 HD (720p)';
        if (res === '480p') return '📺 Standard (480p)';
        if (res === '360p') return '📱 Data Saver (360p)';
        return res;
    }

    // Non-YouTube
    const res = fmt.resolution || '';
    const note = fmt.note || '';
    
    if (res === 'HD' || note === 'HD') return '🌟 High Definition (HD)';
    if (res === 'SD' || note === 'SD') return '📱 Standard Definition (SD)';
    
    return `${res || 'Best'} ${note && note !== res ? `(${note})` : ''}`;
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col lg:flex-row gap-4 lg:gap-6 justify-between items-center animate-fade-in transition-all">
      
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 self-start lg:self-auto min-w-[100px]">
        <SlidersHorizontal size={20} />
        <span className="font-medium text-sm uppercase tracking-wider">{t.settings.config}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto">
        
        {/* Format Selector */}
        {platform === 'youtube' && (
          <div className="flex flex-col gap-1.5 w-full sm:w-[180px]">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase flex items-center justify-between">
              {t.settings.format}
            </label>
            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg w-full h-[40px]">
              <button
                type="button"
                onClick={() => onFormatChange('mp3')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all ${
                  format === 'mp3' 
                    ? 'bg-white dark:bg-gray-600 text-brand-600 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <FileAudio size={16} />
                <span>MP3</span>
              </button>
              
              <button
                type="button"
                onClick={() => onFormatChange('m4a')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all ${
                  format === 'm4a' 
                    ? 'bg-white dark:bg-gray-600 text-brand-600 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <FileAudio size={16} />
                <span>M4A</span>
              </button>
            </div>
          </div>
        )}

        {/* Quality Selector */}
        <div className="flex flex-col gap-1.5 w-full sm:w-[260px]">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            {(format === 'mp3' || format === 'm4a') ? t.settings.bitrate : t.settings.quality}
          </label>
          
          <div className="relative w-full h-[40px]">
            {(format === 'mp3' || format === 'm4a') && (
              <Mic2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
            )}
            {format === 'mp4' && (
              <MonitorPlay size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
            )}
            
            <select
              value={displayQuality}
              onChange={(e) => setQuality(e.target.value as DownloadQuality)}
              className={`w-full h-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium pr-8 rounded-lg border-r-8 border-transparent outline-none focus:ring-2 focus:ring-brand-500/50 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors appearance-none ${format === 'mp3' || format === 'm4a' || format === 'mp4' ? 'pl-10' : 'pl-4'}`}
            >
              {currentOptions.length > 0 ? (
                currentOptions.map((fmt) => (
                  <option key={fmt.format_id} value={fmt.format_id} className="py-2">
                    {getLabel(fmt)}
                  </option>
                ))
              ) : (
                <option value="best">Best Available</option>
              )}
            </select>
            
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
               <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </div>
        </div>

        {onClear && (
            <>
                <div className="hidden lg:block w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2"></div>
                <button
                    onClick={onClear}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-lg transition-all font-medium text-sm group w-full lg:w-auto justify-center h-[40px] mt-auto lg:mt-0"
                    title={t.settings.clearAll}
                >
                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                    <span>{t.settings.clearAll}</span>
                </button>
            </>
        )}
      </div>
    </div>
  );
};