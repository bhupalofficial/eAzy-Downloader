
import React from 'react';
import { FileText, ArrowLeft, AlertTriangle, Copyright, Scale, Server } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TermsConditionsProps {
  onBack: () => void;
}

export const TermsConditions: React.FC<TermsConditionsProps> = ({ onBack }) => {
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
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
          <FileText size={32} strokeWidth={2.5} />
        </div>
        <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">{t.legal.termsTitle}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t.legal.termsDesc}</p>
        </div>
      </div>

      <div className="space-y-12">
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <p className="lead text-lg">
                By accessing eAzy Downloader, you agree to abide by these Terms of Service. Please read them carefully. These terms apply to all visitors, users, and others who access the Service.
            </p>
        </div>

        <div className="grid gap-8">
            <section>
                <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                    <div className="bg-brand-100 dark:bg-brand-900/20 p-2 rounded-lg text-brand-600 dark:text-brand-400">
                        <Scale size={20} />
                    </div>
                    <h2 className="text-xl font-bold m-0">1. Permitted Use & Legality</h2>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/20 p-6 rounded-2xl text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-brand-500">
                    <p className="mb-4">
                        <strong>Personal Use Only:</strong> This service is intended strictly for personal, non-commercial use. You may only download content that you have the right to access and use.
                    </p>
                    <p>
                        <strong>Copyright Compliance:</strong> We strictly prohibit the use of this tool for copyright infringement. You are solely responsible for ensuring that your use of downloaded media complies with the copyright laws of your jurisdiction and the terms of service of the source platform (e.g., YouTube, Facebook, TikTok).
                    </p>
                </div>
            </section>

            <section>
                <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                    <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                        <Copyright size={20} />
                    </div>
                    <h2 className="text-xl font-bold m-0">2. Intellectual Property & Affiliation</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-2">
                    eAzy Downloader is an independent tool and is <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected with</strong> YouTube, Google, Facebook, Instagram, TikTok, or any of their subsidiaries or affiliates. All product names, logos, and brands are property of their respective owners.
                </p>
            </section>

             <section>
                <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                        <Server size={20} />
                    </div>
                    <h2 className="text-xl font-bold m-0">3. Service Availability</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-2">
                    We strive to provide a reliable service, but we cannot guarantee that the website will always be available, uninterrupted, or error-free. The functionality depends on the availability and technical specifications of third-party platforms, which may change without notice.
                </p>
            </section>

            <section>
                <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                    <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                        <AlertTriangle size={20} />
                    </div>
                    <h2 className="text-xl font-bold m-0">4. Limitation of Liability</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-2">
                    In no event shall eAzy Downloader be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use this service. You assume full responsibility for any content you download.
                </p>
            </section>
        </div>
      </div>
    </div>
  );
};
