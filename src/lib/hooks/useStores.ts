import { useCallback } from 'react';
import { useGlobalStore } from '@/lib/store/useGlobalStore';
import { usePortfolioStore } from '@/lib/store/usePortfolioStore';
import { useBlogStore } from '@/lib/store/useBlogStore';
import { useContactStore } from '@/lib/store/useContactStore';
// Global store hooks
export const useTheme = () => {
  const theme = useGlobalStore((state) => state.theme);
  const isDark = useGlobalStore((state) => state.isDark);
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
  const isLoading = useGlobalStore((state) => state.isLoading);
  const loadingMessage = useGlobalStore((state) => state.loadingMessage);
  const setLoading = useGlobalStore((state) => state.setLoading);

  return {
    isLoading,
    loadingMessage,
    setLoading,
  };
};

export const useNavigation = () => {
  const navigation = useGlobalStore((state) => state.navigation);
  const setCurrentPath = useGlobalStore((state) => state.setCurrentPath);
  const setNavigating = useGlobalStore((state) => state.setNavigating);

  return {
    ...navigation,
    setCurrentPath,
    setNavigating,
  };
};

export const useNotifications = () => {
  const notifications = useGlobalStore((state) => state.notifications);
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
  const projects = usePortfolioStore((state) => state.projects);
  const featuredProjects = usePortfolioStore((state) => state.featuredProjects);
  const selectedProject = usePortfolioStore((state) => state.selectedProject);
  const projectsLoading = usePortfolioStore((state) => state.projectsLoading);
  const projectsError = usePortfolioStore((state) => state.projectsError);
  const filters = usePortfolioStore((state) => state.filters);

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
  const skills = usePortfolioStore((state) => state.skills);
  const skillCategories = usePortfolioStore((state) => state.skillCategories);
  const skillsLoading = usePortfolioStore((state) => state.skillsLoading);

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
  const posts = useBlogStore((state) => state.posts);
  const featuredPosts = useBlogStore((state) => state.featuredPosts);
  const selectedPost = useBlogStore((state) => state.selectedPost);
  const postsLoading = useBlogStore((state) => state.postsLoading);
  const postsError = useBlogStore((state) => state.postsError);
  const filters = useBlogStore((state) => state.filters);
  const searchQuery = useBlogStore((state) => state.searchQuery);
  const pagination = useBlogStore((state) => state.pagination);

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
  const form = useContactStore((state) => state.form);
  const formErrors = useContactStore((state) => state.formErrors);
  const isSubmitting = useContactStore((state) => state.isSubmitting);
  const submitError = useContactStore((state) => state.submitError);
  const submitSuccess = useContactStore((state) => state.submitSuccess);

  const updateForm = useContactStore((state) => state.updateForm);
  const validateForm = useContactStore((state) => state.validateForm);
  const submitForm = useContactStore((state) => state.submitForm);
  const resetForm = useContactStore((state) => state.resetForm);
  const clearFormErrors = useContactStore((state) => state.clearFormErrors);

  return {
    form,
    formErrors,
    isSubmitting,
    submitError,
    submitSuccess,
    updateForm,
    validateForm,
    submitForm,
    resetForm,
    clearFormErrors,
  };
};

export const useContactMessages = () => {
  const messages = useContactStore((state) => state.messages);
  const selectedMessage = useContactStore((state) => state.selectedMessage);
  const messagesLoading = useContactStore((state) => state.messagesLoading);
  const stats = useContactStore((state) => state.stats);

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