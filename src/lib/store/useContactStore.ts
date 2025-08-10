import { create } from 'zustand';
import { createSelectors } from './utils/selectors';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  createdAt: Date;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  company: string;
}

export interface FormValidation {
  name: string[];
  email: string[];
  subject: string[];
  message: string[];
  phone: string[];
  company: string[];
}

interface ContactState {
  // Messages
  messages: ContactMessage[];
  selectedMessage: ContactMessage | null;
  messagesLoading: boolean;
  messagesError: string | null;
  
  // Form state
  form: ContactForm;
  formErrors: FormValidation;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  
  // Filters
  filters: {
    status: ContactMessage['status'] | '';
    priority: ContactMessage['priority'] | '';
    dateRange: {
      start: Date | null;
      end: Date | null;
    };
  };
  
  // Statistics
  stats: {
    total: number;
    unread: number;
    replied: number;
    thisMonth: number;
  };
  
  // Actions - Messages
  setMessages: (messages: ContactMessage[]) => void;
  addMessage: (message: ContactMessage) => void;
  updateMessage: (id: string, updates: Partial<ContactMessage>) => void;
  deleteMessage: (id: string) => void;
  setSelectedMessage: (message: ContactMessage | null) => void;
  markAsRead: (id: string) => void;
  markAsReplied: (id: string) => void;
  archiveMessage: (id: string) => void;
  setPriority: (id: string, priority: ContactMessage['priority']) => void;
  addTag: (id: string, tag: string) => void;
  removeTag: (id: string, tag: string) => void;
  
  // Actions - Form
  updateForm: (field: keyof ContactForm, value: string) => void;
  setFormError: (field: keyof ContactForm, errors: string[]) => void;
  clearFormErrors: () => void;
  resetForm: () => void;
  validateForm: () => boolean;
  submitForm: () => Promise<boolean>;
  
  // Actions - Filters
  setFilter: (key: keyof ContactState['filters'], value: any) => void;
  clearFilters: () => void;
  
  // Computed getters
  getFilteredMessages: () => ContactMessage[];
  getMessagesByStatus: (status: ContactMessage['status']) => ContactMessage[];
  getUnreadCount: () => number;
  getStats: () => ContactState['stats'];
  
  // Loading states
  setMessagesLoading: (loading: boolean) => void;
  setSubmitting: (submitting: boolean) => void;
  setMessagesError: (error: string | null) => void;
  setSubmitError: (error: string | null) => void;
  setSubmitSuccess: (success: boolean) => void;
}

const initialForm: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  phone: '',
  company: '',
};

const initialFormErrors: FormValidation = {
  name: [],
  email: [],
  subject: [],
  message: [],
  phone: [],
  company: [],
};

