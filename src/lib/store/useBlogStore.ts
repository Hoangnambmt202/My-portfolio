import { create } from 'zustand';
import { createSelectors } from './utils/selectors';
import type { BlogPost, Comment, Author, BlogCategory } from '@/lib/types/blog';

interface BlogState {
  // Posts
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  selectedPost: BlogPost | null;
  postsLoading: boolean;
  postsError: string | null;
  
  // Comments
  comments: Comment[];
  commentsLoading: boolean;
  
  // Categories and tags
  categories: BlogCategory[];
  tags: string[];
  
  // Filters and search
  filters: {
    category: BlogCategory | '';
    tag: string;
    author: string;
    published: boolean | null;
  };
  searchQuery: string;
  sortBy: 'date' | 'views' | 'title';
  sortOrder: 'asc' | 'desc';
  
  // Pagination
  pagination: {
    currentPage: number;
    postsPerPage: number;
    totalPosts: number;
    totalPages: number;
  };
  
  // Actions - Posts
  setPosts: (posts: BlogPost[]) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, updates: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  setSelectedPost: (post: BlogPost | null) => void;
  incrementViews: (id: string) => void;
  
  // Actions - Comments
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  updateComment: (id: string, updates: Partial<Comment>) => void;
  deleteComment: (id: string) => void;
  approveComment: (id: string) => void;
  
  // Actions - Filters
  setFilter: (key: keyof BlogState['filters'], value: BlogState['filters'][keyof BlogState['filters']]) => void;
  clearFilters: () => void;
  setSearchQuery: (query: string) => void;
  setSorting: (sortBy: BlogState['sortBy'], sortOrder: BlogState['sortOrder']) => void;
  
  // Actions - Pagination
  setCurrentPage: (page: number) => void;
  setPostsPerPage: (perPage: number) => void;
  
  // Computed getters
  getFilteredPosts: () => BlogPost[];
  getPostsByCategory: (category: BlogCategory) => BlogPost[];
  getPostsByTag: (tag: string) => BlogPost[];
  getPostsByAuthor: (authorEmail: string) => BlogPost[];
  getRelatedPosts: (postId: string, limit?: number) => BlogPost[];
  getCommentsForPost: (postId: string) => Comment[];
  
  // Loading states
  setPostsLoading: (loading: boolean) => void;
  setCommentsLoading: (loading: boolean) => void;
  setPostsError: (error: string | null) => void;
}

