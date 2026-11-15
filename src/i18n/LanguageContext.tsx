import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, LangCode } from './translations';

const APP_LANG_KEY = '@app_language';
const SHARE_LANG_KEY = '@share_language';

type Strings = typeof translations['en'];

interface LanguageContextValue {
  lang: LangCode;
  shareLang: LangCode;
  t: Strings;
  st: Strings;
  setAppLanguage: (code: LangCode) => void;
  setShareLanguage: (code: LangCode) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  shareLang: 'en',
  t: translations.en,
  st: translations.en,
  setAppLanguage: () => {},
  setShareLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LangCode>('en');
  const [shareLang, setShareLang] = useState<LangCode>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(APP_LANG_KEY),
      AsyncStorage.getItem(SHARE_LANG_KEY),
    ]).then(([appLang, shareLang]) => {
      if (appLang && appLang in translations) setLang(appLang as LangCode);
      if (shareLang && shareLang in translations) setShareLang(shareLang as LangCode);
      else if (appLang && appLang in translations) setShareLang(appLang as LangCode);
      setReady(true);
    });
  }, []);

  const setAppLanguage = useCallback((code: LangCode) => {
    setLang(code);
    AsyncStorage.setItem(APP_LANG_KEY, code);
  }, []);

  const setShareLanguage = useCallback((code: LangCode) => {
    setShareLang(code);
    AsyncStorage.setItem(SHARE_LANG_KEY, code);
  }, []);

  if (!ready) return null;

  return (
    <LanguageContext.Provider
      value={{
        lang,
        shareLang,
        t: translations[lang],
        st: translations[shareLang],
        setAppLanguage,
        setShareLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
