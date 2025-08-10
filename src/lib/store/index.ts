// Export all stores
export { useGlobalStore } from './useGlobalStore';
export { usePortfolioStore } from './usePortfolioStore';
export { useBlogStore } from './useBlogStore';
export { useContactStore } from './useContactStore';
export { useI18nStore } from './useI18nStore';

// Export types
export type { Theme, NavigationState, UserPreferences } from './useGlobalStore';
export type { ContactMessage, ContactForm, FormValidation } from './useContactStore';
export type { Locale, TranslationKeys } from '@/lib/types/i18n';

// Export utilities
export { createSelectors, shallow } from './utils/selectors';
export { persist } from './middleware/persist';