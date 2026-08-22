import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { translations, LANGUAGES } from '../translations';

const STORAGE_KEY = 'mindmapr_language_v1';

const LanguageContext = createContext(null);

// Nested property getter with dot notation support
function getNestedValue(obj, keyPath) {
  if (!obj || !keyPath) return undefined;
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return current;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (translations[saved] || saved in translations)) {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'English';
  });

  // Save to localStorage when language changes
  const setLanguage = useCallback((newLang) => {
    if (!newLang || !translations[newLang]) return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore
    }
  }, []);

  // Translation function t(key, params, fallback)
  const t = useCallback(
    (key, params = {}, fallback = null) => {
      if (!key) return '';

      // Get dictionary for active language
      const currentDict = translations[language] || translations.English;
      let translated = getNestedValue(currentDict, key);

      // Fallback to English if key missing in current language
      if (translated === undefined) {
        translated = getNestedValue(translations.English, key);
      }

      // If still missing, fallback to explicit fallback or key
      if (translated === undefined) {
        if (fallback !== null && fallback !== undefined) {
          return fallback;
        }
        // Return last key segment for a clean display rather than crashing
        const segments = key.split('.');
        return segments[segments.length - 1];
      }

      if (typeof translated !== 'string') {
        return translated;
      }

      // Replace interpolation placeholders like {name}, {count}, etc.
      let result = translated;
      if (params && typeof params === 'object') {
        Object.keys(params).forEach((paramKey) => {
          const regex = new RegExp(`\\{${paramKey}\\}`, 'g');
          result = result.replace(regex, params[paramKey]);
        });
      }

      return result;
    },
    [language]
  );

  const currentLanguageMeta = useMemo(() => {
    return LANGUAGES.find((l) => l.id === language || l.code === language) || LANGUAGES[0];
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      availableLanguages: LANGUAGES,
      currentLanguageMeta,
    }),
    [language, setLanguage, t, currentLanguageMeta]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
