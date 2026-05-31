
import React, { useState } from 'react';
import { Download, Play, Clock, Loader2, Check, RefreshCw, Square, Clipboard } from 'lucide-react';
import { getDownloadLink } from '../services/api';
import { DownloadFormat, DownloadQuality } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  url: string; 
  duration?: number; 
  format: DownloadFormat;
  quality: DownloadQuality;
  isPlaylist?: boolean;
  platform: string;
  isSelected?: boolean;
  onSelectToggle?: () => void;
  isDownloadingInQueue?: boolean;
  queueStatus?: 'queued' | 'downloading' | 'completed' | 'failed' | null;
  queueProgress?: number;
  onRetryQueue?: () => void;
  onDownloadClick?: () => void;
  onStopQueue?: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ 
  title, 
  thumbnail, 
  url, 
  duration, 
  format, 
  quality,
  isPlaylist = false,
  platform,
  isSelected = false,
  onSelectToggle,
  isDownloadingInQueue = false,
  queueStatus = null,
  queueProgress = 0,
  onRetryQueue,
  onDownloadClick,
  onStopQueue
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy link", err);
    }
  };

  const renderActionButton = () => {
    if (queueStatus) {
      if (queueStatus === 'completed') {
        return (
          <div className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 border border-green-200 dark:border-green-800/50 px-6 py-3 rounded-xl font-bold animate-fade-in">
            <Check size={18} className="stroke-[3px]" />
            <span>Success!</span>
          </div>
        );
      }
      if (queueStatus === 'failed') {
        return (
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 animate-fade-in">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onRetryQueue) onRetryQueue();
              }}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm"
            >
              <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-500" />
              <span>Retry</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all border text-sm ${
                copied 
                  ? 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 border-green-200 dark:border-green-800/50' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
              title="Copy link to download in Single Mode"
            >
              <Clipboard size={14} className={copied ? 'text-green-500' : ''} />
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        );
      }
      if (queueStatus === 'downloading') {
        return (
          <div className="w-full md:w-auto flex flex-col justify-center gap-1.5 min-w-[140px] animate-fade-in">
            <div className="flex items-center justify-between gap-3 py-1.5 text-blue-600 dark:text-blue-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Loader2 size={18} className="animate-spin" />
                <span>{queueProgress !== undefined ? `${queueProgress}%` : 'Downloading'}</span>
              </span>
              {onStopQueue && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStopQueue();
                  }}
                  className="p-1 rounded-md bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 pb-1 flex items-center justify-center transition-colors shadow-sm"
                  title="Stop Download"
                >
                  <Square size={10} className="fill-current" />
                </button>
              )}
            </div>
            {queueProgress !== undefined && (
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300" 
                  style={{ width: `${queueProgress}%` }}
                />
              </div>
            )}
          </div>
        );
      }
      if (queueStatus === 'queued') {
        return (
          <div className="w-full md:w-auto flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700/30 px-6 py-3 rounded-xl font-bold animate-fade-in">
            <Loader2 size={18} className="animate-spin text-gray-400" />
            <span>Queued...</span>
          </div>
        );
      }
    }

    return (
      <button
        onClick={handleDownload}
        disabled={isDownloading || isDownloadingInQueue}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-gray-900 dark:bg-white hover:bg-brand-600 dark:hover:bg-brand-500 text-white dark:text-black hover:text-white dark:hover:text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-gray-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
      >
        {isDownloading || isDownloadingInQueue ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>{isDownloadingInQueue ? 'Queued...' : t.card.starting}</span>
          </>
        ) : (
          <>
            <Download size={18} strokeWidth={2.5} />
            <span>{t.card.download}</span>
          </>
        )}
      </button>
    );
  };

  
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownloadClick) {
      onDownloadClick();
      return;
    }
    
    setIsDownloading(true);
    const downloadUrl = getDownloadLink(url, format, quality, platform);
    
    try {
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }
      
      const blob = await response.blob();
      
      // Determine the filename from the Content-Disposition header if available
      const contentDisposition = response.headers.get('content-disposition');
      let filename = `${title || 'video'}.${format}`;
      if (contentDisposition) {
        const matchStar = contentDisposition.match(/filename\*=utf-8''([^;\n]+)/i);
        const matchStd = contentDisposition.match(/filename="?([^";\n]+)"?/i);
        if (matchStar && matchStar[1]) {
          filename = decodeURIComponent(matchStar[1]);
        } else if (matchStd && matchStd[1]) {
          filename = decodeURIComponent(matchStd[1]);
        }
      }
      
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.warn("Blob fetch failed, falling back to direct navigation download:", err);
      // Fallback to traditional direct navigation download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formattedDuration = formatDuration(duration);

  return (
    <div 
      onClick={() => isPlaylist && onSelectToggle && onSelectToggle()}
      className={`group bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4 shadow-md hover:shadow-xl border transition-all duration-300 flex flex-col md:flex-row gap-4 md:items-center ${
        isPlaylist && isSelected 
          ? 'border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/5 dark:bg-blue-500/5' 
          : 'border-gray-100 dark:border-gray-700'
      } ${isPlaylist && onSelectToggle ? 'cursor-pointer' : ''}`}
    >
      {isPlaylist && onSelectToggle && (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onSelectToggle();
          }}
          className="flex items-center justify-center p-1 select-none flex-shrink-0"
        >
          <div
            className={`h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all ${
              isSelected 
                ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500 shadow-sm' 
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 text-transparent bg-white dark:bg-gray-700'
            }`}
          >
            <Check size={14} className="stroke-[3.5px]" />
          </div>
        </div>
      )}

      <div className="relative w-full md:w-48 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-900">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        
        {formattedDuration && (
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
            <Clock size={10} />
            {formattedDuration}
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="bg-red-600/90 p-2 rounded-full text-white shadow-lg backdrop-blur-sm">
             <Play size={20} fill="currentColor" />
           </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={title}>
          {title}
        </h3>
        <div className="flex items-center gap-2">
           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
             {t.card.ready}
           </span>
           {isPlaylist && (
             <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
               {t.card.playlistItem}
             </span>
           )}
        </div>
      </div>

      <div className="flex-shrink-0 pt-2 md:pt-0">
        {renderActionButton()}
      </div>
    </div>
  );
};
