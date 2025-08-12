import { create } from 'zustand';
import type { Project, Skill, Experience } from '@/lib/types/portfolio';

interface PortfolioState {
  // Projects
  projects: Project[];
  featuredProjects: Project[];
  selectedProject: Project | null;
  projectsLoading: boolean;
  projectsError: string | null;
  
  // Skills
  skills: Skill[];
  skillCategories: string[];
  skillsLoading: boolean;
  
  // Experience
  experiences: Experience[];
  experiencesLoading: boolean;
  
  // Filters
  filters: {
    category: string;
    technology: string;
    status: string;
  };
  
  // Actions
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setSelectedProject: (project: Project | null) => void;
  
  setSkills: (skills: Skill[]) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (name: string, updates: Partial<Skill>) => void;
  
  setExperiences: (experiences: Experience[]) => void;
  
  setFilter: (key: keyof PortfolioState['filters'], value: string) => void;
  clearFilters: () => void;
  
  // Computed getters
  getFilteredProjects: () => Project[];
  getProjectsByCategory: (category: string) => Project[];
  getSkillsByCategory: (category: string) => Skill[];
  
  // Loading states
  setProjectsLoading: (loading: boolean) => void;
  setSkillsLoading: (loading: boolean) => void;
  setExperiencesLoading: (loading: boolean) => void;
  setProjectsError: (error: string | null) => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  // Initial state
  projects: [],
  featuredProjects: [],
  selectedProject: null,
  projectsLoading: false,
  projectsError: null,
  
  skills: [],
  skillCategories: ['frontend', 'backend', 'database', 'devops', 'design', 'other'],
  skillsLoading: false,
  
  experiences: [],
  experiencesLoading: false,
  
  filters: {
    category: '',
    technology: '',
    status: '',
  },
  
  // Project actions
  setProjects: (projects) => {
    const featured = projects.filter(p => p.featured);
    set({ projects, featuredProjects: featured });
  },
  
  addProject: (project) => set((state) => {
    const newProjects = [...state.projects, project];
    const featured = newProjects.filter(p => p.featured);
    return { projects: newProjects, featuredProjects: featured };
  }),
  
  updateProject: (id, updates) => set((state) => {
    const projects = state.projects.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    const featured = projects.filter(p => p.featured);
    return { projects, featuredProjects: featured };
  }),
  
  deleteProject: (id) => set((state) => {
    const projects = state.projects.filter(p => p.id !== id);
    const featured = projects.filter(p => p.featured);
    return { projects, featuredProjects: featured };
  }),
  
  setSelectedProject: (project) => set({ selectedProject: project }),
  
  // Skill actions
  setSkills: (skills) => set({ skills }),
  
  addSkill: (skill) => set((state) => ({
    skills: [...state.skills, skill]
  })),
  
  updateSkill: (name, updates) => set((state) => ({
    skills: state.skills.map(s => 
      s.name === name ? { ...s, ...updates } : s
    )
  })),
  
  // Experience actions
  setExperiences: (experiences) => set({ experiences }),
  
  // Filter actions
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value }
  })),
  
  clearFilters: () => set({
    filters: { category: '', technology: '', status: '' }
  }),
  
  // Computed getters
  getFilteredProjects: () => {
    const { projects, filters } = get();
    return projects.filter(project => {
      if (filters.category && project.category !== filters.category) return false;
      if (filters.status && project.status !== filters.status) return false;
      if (filters.technology && !project.technologies.includes(filters.technology)) return false;
      return true;
    });
  },
  
  getProjectsByCategory: (category) => {
    const { projects } = get();
    return projects.filter(p => p.category === category);
  },
  
  getSkillsByCategory: (category) => {
    const { skills } = get();
    return skills.filter(s => s.category === category);
  },
  
  // Loading states
  setProjectsLoading: (loading) => set({ projectsLoading: loading }),
  setSkillsLoading: (loading) => set({ skillsLoading: loading }),
  setExperiencesLoading: (loading) => set({ experiencesLoading: loading }),
  setProjectsError: (error) => set({ projectsError: error }),
}));