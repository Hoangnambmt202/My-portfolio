import { useCallback } from 'react';
import { useGlobalStore, usePortfolioStore, useBlogStore, useContactStore } from '@/lib/store';
import type { ContactForm } from '@/lib/store/useContactStore';

// Global store hooks
export const useTheme = () => {
  const theme = useGlobalStore.use.theme();
  const isDark = useGlobalStore.use.isDark();
  const setTheme = useGlobalStore.use.setTheme();
  const toggleTheme = useGlobalStore.use.toggleTheme();

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
  const setLoading = useGlobalStore.use.setLoading();

  return {
    isLoading,
    loadingMessage,
    setLoading,
  };
};

export const useNavigation = () => {
  const navigation = useGlobalStore.use.navigation();
  const setCurrentPath = useGlobalStore.use.setCurrentPath();
  const setNavigating = useGlobalStore.use.setNavigating();

  return {
    ...navigation,
    setCurrentPath,
    setNavigating,
  };
};

export const useNotifications = () => {
  const notifications = useGlobalStore.use.notifications();
  const addNotification = useGlobalStore.use.addNotification();
  const removeNotification = useGlobalStore.use.removeNotification();
  const clearNotifications = useGlobalStore.use.clearNotifications();

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

  const setProjects = usePortfolioStore.use.setProjects();
  const setSelectedProject = usePortfolioStore.use.setSelectedProject();
  const getFilteredProjects = usePortfolioStore.use.getFilteredProjects();
  const setFilter = usePortfolioStore.use.setFilter();
  const clearFilters = usePortfolioStore.use.clearFilters();

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

  const setSkills = usePortfolioStore.use.setSkills();
  const addSkill = usePortfolioStore.use.addSkill();
  const getSkillsByCategory = usePortfolioStore.use.getSkillsByCategory();

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

  const setPosts = useBlogStore.use.setPosts();
  const setSelectedPost = useBlogStore.use.setSelectedPost();
  // const getFilteredPosts = useBlogStore.use.getFilteredProjects();
  const setFilter = useBlogStore.use.setFilter();
  const setSearchQuery = useBlogStore.use.setSearchQuery();
  const setCurrentPage = useBlogStore.use.setCurrentPage();
  const getRelatedPosts = useBlogStore.use.getRelatedPosts();

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

  const updateForm = useContactStore.use.updateForm();
  const validateForm = useContactStore.use.validateForm();
  const submitForm = useContactStore.use.submitForm();
  const resetForm = useContactStore.use.resetForm();
  const clearFormErrors = useContactStore.use.clearFormErrors();

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

  const setMessages = useContactStore.use.setMessages();
  const setSelectedMessage = useContactStore.use.setSelectedMessage();
  const getFilteredMessages = useContactStore.use.getFilteredMessages();
  const markAsRead = useContactStore.use.markAsRead();
  const getUnreadCount = useContactStore.use.getUnreadCount();

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