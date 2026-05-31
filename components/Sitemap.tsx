
import React from 'react';
import { ArrowLeft, Map, Youtube, Facebook, Instagram, Globe, Shield, FileText, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { TikTokIcon } from './NavBar';

interface SitemapProps {
  onBack: () => void;
  onSelectPlatform: (platform: string) => void;
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

export const Sitemap: React.FC<SitemapProps> = ({ onBack, onSelectPlatform, onPrivacyClick, onTermsClick }) => {
  const { t } = useLanguage();

  const tools = [
    { id: 'youtube', label: t.hero.youtubeTitle, icon: Youtube, color: 'text-red-600' },
    { id: 'facebook', label: t.hero.facebookTitle, icon: Facebook, color: 'text-blue-600' },
    { id: 'instagram', label: t.hero.instagramTitle, icon: Instagram, color: 'text-pink-600' },
    { id: 'tiktok', label: t.hero.tiktokTitle, icon: TikTokIcon, color: 'text-black dark:text-white' },
    { id: 'universal', label: t.hero.universalTitle, icon: Globe, color: 'text-brand-600' },
  ];

  return (
    <div className="w-full max-w-4xl animate-fade-in bg-white dark:bg-gray-800 p-6 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 mb-8 transition-colors"
      >
        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full group-hover:bg-brand-100 dark:group-hover:bg-brand-900/30 transition-colors">
            <ArrowLeft size={18} />
        </div>
        {t.legal.back}
      </button>

      <div className="flex flex-col gap-6 mb-10">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Map size={32} strokeWidth={2.5} />
        </div>
        <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">{t.sitemap.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t.sitemap.desc}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-brand-500 rounded-full"></span>
            {t.sitemap.tools}
          </h2>
          <div className="grid gap-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    onSelectPlatform(tool.id);
                    onBack();
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all text-left group w-full"
                >
                  <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm group-hover:scale-110 transition-transform ${tool.color}`}>
                    <Icon size={20} />
                  </div>
                  <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {tool.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
             <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
            {t.sitemap.pages}
          </h2>
          <div className="grid gap-3">
             <button
              onClick={onBack}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all text-left group w-full"
            >
              <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-300">
                <Home size={20} />
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {t.sitemap.home}
              </span>
            </button>

            <button
              onClick={onPrivacyClick}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all text-left group w-full"
            >
              <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400">
                <Shield size={20} />
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {t.legal.privacyTitle}
              </span>
            </button>

            <button
              onClick={onTermsClick}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all text-left group w-full"
            >
              <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-purple-600 dark:text-purple-400">
                <FileText size={20} />
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {t.legal.termsTitle}
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};