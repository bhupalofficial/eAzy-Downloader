
import React, { useState, useRef, useEffect } from 'react';
import { Youtube, Moon, Sun, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../locales/translations';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleTheme, onHomeClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languageNames: Record<Language, string> = {
    en: 'English',
    es: 'Español',
    pt: 'Português',
    fr: 'Français',
    de: 'Deutsch',
    hi: 'हिन्दी',
    ne: 'नेपाली',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full flex justify-between items-center py-4 px-4 sm:px-6 mb-6 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 -mx-4 sm:-mx-6 md:-mx-8 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-[calc(100%+4rem)] rounded-b-2xl">
      <div className="max-w-screen-xl mx-auto w-full flex justify-between items-center">
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-2 sm:gap-3 group cursor-pointer bg-transparent border-none p-0 text-left"
          aria-label="Go to Home"
        >
          <div className="bg-brand-600 p-2 sm:p-2.5 rounded-xl shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform duration-300">
            <Youtube className="text-white w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight leading-none text-gray-900 dark:text-white">
              eAzy <span className="text-brand-600 dark:text-brand-500">Downloader</span>
            </h1>
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide">
              {t.header.fastFree}
            </span>
          </div>
        </button>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm focus:outline-none cursor-pointer"
              aria-label="Select Language"
              aria-expanded={isOpen}
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-xs sm:text-sm font-bold uppercase w-5 sm:w-6 text-center">{language}</span>
              <ChevronDown size={14} className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 py-1.5 overflow-hidden animate-fade-in divide-y divide-gray-100 dark:divide-gray-700/50">
                {(Object.keys(languageNames) as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer border-none block ${
                      language === lang
                        ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {languageNames[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={toggleTheme} 
            className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
