import { create } from 'zustand';
import { persist } from './middleware/persist';
import type { Locale, TranslationKeys } from '@/lib/types/i18n';

interface I18nState {
  // Current locale
  locale: Locale;
  
  // Available locales
  availableLocales: Locale[];
  
  // Loading state
  isLoading: boolean;
  
  // Translations cache
  translations: Partial<Record<Locale, TranslationKeys>>;
  
  // Actions
  setLocale: (locale: Locale) => void;
  loadTranslations: (locale: Locale) => Promise<void>;
  getTranslation: (key: string, locale?: Locale) => string;
  
  // Utility methods
  isRTL: () => boolean;
  getDirection: () => 'ltr' | 'rtl';
  formatMessage: (key: string, values?: Record<string, string | number>) => string;
}

// Translation loader function
const loadTranslationFile = async (locale: Locale): Promise<TranslationKeys> => {
  try {
    // Load all translation files for the locale
    const translations: TranslationKeys = {
      common: {},
      navigation: {},
      home: {},
      about: {},
      contact: {},
      portfolio: {},
      blog: {},
      validation: {},
      notifications: {},
    } as TranslationKeys;

    try {
      const common = await import(`../../locales/${locale}/common.json`);
      translations.common = common.default || common;
    } catch {
      console.warn(`Failed to load common translations for ${locale}`);
    }

    try {
      const navigation = await import(`../../locales/${locale}/navigation.json`);
      translations.navigation = navigation.default || navigation;
    } catch {
      console.warn(`Failed to load navigation translations for ${locale}`);
    }

    try {
      const home = await import(`../../locales/${locale}/home.json`);
      translations.home = home.default || home;
    } catch {
      console.warn(`Failed to load home translations for ${locale}`);
    }

    try {
      const about = await import(`../../locales/${locale}/about.json`);
      translations.about = about.default || about;
    } catch {
      console.warn(`Failed to load about translations for ${locale}`);
    }

    try {
      const contact = await import(`../../locales/${locale}/contact.json`);
      translations.contact = contact.default || contact;
    } catch {
      console.warn(`Failed to load contact translations for ${locale}`);
    }

    try {
      const portfolio = await import(`../../locales/${locale}/portfolio.json`);
      translations.portfolio = portfolio.default || portfolio;
    } catch {
      console.warn(`Failed to load portfolio translations for ${locale}`);
    }

    try {
      const blog = await import(`../../locales/${locale}/blog.json`);
      translations.blog = blog.default || blog;
    } catch {
      console.warn(`Failed to load blog translations for ${locale}`);
    }

    try {
      const validation = await import(`../../locales/${locale}/validation.json`);
      translations.validation = validation.default || validation;
    } catch {
      console.warn(`Failed to load validation translations for ${locale}`);
    }

    try {
      const notifications = await import(`../../locales/${locale}/notifications.json`);
      translations.notifications = notifications.default || notifications;
    } catch {
      console.warn(`Failed to load notifications translations for ${locale}`);
    }

    return translations;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    throw error;
  }
};

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      // Initial state
      locale: 'en', // Default to English
      availableLocales: ['en', 'vi'],
      isLoading: false,
      translations: {},

      // Actions
      setLocale: async (locale: Locale) => {
        const { translations, loadTranslations } = get();
        
        set({ locale, isLoading: true });
        
        try {
          // Load translations if not already cached
          if (!translations[locale]) {
            await loadTranslations(locale);
          }
        } catch (error) {
          console.error('Failed to set locale:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      loadTranslations: async (locale: Locale) => {
        try {
          set({ isLoading: true });
          const translationData = await loadTranslationFile(locale);
          
          set((state) => ({
            translations: {
              ...state.translations,
              [locale]: translationData,
            },
            isLoading: false,
          }));
        } catch (error) {
          console.error(`Failed to load translations for ${locale}:`, error);
          set({ isLoading: false });
          throw error;
        }
      },

      getTranslation: (key: string, locale?: Locale) => {
        const { locale: currentLocale, translations } = get();
        const targetLocale = locale || currentLocale;
        const translation = translations[targetLocale];

        if (!translation) {
          return key;
        }

        // Handle nested keys (e.g., "common.greeting")
        const keys = key.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let value: any = translation;

        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            return key;
          }
        }

        return typeof value === 'string' ? value : key;
      },

      // Utility methods
      isRTL: () => {
        const { locale } = get();
        // Add RTL locales here if needed (Arabic, Hebrew, etc.)
        const rtlLocales: Locale[] = [];
        return rtlLocales.includes(locale);
      },

      getDirection: () => {
        return get().isRTL() ? 'rtl' : 'ltr';
      },

      formatMessage: (key: string, values?: Record<string, string | number>) => {
        let message = get().getTranslation(key);
        
        if (values) {
          Object.entries(values).forEach(([placeholder, value]) => {
            message = message.replace(new RegExp(`{${placeholder}}`, 'g'), String(value));
          });
        }
        
        return message;
      },
    }),
    {
      name: 'i18n-store',
      partialize: (state) => ({
        locale: state.locale,
      }),
    }
  )
);