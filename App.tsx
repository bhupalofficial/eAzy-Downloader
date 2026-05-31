import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { SearchInput } from './components/SearchInput';
import { SettingsBar } from './components/SettingsBar';
import { VideoCard } from './components/VideoCard';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';
import { Sitemap } from './components/Sitemap';
import { AboutUs } from './components/AboutUs';
import { ScrollToTop } from './components/ScrollToTop';
import { fetchVideoInfo, checkServerStatus, getDownloadLink } from './services/api';
import { ApiResponse, DownloadFormat, DownloadQuality, ServerStatus, Video, QueueItem } from './types';
import { ListVideo, AlertCircle, Check, Download, Loader2 } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { DownloadQueue } from './components/DownloadQueue';

type ViewState = 'home' | 'privacy' | 'terms' | 'sitemap' | 'about';

const getPlaylistTranslation = (lang: string) => {
  const dicts: Record<string, any> = {
    en: {
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      downloadSelected: 'Download Selected',
      selected: 'selected',
      downloadingQueue: 'Downloading {current} of {total}...',
    },
    es: {
      selectAll: 'Seleccionar todo',
      deselectAll: 'Deseleccionar todo',
      downloadSelected: 'Descargar seleccionados',
      selected: 'seleccionados',
      downloadingQueue: 'Descargando {current} de {total}...',
    },
    pt: {
      selectAll: 'Selecionar tudo',
      deselectAll: 'Desmarcar tudo',
      downloadSelected: 'Baixar selecionados',
      selected: 'selecionados',
      downloadingQueue: 'Baixando {current} de {total}...',
    },
    fr: {
      selectAll: 'Tout sélectionner',
      deselectAll: 'Tout désélectionner',
      downloadSelected: 'Télécharger la sélection',
      selected: 'sélectionnés',
      downloadingQueue: 'Téléchargement {current} sur {total}...',
    },
    de: {
      selectAll: 'Alles auswählen',
      deselectAll: 'Alles abwählen',
      downloadSelected: 'Auswahl herunterladen',
      selected: 'ausgewählt',
      downloadingQueue: 'Herunterladen {current} von {total}...',
    },
    hi: {
      selectAll: 'सभी चुनें',
      deselectAll: 'सभी अचयनित करें',
      downloadSelected: 'चयनित डाउनलोड करें',
      selected: 'चयनित',
      downloadingQueue: '{total} में से {current} डाउनलोड हो रहा है...',
    },
    ne: {
      selectAll: 'सबै चयन गर्नुहोस्',
      deselectAll: 'सबै अचयन गर्नुहोस्',
      downloadSelected: 'चयनित डाउनलोड गर्नुहोस्',
      selected: 'चयनित',
      downloadingQueue: '{total} मध्ये {current} डाउनलोड हुँदैछ...',
    }
  };
  return dicts[lang] || dicts['en'];
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { language, t } = useLanguage();
  
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activePlatform, setActivePlatform] = useState('youtube');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [format, setFormat] = useState<DownloadFormat>('mp3');
  const [quality, setQuality] = useState<DownloadQuality>('best');

  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [concurrency, setConcurrency] = useState<number>(2);
  const abortControllers = useRef<{ [itemId: string]: AbortController }>({});

  const playlistTranslations = getPlaylistTranslation(language);

  const handleToggleSelectAll = () => {
    if (!data || !data.videos) return;
    if (selectedUrls.length === data.videos.length) {
      setSelectedUrls([]);
    } else {
      setSelectedUrls(data.videos.map((v: Video) => v.url));
    }
  };

  const handleSelectToggle = (videoUrl: string) => {
    setSelectedUrls((prev: string[]) => {
      if (prev.includes(videoUrl)) {
        return prev.filter((url: string) => url !== videoUrl);
      } else {
        return [...prev, videoUrl];
      }
    });
  };

  // Main Background Queue Scheduler Loop
  useEffect(() => {
    const active = queue.filter(item => item.status === 'downloading');
    const queued = queue.filter(item => item.status === 'queued');
    
    if (active.length < concurrency && queued.length > 0) {
      const slotsToFill = concurrency - active.length;
      const itemsToStart = queued.slice(0, slotsToFill);
      
      // Lock status immediately to downloading in state to prevent double execution
      setQueue(prev => prev.map(item => {
        if (itemsToStart.some(its => its.id === item.id)) {
          return { ...item, status: 'downloading', progress: 0 };
        }
        return item;
      }));
      
      // Execute the async download threads
      itemsToStart.forEach(item => {
        executeDownload(item.id, item.url, item.title, item.format, item.quality, item.platform);
      });
    }
  }, [queue, concurrency]);

  const executeDownload = async (id: string, url: string, title: string, itemFormat: DownloadFormat, itemQuality: DownloadQuality, itemPlatform: string) => {
    const controller = new AbortController();
    abortControllers.current[id] = controller;
    
    try {
      const dlUrl = getDownloadLink(url, itemFormat, itemQuality, itemPlatform);
      const response = await fetch(dlUrl, { signal: controller.signal });
      if (!response.ok) {
        let errorMsg = "Could not download. Connection failed.";
        try {
          const errData = await response.json();
          if (errData?.detail) errorMsg = errData.detail;
        } catch {}
        throw new Error(errorMsg);
      }
      
      const contentLengthHeader = response.headers.get('content-length');
      const totalBytes = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;
      let blob: Blob;
      
      if (totalBytes > 0 && response.body) {
        const reader = response.body.getReader();
        let receivedBytes = 0;
        const chunks: Uint8Array[] = [];
        let lastUpdate = Date.now();
        
        while (true) {
          if (controller.signal.aborted) {
            await reader.cancel();
            throw new DOMException('The user aborted a request.', 'AbortError');
          }
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            receivedBytes += value.length;
            const pct = Math.min(99, Math.round((receivedBytes / totalBytes) * 100));
            
            // Throttle state updates slightly (max once per 120ms) to ensure smooth frames
            const now = Date.now();
            if (now - lastUpdate > 120 || pct === 99) {
              setQueue(prev => prev.map(item => 
                item.id === id ? { ...item, progress: pct } : item
              ));
              lastUpdate = now;
            }
          }
        }
        
        blob = new Blob(chunks as BlobPart[], { type: response.headers.get('content-type') || undefined });
      } else {
        if (controller.signal.aborted) {
          throw new DOMException('The user aborted a request.', 'AbortError');
        }
        // Fallback for missing Content-Length header - read stream as buffer or dynamic progress emulation
        blob = await response.blob();
      }
      
      const contentDisposition = response.headers.get('content-disposition');
      let filename = `${title || 'video'}.${itemFormat}`;
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
      
      setQueue(prev => prev.map(item => 
        item.id === id ? { ...item, status: 'completed', progress: 100 } : item
      ));
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log(`Download stopped by user: ${title}`);
        setQueue(prev => prev.map(item => 
          item.id === id ? { ...item, status: 'failed', error: 'Stopped' } : item
        ));
      } else {
        console.error(`Download thread failed for ${title}:`, err);
        setQueue(prev => prev.map(item => 
          item.id === id ? { ...item, status: 'failed', error: err.message || "Network Error" } : item
        ));
      }
    } finally {
      delete abortControllers.current[id];
    }
  };

  const handleStopItem = (id: string) => {
    const controller = abortControllers.current[id];
    if (controller) {
      controller.abort();
      delete abortControllers.current[id];
    }
    setQueue(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'failed', error: 'Stopped' } : item
    ));
  };

  const handleStopAll = () => {
    Object.keys(abortControllers.current).forEach(id => {
      abortControllers.current[id].abort();
    });
    abortControllers.current = {};
    setQueue(prev => prev.map(item => 
      (item.status === 'downloading' || item.status === 'queued') 
        ? { ...item, status: 'failed', error: 'Stopped' } 
        : item
    ));
  };

  const handleBulkDownload = () => {
    if (selectedUrls.length === 0) return;
    
    // Convert selected videos to new queue items
    const videosToDownload = data?.videos?.filter((v: Video) => selectedUrls.includes(v.url)) || [];
    
    const newItems: QueueItem[] = videosToDownload.map(video => ({
      id: `${video.id || video.url}-${format}-${quality}`, // unique key to allow download of different format combo
      title: video.title,
      thumbnail: video.thumbnail || '',
      url: video.url,
      status: 'queued',
      progress: 0,
      format: format,
      quality: quality,
      platform: activePlatform
    }));
    
    setQueue(prev => {
      // Clean duplicate ids in queue to avoid duplicate streams running
      const filteredPrev = prev.filter(item => !newItems.some(n => n.id === item.id));
      return [...filteredPrev, ...newItems];
    });
  };

  const handleSingleDownload = (url: string, title: string, thumbnail: string) => {
    const itemId = `${url}-${format}-${quality}`;
    const newItem: QueueItem = {
      id: itemId,
      title,
      thumbnail,
      url,
      status: 'queued',
      progress: 0,
      format,
      quality,
      platform: activePlatform
    };

    setQueue(prev => {
      const filteredPrev = prev.filter(item => item.id !== itemId);
      return [...filteredPrev, newItem];
    });
  };

  const handleRetryItem = (id: string) => {
    setQueue(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'queued', progress: 0, error: undefined } : item
    ));
  };

  const handleRetryAllFailed = () => {
    setQueue(prev => prev.map(item => 
      item.status === 'failed' ? { ...item, status: 'queued', progress: 0, error: undefined } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCompleted = () => {
    setQueue(prev => prev.filter(item => item.status !== 'completed'));
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle format change (Video/Audio)
  const handleFormatChange = (newFormat: DownloadFormat) => {
    setFormat(newFormat);
    
    // Immediately update quality to the best available option (highest quality)
    // The backend sorts formats by quality descending, so index 0 is best.
    if (data) {
        let bestQuality = 'best';
        if (newFormat === 'mp4' && data.formats && data.formats.length > 0) {
            bestQuality = data.formats[0].format_id;
        } else if ((newFormat === 'mp3' || newFormat === 'm4a') && data.audio_formats && data.audio_formats.length > 0) {
            bestQuality = 'bestaudio/best';
        }
        setQuality(bestQuality);
    }
  };

  // Initial Quality Set when Data loads
  useEffect(() => {
    if (data) {
      if (format === 'mp4' && data.formats && data.formats.length > 0) {
        // Default to highest video quality
        setQuality(data.formats[0].format_id);
      } else if ((format === 'mp3' || format === 'm4a') && data.audio_formats && data.audio_formats.length > 0) {
        // Default to highest audio quality
        setQuality('bestaudio/best');
      }
    }
  }, [data]); 

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleSearch = async (url: string, mode: 'video' | 'playlist', platformOverride?: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    setSelectedUrls([]);
    
    const platformToUse = platformOverride || activePlatform;

    // If we have an override that differs, update state to match visual UI
    if (platformOverride && platformOverride !== activePlatform) {
        setActivePlatform(platformOverride);
        if (platformOverride !== 'youtube') {
            setFormat('mp4');
        } else {
            setFormat('mp3');
        }
    }

    try {
      const result = await fetchVideoInfo(url, mode, platformToUse, language);
      setData(result);
      if (result.type === 'playlist' && result.videos) {
        setSelectedUrls(result.videos.map(v => v.url));
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = () => {
    setData(null);
    setError(null);
    setSelectedUrls([]);
  };

  const handlePlatformSelect = (platform: string) => {
    setActivePlatform(platform);
    setData(null);
    setError(null);
    setSelectedUrls([]);
    // Reset format based on platform
    if (platform === 'youtube') {
      setFormat('mp3');
    } else {
      setFormat('mp4');
    }
  };

  const getHeroContent = () => {
    switch (activePlatform) {
      case 'facebook':
        return {
          title: t.hero.facebookTitle,
          desc: t.hero.facebookDesc
        };
      case 'instagram':
        return {
          title: t.hero.instagramTitle,
          desc: t.hero.instagramDesc
        };
      case 'tiktok':
        return {
          title: t.hero.tiktokTitle,
          desc: t.hero.tiktokDesc
        };
      case 'universal':
        return {
          title: t.hero.universalTitle,
          desc: t.hero.universalDesc
        };
      case 'youtube':
      default:
        return {
          title: t.hero.youtubeTitle,
          desc: t.hero.youtubeDesc
        };
    }
  };

  const heroContent = getHeroContent();

  const handleHomeNavigation = () => {
    setCurrentView('home');
    setActivePlatform('youtube');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'privacy':
        return <PrivacyPolicy onBack={() => setCurrentView('home')} />;
      case 'terms':
        return <TermsConditions onBack={() => setCurrentView('home')} />;
      case 'about':
        return <AboutUs onBack={() => setCurrentView('home')} />;
      case 'sitemap':
        return (
          <Sitemap 
            onBack={() => setCurrentView('home')} 
            onSelectPlatform={handlePlatformSelect}
            onPrivacyClick={() => setCurrentView('privacy')}
            onTermsClick={() => setCurrentView('terms')}
          />
        );
      default:
        return (
          <>
            <NavBar activePlatform={activePlatform} onSelect={handlePlatformSelect} />
            
            <section className="flex flex-col gap-6 w-full max-w-3xl animate-fade-in">
              <div className="text-center space-y-2 mb-2">
                 <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                   {heroContent.title}
                 </h2>
                 <p className="text-gray-500 dark:text-gray-400 text-lg">
                   {heroContent.desc}
                 </p>
              </div>
              
              <SearchInput 
                onSearch={handleSearch} 
                onModeChange={handleModeChange}
                isLoading={loading} 
                platform={activePlatform}
                onPlatformChange={handlePlatformSelect}
              />
            </section>

            {/* Visual Animated Download Queue and Progress Tickers */}
            <div className="w-full max-w-3xl animate-fade-in flex flex-col gap-4">
              <DownloadQueue 
                queue={queue} 
                onRetry={handleRetryItem} 
                onRetryAll={handleRetryAllFailed} 
                onRemove={handleRemoveItem} 
                onClearCompleted={handleClearCompleted} 
                concurrency={concurrency}
                onConcurrencyChange={setConcurrency}
                onStop={handleStopItem}
                onStopAll={handleStopAll}
              />
            </div>

            {error && (
              <div className="w-full max-w-3xl animate-fade-in p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-200">
                <AlertCircle className="flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {data && (
              <section className="w-full max-w-3xl animate-fade-in flex flex-col gap-6">
                
                <div className="sticky top-4 z-20">
                  <SettingsBar 
                    format={format} 
                    quality={quality} 
                    onFormatChange={handleFormatChange} 
                    setQuality={setQuality}
                    onClear={() => setData(null)}
                    platform={activePlatform}
                    availableFormats={data.formats}
                    availableAudioFormats={data.audio_formats}
                  />
                </div>

                {data.type === 'playlist' && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-2xl shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                          <ListVideo size={24} />
                        </div>
                        <div>
                          <h2 className="font-bold text-lg leading-tight">{data.title}</h2>
                          <p className="text-blue-100 text-sm font-medium mt-1">
                            {data.videos?.length || 0} {t.card.videosFound}
                          </p>
                        </div>
                      </div>
                    </div>

                    {data.videos && data.videos.length > 0 && (
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={handleToggleSelectAll}
                            className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            {selectedUrls.length === data.videos.length
                              ? playlistTranslations.deselectAll
                              : playlistTranslations.selectAll}
                          </button>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedUrls.length} {playlistTranslations.selected}
                          </span>
                        </div>

                        <button
                          onClick={handleBulkDownload}
                          disabled={selectedUrls.length === 0}
                          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                          <Download size={16} strokeWidth={2.5} />
                          <span>
                            {playlistTranslations.downloadSelected} ({selectedUrls.length})
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid gap-4 pb-4">
                  {data.type === 'video' ? (
                    (() => {
                      const matchingSingleItem = queue.find(
                        item => item.url === data.url && item.format === format && item.quality === quality
                      );
                      return (
                        <VideoCard 
                          title={data.title}
                          thumbnail={data.thumbnail || ''}
                          url={data.url || ''}
                          format={format}
                          quality={quality}
                          platform={activePlatform}
                          isDownloadingInQueue={queue.some(item => item.url === data.url && (item.status === 'queued' || item.status === 'downloading'))}
                          queueStatus={matchingSingleItem?.status}
                          queueProgress={matchingSingleItem?.progress}
                          onRetryQueue={() => matchingSingleItem && handleRetryItem(matchingSingleItem.id)}
                          onDownloadClick={() => handleSingleDownload(data.url || '', data.title, data.thumbnail || '')}
                          onStopQueue={() => matchingSingleItem && handleStopItem(matchingSingleItem.id)}
                        />
                      );
                    })()
                  ) : (
                    data.videos?.map((video) => {
                      const matchingQueueItem = queue.find(
                        item => item.url === video.url && item.format === format && item.quality === quality
                      );
                      return (
                        <VideoCard 
                          key={video.id}
                          title={video.title}
                          thumbnail={video.thumbnail}
                          url={video.url}
                          duration={video.duration}
                          format={format}
                          quality={quality}
                          isPlaylist={true}
                          platform={activePlatform}
                          isSelected={selectedUrls.includes(video.url)}
                          onSelectToggle={() => handleSelectToggle(video.url)}
                          isDownloadingInQueue={queue.some(item => item.url === video.url && (item.status === 'queued' || item.status === 'downloading'))}
                          queueStatus={matchingQueueItem?.status}
                          queueProgress={matchingQueueItem?.progress}
                          onRetryQueue={() => matchingQueueItem && handleRetryItem(matchingQueueItem.id)}
                          onDownloadClick={() => handleSingleDownload(video.url, video.title, video.thumbnail || '')}
                          onStopQueue={() => matchingQueueItem && handleStopItem(matchingQueueItem.id)}
                        />
                      );
                    })
                  )}
                </div>

                {data.type === 'video' && data.metadata && (
                  <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200/60 dark:border-gray-800 shadow-xl text-left space-y-6 animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-4 py-2 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 rounded-bl-3xl flex items-center gap-1.5 font-extrabold text-xs tracking-wider uppercase">
                      ✨ Auto-Embedded Info
                    </div>
                    
                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                      🎵 Song & Track Metadata
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50/70 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase block tracking-wider mb-1">Artist / Creator</span>
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{data.metadata.artist || 'Unknown'}</span>
                      </div>
                      <div className="p-4 bg-gray-50/70 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase block tracking-wider mb-1">Album / Collection</span>
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{data.metadata.album || 'Single'}</span>
                      </div>
                      <div className="p-4 bg-gray-50/70 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                        <span className="text-xs text-gray-400 dark:text-gray-400 font-bold uppercase block tracking-wider mb-1">Release Date</span>
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{data.metadata.release_date || 'Unknown'}</span>
                      </div>
                    </div>

                    {data.metadata.lyrics && data.metadata.lyrics !== "Lyrics not found for this track." ? (
                      <div className="space-y-3 pt-2">
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase block tracking-wider">🎙️ Track Lyrics (Auto-Embedded)</span>
                        <div className="p-5 bg-gray-50/40 dark:bg-gray-950/10 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 max-h-72 overflow-y-auto whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300 font-medium font-sans leading-relaxed shadow-inner">
                          {data.metadata.lyrics}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 dark:text-gray-500 italic mt-1 bg-gray-50/30 dark:bg-gray-800/20 p-3 rounded-xl border border-dashed border-gray-100 dark:border-gray-800">
                        ℹ️ Metadata is extracted directly from the video locally without querying any external third-party servers. If a lyrics tag or a description transcript is available within the media's local data, we parse and embed it inside your downloaded audio file automatically.
                      </div>
                    )}
                  </div>
                )}

              </section>
            )}

            {!data && (
              <div className="w-full max-w-3xl mt-12 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl text-left space-y-8 animate-fade-in">
                {/* Section 1: Guide */}
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-brand-500 rounded-full"></span>
                    💡 How to Download Video & Audio
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                      <div className="text-brand-500 dark:text-brand-400 font-extrabold text-lg mb-1">Step 1</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Copy the URL of your media from YouTube, TikTok, Facebook, or Instagram.</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                      <div className="text-brand-500 dark:text-brand-400 font-extrabold text-lg mb-1">Step 2</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Paste the copied link in our search box above and hit the <strong>Get</strong> button.</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                      <div className="text-brand-500 dark:text-brand-400 font-extrabold text-lg mb-1">Step 3</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Choose your preferred quality and format and begin your download seamlessly.</p>
                    </div>
                  </div>
                </section>

                <hr className="border-gray-100 dark:border-gray-800" />

                {/* Section 2: Key Features */}
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-brand-500 rounded-full"></span>
                    ⚡ Key Features of eAzy Downloader
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6 list-none p-0 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✔</span>
                      <span><strong>High-Quality MP3</strong>: Convert any YouTube playlist or video directly into high-fidelity music with automatic album art embedding.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✔</span>
                      <span><strong>Universal Device Playback</strong>: Auto-re-encodes TikTok downloads into H.264/AAC standard format so they play perfectly on mobile, web, and Windows Media Player.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✔</span>
                      <span><strong>No Watermarks</strong>: Download clean, pristine social media videos instantly without watermarks or text overlays.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✔</span>
                      <span><strong>Free & Clean Site</strong>: Safe, private, and lightning fast. No registration required, combined with auto-wiping disk space.</span>
                    </li>
                  </ul>
                </section>

                <hr className="border-gray-100 dark:border-gray-800" />

                {/* Section 3: FAQ */}
                <section className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-brand-500 rounded-full"></span>
                    🙋 Frequently Asked Questions (FAQ)
                  </h2>
                  <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 dark:text-white text-base">Is there any limit or charge for downloads?</h4>
                      <p>No, eAzy Downloader is 100% free and has no premium caps or daily search limits. No registration or software downloads are needed.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 dark:text-white text-base">Why do TikTok downloaded videos sometimes fail to play?</h4>
                      <p>TikTok video files from other sources often package audio track streams or custom pixel groupings that are unreadable by standard media software like Apple QuickTime or Windows Media Player. eAzy Downloader solves this by auto-converting downloads into standard H.264 MP4 with AAC audio track, making it compatible with any offline player.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 dark:text-white text-base">Which audio options are available?</h4>
                      <p>Audio downloads (MP3, M4A) are fully optimized for our YouTube downloader, while video platforms (TikTok, Instagram, Facebook) download pristine, highly compatible MP4 video tracks directly.</p>
                    </div>
                  </div>
                </section>

                <section className="bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/20 p-4 rounded-2xl text-xs text-gray-500 dark:text-gray-400">
                  <strong>Disclaimer</strong>: Please respect copyright policies. eAzy Downloader does not host or store any copyright-restricted media on its servers and only indexes publicly accessible streams from social platforms.
                </section>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 max-w-screen-xl mx-auto font-sans selection:bg-brand-500/30">
      <ScrollToTop />
      
      <Header 
        darkMode={darkMode} 
        toggleTheme={toggleTheme} 
        onHomeClick={handleHomeNavigation}
      />

      <main className="w-full flex flex-col items-center gap-6 flex-1">
        {renderContent()}
      </main>

      <Footer 
        onPrivacyClick={() => setCurrentView('privacy')}
        onTermsClick={() => setCurrentView('terms')}
        onHomeClick={handleHomeNavigation}
        onSitemapClick={() => setCurrentView('sitemap')}
        onAboutClick={() => setCurrentView('about')}
      />
    </div>
  );
}

export default App;