const useBlogStoreBase = create<BlogState>((set, get) => ({
  // Initial state
  posts: [],
  featuredPosts: [],
  selectedPost: null,
  postsLoading: false,
  postsError: null,
  
  comments: [],
  commentsLoading: false,
  
  categories: ['technology', 'tutorial', 'thoughts', 'news', 'case-study', 'other'],
  tags: [],
  
  filters: {
    category: '',
    tag: '',
    author: '',
    published: null,
  },
  searchQuery: '',
  sortBy: 'date',
  sortOrder: 'desc',
  
  pagination: {
    currentPage: 1,
    postsPerPage: 6,
    totalPosts: 0,
    totalPages: 0,
  },
  
  // Post actions
  setPosts: (posts) => {
    const featured = posts.filter(p => p.featured);
    const allTags = [...new Set(posts.flatMap(p => p.tags))];
    
    set((state) => ({
      posts,
      featuredPosts: featured,
      tags: allTags,
      pagination: {
        ...state.pagination,
        totalPosts: posts.length,
        totalPages: Math.ceil(posts.length / state.pagination.postsPerPage),
      }
    }));
  },
  
  addPost: (post) => set((state) => {
    const newPosts = [...state.posts, post];
    const featured = newPosts.filter(p => p.featured);
    const allTags = [...new Set(newPosts.flatMap(p => p.tags))];
    
    return {
      posts: newPosts,
      featuredPosts: featured,
      tags: allTags,
      pagination: {
        ...state.pagination,
        totalPosts: newPosts.length,
        totalPages: Math.ceil(newPosts.length / state.pagination.postsPerPage),
      }
    };
  }),
  
  updatePost: (id, updates) => set((state) => {
    const posts = state.posts.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    const featured = posts.filter(p => p.featured);
    
    return { posts, featuredPosts: featured };
  }),
  
  deletePost: (id) => set((state) => {
    const posts = state.posts.filter(p => p.id !== id);
    const featured = posts.filter(p => p.featured);
    
    return {
      posts,
      featuredPosts: featured,
      pagination: {
        ...state.pagination,
        totalPosts: posts.length,
        totalPages: Math.ceil(posts.length / state.pagination.postsPerPage),
      }
    };
  }),
  
  setSelectedPost: (post) => set({ selectedPost: post }),
  
  incrementViews: (id) => set((state) => ({
    posts: state.posts.map(p => 
      p.id === id ? { ...p, views: p.views + 1 } : p
    )
  })),
  
  // Comment actions
  setComments: (comments) => set({ comments }),
  
  addComment: (comment) => set((state) => ({
    comments: [...state.comments, comment]
  })),
  
  updateComment: (id, updates) => set((state) => ({
    comments: state.comments.map(c => 
      c.id === id ? { ...c, ...updates } : c
    )
  })),
  
  deleteComment: (id) => set((state) => ({
    comments: state.comments.filter(c => c.id !== id)
  })),
  
  approveComment: (id) => set((state) => ({
    comments: state.comments.map(c => 
      c.id === id ? { ...c, approved: true } : c
    )
  })),
  
  // Filter actions
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value },
    pagination: { ...state.pagination, currentPage: 1 }
  })),
  
  clearFilters: () => set((state) => ({
    filters: { category: '', tag: '', author: '', published: null },
    searchQuery: '',
    pagination: { ...state.pagination, currentPage: 1 }
  })),
  
  setSearchQuery: (query) => set((state) => ({
    searchQuery: query,
    pagination: { ...state.pagination, currentPage: 1 }
  })),
  
  setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),
  
  // Pagination actions
  setCurrentPage: (page) => set((state) => ({
    pagination: { ...state.pagination, currentPage: page }
  })),
  
  setPostsPerPage: (perPage) => set((state) => ({
    pagination: {
      ...state.pagination,
      postsPerPage: perPage,
      totalPages: Math.ceil(state.pagination.totalPosts / perPage),
      currentPage: 1
    }
  })),
  
  // Computed getters
  getFilteredPosts: () => {
    const { posts, filters, searchQuery, sortBy, sortOrder } = get();
    
    const filtered = posts.filter(post => {
      // Filter by category
      if (filters.category && post.category !== filters.category) return false;
      
      // Filter by tag
      if (filters.tag && !post.tags.includes(filters.tag)) return false;
      
      // Filter by author
      if (filters.author && post.author.email !== filters.author) return false;
      
      // Filter by published status
      if (filters.published !== null && post.published !== filters.published) return false;
      
      // Search in title, excerpt, and content
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
    
    // Sort posts
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.publishedAt || a.createdAt).getTime() - 
                      new Date(b.publishedAt || b.createdAt).getTime();
          break;
        case 'views':
          comparison = a.views - b.views;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return filtered;
  },
  
  getPostsByCategory: (category) => {
    const { posts } = get();
    return posts.filter(p => p.category === category);
  },
  
  getPostsByTag: (tag) => {
    const { posts } = get();
    return posts.filter(p => p.tags.includes(tag));
  },
  
  getPostsByAuthor: (authorEmail) => {
    const { posts } = get();
    return posts.filter(p => p.author.email === authorEmail);
  },
  
  getRelatedPosts: (postId, limit = 3) => {
    const { posts } = get();
    const currentPost = posts.find(p => p.id === postId);
    if (!currentPost) return [];
    
    // Find posts with similar tags or category
    const related = posts
      .filter(p => p.id !== postId && p.published)
      .map(post => {
        let score = 0;
        
        // Same category gets higher score
        if (post.category === currentPost.category) score += 3;
        
        // Shared tags get points
        const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
        score += sharedTags.length;
        
        return { post, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.post);
    
    return related;
  },
  
  getCommentsForPost: (postId) => {
    const { comments } = get();
    return comments.filter(c => c.postId === postId && c.approved);
  },
  
  // Loading states
  setPostsLoading: (loading) => set({ postsLoading: loading }),
  setCommentsLoading: (loading) => set({ commentsLoading: loading }),
  setPostsError: (error) => set({ postsError: error }),
}));

export const useBlogStore = createSelectors(useBlogStoreBase);