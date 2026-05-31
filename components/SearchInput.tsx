
import React, { useState, useEffect } from 'react';
import { Link2, Loader2, ArrowRight, Video, ListVideo, Clipboard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchInputProps {
  onSearch: (url: string, mode: 'video' | 'playlist', platformOverride?: string) => void;
  onModeChange: () => void;
  isLoading: boolean;
  platform: string;
  onPlatformChange: (platform: string) => void;
}

// Comprehensive Regex patterns for platform detection
const PLATFORM_PATTERNS = {
  youtube: [
    /^(https?:\/\/)?(www\.|m\.|music\.)?youtube\.com\/.+/i,
    /^(https?:\/\/)?youtu\.be\/.+/i,
  ],
  facebook: [
    /^(https?:\/\/)?(www\.|web\.|m\.|touch\.)?facebook\.com\/.+/i,
    /^(https?:\/\/)?fb\.watch\/.+/i,
    /^(https?:\/\/)?fb\.com\/.+/i,
  ],
  instagram: [
    /^(https?:\/\/)?(www\.)?instagram\.com\/.+/i,
  ],
  tiktok: [
    /^(https?:\/\/)?(www\.|vm\.|vt\.|m\.)?tiktok\.com\/.+/i,
  ],
  // Explicit patterns for "Universal" sites to ensure auto-switching works
  universal: [
    /^(https?:\/\/)?(www\.|player\.)?vimeo\.com\/.+/i,
    /^(https?:\/\/)?(www\.|mobile\.)?twitter\.com\/.+/i,
    /^(https?:\/\/)?(www\.)?x\.com\/.+/i,
    /^(https?:\/\/)?(www\.)?dailymotion\.com\/.+/i,
    /^(https?:\/\/)?(www\.)?soundcloud\.com\/.+/i,
    /^(https?:\/\/)?(www\.)?threads\.net\/.+/i,
    /^(https?:\/\/)?(www\.)?twitch\.tv\/.+/i,
    /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i,
    /^(https?:\/\/)?(www\.)?pinterest\.com\/.+/i,
    /^(https?:\/\/)?(www\.)?pin\.it\/.+/i,
    /^(https?:\/\/)?(www\.)?reddit\.com\/.+/i,
  ]
};

export const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch, 
  onModeChange, 
  isLoading, 
  platform,
  onPlatformChange
}) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'video' | 'playlist'>('video');
  const { t } = useLanguage();

  const detectDetails = (val: string) => {
    const trimmedVal = val.trim();
    let targetPlatform = platform; 
    let targetMode = mode;

    if (trimmedVal.length > 5) { // Basic length check
        let detected = false;

        // Iterate through regex patterns to find a match
        for (const [key, patterns] of Object.entries(PLATFORM_PATTERNS)) {
            if (patterns.some(pattern => pattern.test(trimmedVal))) {
                targetPlatform = key;
                detected = true;
                break;
            }
        }

        // If no specific platform detected but starts with http, assume universal fallback
        if (!detected) {
            const isHttp = /^https?:\/\//i.test(trimmedVal);
            if (isHttp) {
                targetPlatform = 'universal';
            }
        }
        
        // Mode detection (Specific for YouTube)
        if (targetPlatform === 'youtube') {
            if (trimmedVal.includes('list=')) {
                targetMode = 'playlist';
            } else {
                targetMode = 'video';
            }
        } else {
            // Reset mode to video for non-youtube platforms
            targetMode = 'video';
        }
    }
    return { targetPlatform, targetMode };
  };

  useEffect(() => {
    if (platform !== 'youtube') {
      setMode('video');
    }
    
    // Only clear input if it looks invalid for the new platform
    if (input) {
        const { targetPlatform } = detectDetails(input);
        // If the input belongs to a different platform than the one selected (and isn't universal fallback), clear it
        if (targetPlatform !== platform && platform !== 'universal') {
             if (targetPlatform !== 'universal') {
                setInput('');
             }
        }
    } else {
        setInput('');
    }
  }, [platform]); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim(), mode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
       onSearch(input.trim(), mode);
    }
  }

  const handleModeSwitch = (newMode: 'video' | 'playlist') => {
    if (mode !== newMode) {
      setMode(newMode);
      onModeChange();
      setInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    const { targetPlatform, targetMode } = detectDetails(val);
    
    if (targetPlatform !== platform) {
        onPlatformChange(targetPlatform);
    }
    if (targetMode !== mode) {
        setMode(targetMode);
        onModeChange();
    }
  };

  const handlePaste = async () => {
    try {
      // Check if clipboard API is available
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        alert("Clipboard access not available. Please paste manually.");
        return;
      }

      const text = await navigator.clipboard.readText();
      if (text) {
        setInput(text);
        const { targetPlatform, targetMode } = detectDetails(text);
        
        if (targetPlatform !== platform) onPlatformChange(targetPlatform);
        if (targetMode !== mode) {
            setMode(targetMode);
            onModeChange();
        }

        // Search immediately with detected settings
        onSearch(text, targetMode, targetPlatform);
      }
    } catch (err) {
      console.warn('Failed to read clipboard', err);
      // Fallback: Just focus input so user can Ctrl+V
      const inputEl = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (inputEl) inputEl.focus();
    }
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  const getPlaceholder = () => {
    switch (platform) {
      case 'facebook': return t.search.pasteFacebook;
      case 'instagram': return t.search.pasteInstagram;
      case 'tiktok': return t.search.pasteTiktok;
      case 'universal': return t.search.pasteUniversal;
      case 'youtube': 
      default:
        return t.search.pasteYoutube;
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {platform === 'youtube' && (
        <div className="flex self-center bg-gray-200 dark:bg-gray-800 p-1 rounded-xl gap-1 transition-all duration-300">
          <button
            type="button"
            onClick={() => handleModeSwitch('video')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              mode === 'video' 
                ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <Video size={16} />
            {t.search.singleVideo}
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('playlist')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              mode === 'playlist' 
                ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <ListVideo size={16} />
            {t.search.playlist}
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full relative z-10">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Link2 className={`h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors ${isLoading ? 'animate-pulse' : ''}`} />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-44 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all shadow-xl shadow-gray-200/50 dark:shadow-black/30"
            placeholder={getPlaceholder()}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={handleInputClick}
            disabled={isLoading}
            required
          />
          
          <div className="absolute inset-y-0 right-2 flex items-center gap-2">
            {!input && (
                <button
                    type="button"
                    onClick={handlePaste}
                    className="flex items-center justify-center p-2 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors bg-gray-100 dark:bg-gray-700/50 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-xl cursor-pointer"
                    title={t.search.paste}
                >
                    <Clipboard size={20} />
                </button>
            )}

            <button
              type="submit"
              disabled={isLoading || !input}
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white px-5 py-2 rounded-xl font-semibold transition-all disabled:cursor-not-allowed shadow-lg shadow-brand-500/30 disabled:shadow-none hover:translate-x-0.5 cursor-pointer disabled:cursor-default"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>{t.search.working}</span>
                </>
              ) : (
                <>
                  <span>{t.search.get}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
