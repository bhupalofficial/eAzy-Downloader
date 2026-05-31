
import React from 'react';
import { Youtube, Facebook, Instagram, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavBarProps {
  activePlatform: string;
  onSelect: (platform: string) => void;
}

export const TikTokIcon = ({ size = 24, className = "" }: { size?: number | string, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export const NavBar: React.FC<NavBarProps> = ({ activePlatform, onSelect }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'youtube', label: t.nav.youtube, icon: Youtube, color: 'text-red-600' },
    { id: 'facebook', label: t.nav.facebook, icon: Facebook, color: 'text-blue-600' },
    { id: 'instagram', label: t.nav.instagram, icon: Instagram, color: 'text-pink-600' },
    { id: 'tiktok', label: t.nav.tiktok, icon: TikTokIcon, color: 'text-black dark:text-white' },
    { id: 'universal', label: t.nav.other, icon: Globe, color: 'text-brand-600' },
  ];

  return (
    <div className="w-full max-w-4xl mb-6">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePlatform === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border ${
                isActive
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent shadow-lg shadow-gray-500/20 scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <Icon 
                size={16} 
                className={`sm:w-[18px] sm:h-[18px] ${isActive ? 'text-inherit' : item.color}`} 
              />
              <span>{item.label}</span>
              {item.id === 'tiktok' && isActive && (
                <span className="hidden sm:inline-block text-[10px] bg-white/20 px-1.5 py-0.5 rounded ml-1">
                  {t.nav.noWm}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};