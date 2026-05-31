
import React from 'react';
import { Shield, ArrowLeft, Lock, Eye, Database, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
          <Shield size={32} strokeWidth={2.5} />
        </div>
        <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">{t.legal.privacyTitle}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t.legal.privacyDesc}</p>
        </div>
      </div>

      <div className="space-y-12">
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <p className="lead text-lg">
                At eAzy Downloader, we believe your privacy is a fundamental right. We have designed our service to process media with minimal data retention. This document outlines exactly how we handle information.
            </p>
            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                    <Database size={24} className="text-brand-500" />
                    <h2 className="text-xl font-bold m-0">Data Collection</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We do <strong>not</strong> collect personally identifiable information (PII) such as names, email addresses, or phone numbers. You do not need to register to use our services.
                </p>
            </section>

            <section className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                    <Eye size={24} className="text-brand-500" />
                    <h2 className="text-xl font-bold m-0">Usage Logs</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    When you submit a URL for processing, it is sent to our servers solely for the purpose of generating a download link. We do not maintain a history of downloaded videos associated with your IP address.
                </p>
            </section>

             <section className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                    <Lock size={24} className="text-brand-500" />
                    <h2 className="text-xl font-bold m-0">Cookies & Storage</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We use local storage technology simply to remember your interface preferences (such as Dark Mode settings). We do not use persistent tracking cookies for advertising profiling.
                </p>
            </section>

            <section className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                    <Globe size={24} className="text-brand-500" />
                    <h2 className="text-xl font-bold m-0">Third-Party Links</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our service interacts with public content from platforms like YouTube, Facebook, TikTok, and Instagram. We are not responsible for the privacy policies or content of these external platforms.
                </p>
            </section>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
             <p className="text-gray-600 dark:text-gray-300">
                 If you have any questions regarding this privacy policy, please contact us via the support channels provided on our main website.
             </p>
        </div>
      </div>
    </div>
  );
};
