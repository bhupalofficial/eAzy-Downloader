
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
  onHomeClick: () => void;
  onSitemapClick: () => void;
  onAboutClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onPrivacyClick, 
  onTermsClick, 
  onHomeClick, 
  onSitemapClick,
  onAboutClick 
}) => {
  const { t } = useLanguage();
  return (
    <footer className="w-full mt-12 py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="font-medium text-center md:text-left leading-relaxed max-w-full">
          <span>&copy; {new Date().getFullYear()} </span>
          <button 
            type="button"
            onClick={onHomeClick}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 inline-block bg-transparent border-none p-0 font-medium cursor-pointer"
          >
            eAzy Downloader
          </button>
          <span>. {t.footer.rights}</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
           <button 
            onClick={onAboutClick}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 font-medium bg-transparent border-none cursor-pointer"
          >
            {t.footer.about}
          </button>
           <button 
            onClick={onSitemapClick}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 font-medium bg-transparent border-none cursor-pointer"
          >
            {t.footer.sitemap}
          </button>
          <button 
            onClick={onPrivacyClick}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 font-medium bg-transparent border-none cursor-pointer"
          >
            {t.footer.privacy}
          </button>
          <button 
            onClick={onTermsClick}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 font-medium bg-transparent border-none cursor-pointer"
          >
            {t.footer.terms}
          </button>
        </div>
      </div>
    </footer>
  );
};
