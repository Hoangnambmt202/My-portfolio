import { useCallback, useEffect } from 'react';
import { useI18nStore } from '@/lib/store/useI18nStore';
import type { Locale } from '@/lib/types/i18n';

export const useTranslation = () => {
  const locale = useI18nStore.use.locale();
  const isLoading = useI18nStore.use.isLoading();
  const availableLocales = useI18nStore.use.availableLocales();
  const translations = useI18nStore.use.translations();
  
  const setLocale = useI18nStore((state) => state.setLocale);
  const loadTranslations = useI18nStore((state) => state.loadTranslations);
  const getTranslation = useI18nStore((state) => state.getTranslation);
  const formatMessage = useI18nStore((state) => state.formatMessage);
  const isRTL = useI18nStore((state) => state.isRTL);
  const getDirection = useI18nStore((state) => state.getDirection);

  // Load translations on mount if not already loaded
  useEffect(() => {
    if (!translations[locale]) {
      loadTranslations(locale).catch(console.error);
    }
  }, [locale, translations, loadTranslations]);

  // Translation function with fallback
  const t = useCallback((key: string, values?: Record<string, string | number>) => {
    if (values) {
      return formatMessage(key, values);
    }
    return getTranslation(key);
  }, [getTranslation, formatMessage]);

  // Change language function
  const changeLanguage = useCallback(async (newLocale: Locale) => {
    try {
      await setLocale(newLocale);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }, [setLocale]);

  // Get current language info
  const getCurrentLanguage = useCallback(() => {
    const languageNames: Record<Locale, { name: string; nativeName: string }> = {
      en: { name: 'English', nativeName: 'English' },
      vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt' },
    };
    
    return languageNames[locale];
  }, [locale]);

  return {
    // Current state
    locale,
    isLoading,
    availableLocales,
    isRTL: isRTL(),
    direction: getDirection(),
    
    // Translation function
    t,
    
    // Language management
    changeLanguage,
    getCurrentLanguage,
    
    // Utility functions
    formatMessage,
    
    // Check if translations are loaded
    isReady: !isLoading && !!translations[locale],
  };
};

// Hook for getting specific namespace translations
export const useNamespaceTranslation = (namespace: string) => {
  const { t, ...rest } = useTranslation();
  
  const nt = useCallback((key: string, values?: Record<string, string | number>) => {
    return t(`${namespace}.${key}`, values);
  }, [t, namespace]);
  
  return {
    t: nt,
    ...rest,
  };
};
