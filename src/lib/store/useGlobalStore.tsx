// lib/store/useGlobalStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

export interface NavigationState {
  currentPath: string;
  previousPath: string;
  isNavigating: boolean;
}

export interface UserPreferences {
  theme: Theme;
  language: string;
  animations: boolean;
  soundEffects: boolean;
}

interface GlobalState {
  // Theme & UI
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  
  // Loading states
  isLoading: boolean;
  loadingMessage: string;
  setLoading: (value: boolean, message?: string) => void;
  
  // Navigation
  navigation: NavigationState;
  setCurrentPath: (path: string) => void;
  setNavigating: (isNavigating: boolean) => void;
  
  // User preferences
  preferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  
  // Modal & UI states
  modals: {
    contactForm: boolean;
    projectDetails: boolean;
    imageGallery: boolean;
  };
  openModal: (modal: keyof GlobalState['modals']) => void;
  closeModal: (modal: keyof GlobalState['modals']) => void;
  closeAllModals: () => void;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
  }>;
  addNotification: (notification: Omit<GlobalState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      // Theme & UI
      isDark: false,
      theme: 'system',
      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
        set({ 
          theme: newTheme,
          isDark: newTheme === 'dark' || (newTheme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        });
      },
      setTheme: (theme) => {
        set({ 
          theme,
          isDark: theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        });
      },
      
      // Loading states
      isLoading: false,
      loadingMessage: '',
      setLoading: (value, message = '') => set({ isLoading: value, loadingMessage: message }),
      
      // Navigation
      navigation: {
        currentPath: '/',
        previousPath: '/',
        isNavigating: false,
      },
      setCurrentPath: (path) => set((state) => ({
        navigation: {
          ...state.navigation,
          previousPath: state.navigation.currentPath,
          currentPath: path,
        }
      })),
      setNavigating: (isNavigating) => set((state) => ({
        navigation: { ...state.navigation, isNavigating }
      })),
      
      // User preferences
      preferences: {
        theme: 'system',
        language: 'en',
        animations: true,
        soundEffects: false,
      },
      updatePreferences: (newPreferences) => set((state) => ({
        preferences: { ...state.preferences, ...newPreferences }
      })),
      
      // Modal states
      modals: {
        contactForm: false,
        projectDetails: false,
        imageGallery: false,
      },
      openModal: (modal) => set((state) => ({
        modals: { ...state.modals, [modal]: true }
      })),
      closeModal: (modal) => set((state) => ({
        modals: { ...state.modals, [modal]: false }
      })),
      closeAllModals: () => set((state) => ({
        modals: Object.keys(state.modals).reduce((acc, key) => ({
          ...acc,
          [key]: false
        }), {} as GlobalState['modals'])
      })),
      
      // Notifications
      notifications: [],
      addNotification: (notification) => {
        const id = Date.now().toString();
        set((state) => ({
          notifications: [...state.notifications, { ...notification, id }]
        }));
        
        // Auto remove notification after duration
        if (notification.duration !== 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, notification.duration || 5000);
        }
      },
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'global-store',
      partialize: (state) => ({
        theme: state.theme,
        preferences: state.preferences,
      }),
    }
  )
);