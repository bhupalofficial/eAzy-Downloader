
import React from 'react';
import { Info, ArrowLeft, Target, Users, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutUsProps {
  onBack: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onBack }) => {
  const { t } = useLanguage();
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
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
          <Info size={32} strokeWidth={2.5} />
        </div>
        <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">{t.about.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t.about.desc}</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-gray-50 dark:bg-gray-700/30 p-8 rounded-2xl md:col-span-2">
            <div className="flex items-center gap-3 mb-4 text-brand-600 dark:text-brand-400">
                <Target size={28} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">{t.about.missionTitle}</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.about.missionDesc}
            </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/30 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-4 text-purple-600 dark:text-purple-400">
                <Users size={24} />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white m-0">{t.about.teamTitle}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t.about.teamDesc}
            </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/30 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-4 text-emerald-600 dark:text-emerald-400">
                <Mail size={24} />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white m-0">{t.about.contactTitle}</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t.about.contactDesc}
            </p>
            <a href="mailto:support@eazydownloader.com" className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold hover:underline">
                support@eazydownloader.com
            </a>
        </div>
      </div>
    </div>
  );
};
