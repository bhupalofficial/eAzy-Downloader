
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../locales/translations';

type Translations = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to English initially
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // 1. Check for a user-selected language saved in localStorage
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
      return;
    }

    // 2. If no saved preference, attempt to detect device language
    // navigator.languages supports an array of preferences (e.g. ['es-MX', 'es', 'en'])
    const browserLangs = navigator.languages || [navigator.language];
    
    for (const lang of browserLangs) {
      // Extract the language code (e.g. 'es-ES' -> 'es')
      const code = lang.split('-')[0] as Language;
      
      // If we support this language, set it and stop
      if (translations[code]) {
        if (code !== 'en') {
          setLanguage(code);
        }
        break; 
      }
    }
    // If no supported language is found, it remains 'en'
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