const useContactStoreBase = create<ContactState>((set, get) => ({
  // Initial state
  messages: [],
  selectedMessage: null,
  messagesLoading: false,
  messagesError: null,
  
  form: { ...initialForm },
  formErrors: { ...initialFormErrors },
  isSubmitting: false,
  submitError: null,
  submitSuccess: false,
  
  filters: {
    status: '',
    priority: '',
    dateRange: {
      start: null,
      end: null,
    },
  },
  
  stats: {
    total: 0,
    unread: 0,
    replied: 0,
    thisMonth: 0,
  },
  
  // Message actions
  setMessages: (messages) => {
    const stats = get().getStats();
    set({ messages, stats });
  },
  
  addMessage: (message) => set((state) => {
    const newMessages = [...state.messages, message];
    return { 
      messages: newMessages,
      stats: {
        total: newMessages.length,
        unread: newMessages.filter(m => m.status === 'unread').length,
        replied: newMessages.filter(m => m.status === 'replied').length,
        thisMonth: newMessages.filter(m => {
          const messageDate = new Date(m.createdAt);
          const now = new Date();
          return messageDate.getMonth() === now.getMonth() && 
                 messageDate.getFullYear() === now.getFullYear();
        }).length,
      }
    };
  }),
  
  updateMessage: (id, updates) => set((state) => ({
    messages: state.messages.map(m => 
      m.id === id ? { ...m, ...updates } : m
    )
  })),
  
  deleteMessage: (id) => set((state) => ({
    messages: state.messages.filter(m => m.id !== id)
  })),
  
  setSelectedMessage: (message) => set({ selectedMessage: message }),
  
  markAsRead: (id) => set((state) => ({
    messages: state.messages.map(m => 
      m.id === id ? { ...m, status: 'read' as const } : m
    )
  })),
  
  markAsReplied: (id) => set((state) => ({
    messages: state.messages.map(m => 
      m.id === id ? { ...m, status: 'replied' as const } : m
    )
  })),
  
  archiveMessage: (id) => set((state) => ({
    messages: state.messages.map(m => 
      m.id === id ? { ...m, status: 'archived' as const } : m
    )
  })),
  
  setPriority: (id, priority) => set((state) => ({
    messages: state.messages.map(m => 
      m.id === id ? { ...m, priority } : m
    )
  })),
  
  addTag: (id, tag) => set((state) => ({
    messages: state.messages.map(m => 
      m.id === id ? { ...m, tags: [...m.tags, tag] } : m
    )
  })),
  
  removeTag: (id, tag) => set((state) => ({
    messages: state.messages.map(m => 
      m.id === id ? { ...m, tags: m.tags.filter(t => t !== tag) } : m
    )
  })),
  
  // Form actions
  updateForm: (field, value) => set((state) => ({
    form: { ...state.form, [field]: value },
    submitSuccess: false, // Reset success state when form changes
  })),
  
  setFormError: (field, errors) => set((state) => ({
    formErrors: { ...state.formErrors, [field]: errors }
  })),
  
  clearFormErrors: () => set({ formErrors: { ...initialFormErrors } }),
  
  resetForm: () => set({ 
    form: { ...initialForm },
    formErrors: { ...initialFormErrors },
    submitError: null,
    submitSuccess: false,
  }),
  
  validateForm: () => {
    const { form } = get();
    const errors: FormValidation = { ...initialFormErrors };
    let isValid = true;
    
    // Name validation
    if (!form.name.trim()) {
      errors.name.push('Name is required');
      isValid = false;
    } else if (form.name.trim().length < 2) {
      errors.name.push('Name must be at least 2 characters');
      isValid = false;
    }
    
    // Email validation
    if (!form.email.trim()) {
      errors.email.push('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email.push('Please enter a valid email address');
      isValid = false;
    }
    
    // Subject validation
    if (!form.subject.trim()) {
      errors.subject.push('Subject is required');
      isValid = false;
    } else if (form.subject.trim().length < 5) {
      errors.subject.push('Subject must be at least 5 characters');
      isValid = false;
    }
    
    // Message validation
    if (!form.message.trim()) {
      errors.message.push('Message is required');
      isValid = false;
    } else if (form.message.trim().length < 10) {
      errors.message.push('Message must be at least 10 characters');
      isValid = false;
    }
    
    // Phone validation (optional)
    if (form.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(form.phone.replace(/\s/g, ''))) {
      errors.phone.push('Please enter a valid phone number');
      isValid = false;
    }
    
    set({ formErrors: errors });
    return isValid;
  },
  
  submitForm: async () => {
    const { form, validateForm } = get();
    
    set({ isSubmitting: true, submitError: null });
    
    if (!validateForm()) {
      set({ isSubmitting: false });
      return false;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new message
      const newMessage: ContactMessage = {
        id: Date.now().toString(),
        ...form,
        createdAt: new Date(),
        status: 'unread',
        priority: 'medium',
        tags: [],
      };
      
      get().addMessage(newMessage);
      
      set({ 
        isSubmitting: false, 
        submitSuccess: true,
        form: { ...initialForm }
      });
      
      return true;
    } catch (error) {
      set({ 
        isSubmitting: false, 
        submitError: 'Failed to send message. Please try again.' 
      });
      return false;
    }
  },
  
  // Filter actions
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  
  clearFilters: () => set({
    filters: {
      status: '',
      priority: '',
      dateRange: { start: null, end: null },
    }
  }),
  
  // Computed getters
  getFilteredMessages: () => {
    const { messages, filters } = get();
    
    return messages.filter(message => {
      // Filter by status
      if (filters.status && message.status !== filters.status) return false;
      
      // Filter by priority
      if (filters.priority && message.priority !== filters.priority) return false;
      
      // Filter by date range
      if (filters.dateRange.start || filters.dateRange.end) {
        const messageDate = new Date(message.createdAt);
        if (filters.dateRange.start && messageDate < filters.dateRange.start) return false;
        if (filters.dateRange.end && messageDate > filters.dateRange.end) return false;
      }
      
      return true;
    });
  },
  
  getMessagesByStatus: (status) => {
    const { messages } = get();
    return messages.filter(m => m.status === status);
  },
  
  getUnreadCount: () => {
    const { messages } = get();
    return messages.filter(m => m.status === 'unread').length;
  },
  
  getStats: () => {
    const { messages } = get();
    const now = new Date();
    
    return {
      total: messages.length,
      unread: messages.filter(m => m.status === 'unread').length,
      replied: messages.filter(m => m.status === 'replied').length,
      thisMonth: messages.filter(m => {
        const messageDate = new Date(m.createdAt);
        return messageDate.getMonth() === now.getMonth() && 
               messageDate.getFullYear() === now.getFullYear();
      }).length,
    };
  },
  
  // Loading states
  setMessagesLoading: (loading) => set({ messagesLoading: loading }),
  setSubmitting: (submitting) => set({ isSubmitting: submitting }),
  setMessagesError: (error) => set({ messagesError: error }),
  setSubmitError: (error) => set({ submitError: error }),
  setSubmitSuccess: (success) => set({ submitSuccess: success }),
}));

export const useContactStore = createSelectors(useContactStoreBase);
