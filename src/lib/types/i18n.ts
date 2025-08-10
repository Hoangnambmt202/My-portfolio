// i18n related types
export type Locale = 'en' | 'vi';

export interface TranslationKeys {
  // Common
  common: {
    greeting: string;
    job: string;
    contact: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    clear: string;
    all: string;
    none: string;
    yes: string;
    no: string;
  };

  // Navigation
  navigation: {
    home: string;
    about: string;
    portfolio: string;
    blog: string;
    contact: string;
    projects: string;
    skills: string;
    experience: string;
  };

  // Home page
  home: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    moreAboutMe: string;
    welcomeMessage: string;
  };

  // About page
  about: {
    title: string;
    backdrop: string;
    personalInfo: string;
    firstName: string;
    lastName: string;
    birthday: string;
    address: string;
    nationality: string;
    phone: string;
    email: string;
    website: string;
    mySkills: string;
    whatCanIDo: string;
    webDevelopment: string;
    webDevelopmentDesc: string;
    mobileDevelopment: string;
    mobileDevelopmentDesc: string;
    uiuxDesign: string;
    uiuxDesignDesc: string;
    seoOptimization: string;
    seoOptimizationDesc: string;
  };

  // Contact page
  contact: {
    title: string;
    backdrop: string;
    getInTouch: string;
    dontBeShy: string;
    description: string;
    mailMe: string;
    callMe: string;
    yourName: string;
    yourEmail: string;
    yourSubject: string;
    yourMessage: string;
    sendMessage: string;
    sending: string;
    messageSent: string;
    messageSuccess: string;
    messageError: string;
  };

  // Portfolio page
  portfolio: {
    title: string;
    backdrop: string;
    myWork: string;
    allProjects: string;
    webDev: string;
    mobileDev: string;
    design: string;
    viewProject: string;
    sourceCode: string;
    liveDemo: string;
    technologies: string;
  };

  // Blog page
  blog: {
    title: string;
    backdrop: string;
    myBlog: string;
    readMore: string;
    readingTime: string;
    publishedOn: string;
    category: string;
    tags: string;
    noPostsFound: string;
    searchPlaceholder: string;
    filterByCategory: string;
    sortBy: string;
    sortByDate: string;
    sortByViews: string;
    sortByTitle: string;
  };

  // Form validation
  validation: {
    required: string;
    invalidEmail: string;
    minLength: string;
    maxLength: string;
    invalidPhone: string;
  };

  // Notifications
  notifications: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
}

export type TranslationKey = keyof TranslationKeys;
export type NestedTranslationKey<T> = T extends object 
  ? { [K in keyof T]: T[K] extends object 
      ? `${string & K}.${NestedTranslationKey<T[K]>}` 
      : string & K 
    }[keyof T]
  : never;

export type FlatTranslationKey = NestedTranslationKey<TranslationKeys>;
