"use client";
import { useEffect } from 'react';
import { useI18nStore } from '@/lib/store/useI18nStore';

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const locale = useI18nStore.use.locale();
  const translations = useI18nStore.use.translations();
  const loadTranslations = useI18nStore((state) => state.loadTranslations);

  useEffect(() => {
    // Load initial translations if not already loaded
    if (!translations[locale]) {
      loadTranslations(locale).catch(console.error);
    }
  }, [locale, translations, loadTranslations]);

  return <>{children}</>;
};
