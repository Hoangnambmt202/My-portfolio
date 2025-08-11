import { useCallback } from 'react';
import { useGlobalStore, usePortfolioStore, useBlogStore, useContactStore } from '@/lib/store';
import type { Theme } from '@/lib/store';import type { ContactForm } from '@/lib/store/useContactStore';

// Global store hooks
export const useTheme = () => {
  const theme = useGlobalStore.use.theme();
  const isDark = useGlobalStore.use.isDark();
  const setTheme = useGlobalStore((state) => state.setTheme);
  const toggleTheme = useGlobalStore((state) => state.toggleTheme);

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
};

export const useLoading = () => {
  const isLoading = useGlobalStore.use.isLoading();
  const loadingMessage = useGlobalStore.use.loadingMessage();
  const setLoading = useGlobalStore((state) => state.setLoading);

  return {
    isLoading,
    loadingMessage,
    setLoading,
  };
};

export const useNavigation = () => {
  const navigation = useGlobalStore.use.navigation();
  const setCurrentPath = useGlobalStore((state) => state.setCurrentPath);
  const setNavigating = useGlobalStore((state) => state.setNavigating);

  return {
    ...navigation,
    setCurrentPath,
    setNavigating,
  };
};

export const useNotifications = () => {
  const notifications = useGlobalStore.use.notifications();
  const addNotification = useGlobalStore((state) => state.addNotification);
  const removeNotification = useGlobalStore((state) => state.removeNotification);
  const clearNotifications = useGlobalStore((state) => state.clearNotifications);

  const showSuccess = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'success', title, message, duration });
  }, [addNotification]);

  const showError = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'error', title, message, duration });
  }, [addNotification]);

  const showWarning = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'warning', title, message, duration });
  }, [addNotification]);

  const showInfo = useCallback((title: string, message: string, duration?: number) => {
    addNotification({ type: 'info', title, message, duration });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

// Portfolio store hooks
export const useProjects = () => {
  const projects = usePortfolioStore.use.projects();
  const featuredProjects = usePortfolioStore.use.featuredProjects();
  const selectedProject = usePortfolioStore.use.selectedProject();
  const projectsLoading = usePortfolioStore.use.projectsLoading();
  const projectsError = usePortfolioStore.use.projectsError();
  const filters = usePortfolioStore.use.filters();

  const setProjects = usePortfolioStore((state) => state.setProjects);
  const setSelectedProject = usePortfolioStore((state) => state.setSelectedProject);
  const getFilteredProjects = usePortfolioStore((state) => state.getFilteredProjects);
  const setFilter = usePortfolioStore((state) => state.setFilter);
  const clearFilters = usePortfolioStore((state) => state.clearFilters);

  return {
    projects,
    featuredProjects,
    selectedProject,
    projectsLoading,
    projectsError,
    filters,
    setProjects,
    setSelectedProject,
    getFilteredProjects,
    setFilter,
    clearFilters,
  };
};

export const useSkills = () => {
  const skills = usePortfolioStore.use.skills();
  const skillCategories = usePortfolioStore.use.skillCategories();
  const skillsLoading = usePortfolioStore.use.skillsLoading();

  const setSkills = usePortfolioStore((state) => state.setSkills);
  const addSkill = usePortfolioStore((state) => state.addSkill);
  const getSkillsByCategory = usePortfolioStore((state) => state.getSkillsByCategory);

  return {
    skills,
    skillCategories,
    skillsLoading,
    setSkills,
    addSkill,
    getSkillsByCategory,
  };
};

// Blog store hooks
export const useBlogPosts = () => {
  const posts = useBlogStore.use.posts();
  const featuredPosts = useBlogStore.use.featuredPosts();
  const selectedPost = useBlogStore.use.selectedPost();
  const postsLoading = useBlogStore.use.postsLoading();
  const postsError = useBlogStore.use.postsError();
  const filters = useBlogStore.use.filters();
  const searchQuery = useBlogStore.use.searchQuery();
  const pagination = useBlogStore.use.pagination();

  const setPosts = useBlogStore((state) => state.setPosts);
  const setSelectedPost = useBlogStore((state) => state.setSelectedPost);
  const getFilteredPosts = useBlogStore((state) => state.getFilteredPosts);
  const setFilter = useBlogStore((state) => state.setFilter);
  const setSearchQuery = useBlogStore((state) => state.setSearchQuery);
  const setCurrentPage = useBlogStore((state) => state.setCurrentPage);
  const getRelatedPosts = useBlogStore((state) => state.getRelatedPosts);

  return {
    posts,
    featuredPosts,
    selectedPost,
    postsLoading,
    postsError,
    filters,
    searchQuery,
    pagination,
    setPosts,
    setSelectedPost,
    getFilteredPosts,
    setFilter,
    setSearchQuery,
    setCurrentPage,
    getRelatedPosts,
  };
};

// Contact store hooks
export const useContactForm = () => {
  const form = useContactStore.use.form();
  const formErrors = useContactStore.use.formErrors();
  const isSubmitting = useContactStore.use.isSubmitting();
  const submitError = useContactStore.use.submitError();
  const submitSuccess = useContactStore.use.submitSuccess();

  const updateForm = useContactStore((state) => state.updateForm);
  const validateForm = useContactStore((state) => state.validateForm);
  const submitForm = useContactStore((state) => state.submitForm);
  const resetForm = useContactStore((state) => state.resetForm);
  const clearFormErrors = useContactStore((state) => state.clearFormErrors);

  // Type-safe form field updater
  const updateFormField = useCallback(<K extends keyof ContactForm>(field: K, value: ContactForm[K]) => {
    updateForm(field, value);
  }, [updateForm]);

  return {
    form,
    formErrors,
    isSubmitting,
    submitError,
    submitSuccess,
    updateForm: updateFormField,
    validateForm,
    submitForm,
    resetForm,
    clearFormErrors,
  };
};

export const useContactMessages = () => {
  const messages = useContactStore.use.messages();
  const selectedMessage = useContactStore.use.selectedMessage();
  const messagesLoading = useContactStore.use.messagesLoading();
  const stats = useContactStore.use.stats();

  const setMessages = useContactStore((state) => state.setMessages);
  const setSelectedMessage = useContactStore((state) => state.setSelectedMessage);
  const getFilteredMessages = useContactStore((state) => state.getFilteredMessages);
  const markAsRead = useContactStore((state) => state.markAsRead);
  const getUnreadCount = useContactStore((state) => state.getUnreadCount);

  return {
    messages,
    selectedMessage,
    messagesLoading,
    stats,
    setMessages,
    setSelectedMessage,
    getFilteredMessages,
    markAsRead,
    getUnreadCount,
  };
};