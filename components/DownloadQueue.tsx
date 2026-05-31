import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Loader2, 
  AlertCircle, 
  RefreshCw, 
  Trash2, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Sparkles, 
  Play, 
  Music, 
  Film,
  Square,
  Clipboard
} from 'lucide-react';
import { QueueItem } from '../types';

interface DownloadQueueProps {
  queue: QueueItem[];
  onRetry: (id: string) => void;
  onRetryAll: () => void;
  onRemove: (id: string) => void;
  onClearCompleted: () => void;
  concurrency: number;
  onConcurrencyChange: (val: number) => void;
  onStop?: (id: string) => void;
  onStopAll?: () => void;
}

export const DownloadQueue: React.FC<DownloadQueueProps> = ({
  queue,
  onRetry,
  onRetryAll,
  onRemove,
  onClearCompleted,
  concurrency,
  onConcurrencyChange,
  onStop,
  onStopAll
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = async (id: string, url: string) => {
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
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.warn("Failed to copy link", err);
    }
  };

  if (queue.length === 0) return null;

  // Compute status aggregates
  const total = queue.length;
  const completed = queue.filter(item => item.status === 'completed').length;
  const downloading = queue.filter(item => item.status === 'downloading').length;
  const failed = queue.filter(item => item.status === 'failed').length;
  const inQueue = queue.filter(item => item.status === 'queued').length;

  // Combined progress
  const averageProgress = Math.round(
    queue.reduce((acc, item) => {
      if (item.status === 'completed') return acc + 100;
      if (item.status === 'failed') return acc + 0;
      return acc + (item.progress || 0);
    }, 0) / total
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      id="bulk-download-queue-panel"
      className="w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl border border-blue-500/10 dark:border-blue-400/10 shadow-xl overflow-hidden transition-all duration-300"
    >
      {/* HEADER SECTION */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer select-none hover:bg-gray-50/50 dark:hover:bg-gray-700/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Zap className={`h-5 w-5 ${downloading > 0 ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                Download Queue
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {completed}/{total} Completed
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {downloading > 0 ? `Active: ${downloading} downloading` : 'Idle'} 
              {failed > 0 && ` • ${failed} Failed`}
              {inQueue > 0 && ` • ${inQueue} Pending`}
            </p>
          </div>
        </div>

        {/* PROGRESS SUMMARY AND CONTROLS */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-end" onClick={e => e.stopPropagation()}>
          {/* Concurrency speed control */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 px-2 tracking-wider">
              Speed:
            </span>
            <button
              onClick={() => onConcurrencyChange(1)}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all ${
                concurrency === 1
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="1 download at a time"
            >
              1x
            </button>
            <button
              onClick={() => onConcurrencyChange(2)}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                concurrency === 2
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/15'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="2 concurrent downloads (Fast mode)"
            >
              <Zap size={10} className="fill-current" />
              <span>2x Fast</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-300 transition-colors"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* COMPACT PROGRESS BAR OVERVIEW WHEN COLLAPSED */}
      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700/50 relative overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-r"
          animate={{ width: `${averageProgress}%` }}
          transition={{ duration: 0.4 }}
        />
        {/* Glowing node at current progress bar end */}
        {downloading > 0 && (
          <div 
            className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"
            style={{ left: `${averageProgress - 10}%` }}
          />
        )}
      </div>

      {/* EXPANDABLE LIST CONTAINER */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-gray-100 dark:border-gray-700/50"
          >
            {/* AGGREGATED CONTROLS BAR */}
            <div className="bg-gray-50/50 dark:bg-gray-900/10 px-4 md:px-5 py-3 flex flex-wrap gap-2 items-center justify-between text-xs border-b border-gray-100 dark:border-gray-700/30">
              <span className="text-gray-500 dark:text-gray-400">
                Queued downloads run sequentially to maintain server health and download safety.
              </span>
              <div className="flex items-center gap-2">
                {(downloading > 0 || inQueue > 0) && onStopAll && (
                  <button
                    onClick={onStopAll}
                    className="flex items-center gap-1.5 bg-red-650 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white px-3 py-1.5 rounded-lg font-semibold transition-all shadow-sm"
                  >
                    <Square size={11} className="fill-current" />
                    <span>Stop All ({downloading + inQueue})</span>
                  </button>
                )}
                {failed > 0 && (
                  <button
                    onClick={onRetryAll}
                    className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700 px-3 py-1.5 rounded-lg font-semibold transition-all shadow-sm"
                  >
                    <RefreshCw size={12} className="animate-spin-slow" />
                    <span>Retry All Failed ({failed})</span>
                  </button>
                )}
                {completed > 0 && (
                  <button
                    onClick={onClearCompleted}
                    className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg font-semibold transition-all"
                  >
                    <Check size={12} />
                    <span>Clear Completed ({completed})</span>
                  </button>
                )}
              </div>
            </div>

            {/* QUEUE SCROLLABLE CONTAINER */}
            <div className="max-h-[340px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700/40 p-1 md:p-2 scrollbar-thin">
              <AnimatePresence initial={false} mode="popLayout">
                {queue.map((item, index) => {
                  const isAudio = item.format === 'mp3' || item.format === 'm4a';

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2, delay: Math.min(0.1, index * 0.02) }}
                      className={`flex items-center justify-between gap-3 p-3 rounded-xl transition-all ${
                        item.status === 'downloading'
                          ? 'bg-blue-50/20 dark:bg-blue-500/5 border border-blue-500/10 dark:border-blue-400/10'
                          : 'border border-transparent'
                      }`}
                    >
                      {/* Video Thumbnail & Icon */}
                      <div className="flex items-center gap-3 overflow-hidden min-w-0 flex-1">
                        <div className="relative h-12 w-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex-shrink-0">
                          {item.thumbnail ? (
                            <img 
                              src={item.thumbnail} 
                              alt={item.title} 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                // hide image error broken icons nicely
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              {isAudio ? <Music size={16} /> : <Film size={16} />}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/10" />
                          <div className="absolute bottom-1 right-1 px-1 bg-black/70 rounded text-[9px] font-bold text-white uppercase tracking-wider">
                            {item.format}
                          </div>
                        </div>

                        {/* Title and details */}
                        <div className="flex-1 min-w-0">
                          <h4 
                            className="font-bold text-sm text-gray-800 dark:text-gray-100 line-clamp-1 leading-tight" 
                            title={item.title}
                          >
                            {item.title}
                          </h4>
                          {/* Live Dynamic Status Label or Error */}
                          <div className="mt-1 flex items-center gap-2 flex-wrap text-xs">
                            {item.status === 'queued' && (
                              <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1 font-medium">
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-pulse" />
                                Queued in line
                              </span>
                            )}
                            {item.status === 'downloading' && (
                              <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1 font-semibold">
                                <Loader2 size={11} className="animate-spin text-blue-500" />
                                Downloading • {item.progress}%
                              </span>
                            )}
                            {item.status === 'completed' && (
                              <span className="text-green-600 dark:text-green-400 flex items-center gap-1 font-semibold bg-green-50 dark:bg-green-900/25 px-1.5 py-0.5 rounded-md">
                                <Check size={11} className="stroke-[3px]" />
                                Live Downloaded!
                              </span>
                            )}
                            {item.status === 'failed' && (
                              <span className="text-red-600 dark:text-red-400 flex items-center gap-1 font-semibold max-w-full truncate" title={item.error}>
                                <AlertCircle size={11} />
                                {item.error || 'Connection Failed'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* INDIVIDUAL PROGRESS & ACTION BUTTONS */}
                      <div className="flex items-center gap-2">
                        {/* Progress Bar (Only shown for downloading) */}
                        {item.status === 'downloading' && (
                          <div className="hidden sm:block w-20 h-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300" 
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        )}

                        {/* Interactive operations */}
                        <div className="flex items-center gap-1">
                          {item.status === 'downloading' && onStop && (
                            <button
                              onClick={() => onStop(item.id)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 hover:text-red-700 transition-colors"
                              title="Stop Download"
                            >
                              <Square size={13} className="fill-current" />
                            </button>
                          )}
                          {item.status === 'failed' && (
                            <div className="flex items-center gap-1 animate-fade-in">
                              <button
                                type="button"
                                onClick={() => handleCopyLink(item.id, item.url)}
                                className={`p-1 flex items-center justify-center gap-1 text-[11px] font-bold rounded-md px-2 py-1 select-none border transition-all ${
                                  copiedId === item.id
                                    ? 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 border-green-200 dark:border-green-800'
                                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                                }`}
                                title="Copy link to manual download"
                              >
                                <Clipboard size={12} className={copiedId === item.id ? 'text-green-500' : ''} />
                                <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                              </button>
                              <button
                                onClick={() => onRetry(item.id)}
                                className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                                title="Retry Download"
                              >
                                <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-500" />
                              </button>
                            </div>
                          )}
                          <button
                            onClick={() => onRemove(item.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                            title={item.status === 'downloading' ? 'Cancel worker' : 'Remove from list'}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
