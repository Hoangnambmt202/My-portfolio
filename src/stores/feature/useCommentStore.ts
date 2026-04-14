/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { CommentType } from "@/types/features/comment";

interface CommentState {
  comments: CommentType[];
  isLoading: boolean;
  error: string | null;

  fetchComments: (postId?: string) => Promise<void>;
  addCommentLocally: (comment: CommentType) => void;
  removeCommentLocally: (id: string, parentId: string | null) => void;
  updateCommentLocally: (
    id: string,
    content: string,
    parentId: string | null,
  ) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  isLoading: false,
  error: null,

  fetchComments: async (postId?: string) => {
    set({ isLoading: true, error: null });
    try {
      const url = postId ? `/api/comments?postId=${postId}` : "/api/comments";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      set({ comments: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCommentLocally: (comment) => {
    set((state) => {
      if (!comment.parentId) {
        return { comments: [comment, ...state.comments] };
      }

      // If it's a reply, find the parent and push to its replies
      const newComments = state.comments.map((parent) => {
        if (parent.id === comment.parentId) {
          const newReplies = parent.replies
            ? [...parent.replies, comment]
            : [comment];
          return { ...parent, replies: newReplies };
        }
        return parent;
      });
      return { comments: newComments };
    });
  },

  removeCommentLocally: (id, parentId) => {
    set((state) => {
      if (!parentId) {
        return { comments: state.comments.filter((c) => c.id !== id) };
      }

      const newComments = state.comments.map((parent) => {
        if (parent.id === parentId && parent.replies) {
          return {
            ...parent,
            replies: parent.replies.filter((r) => r.id !== id),
          };
        }
        return parent;
      });
      return { comments: newComments };
    });
  },

  updateCommentLocally: (id, content, parentId) => {
    set((state) => {
      if (!parentId) {
        return {
          comments: state.comments.map((c) =>
            c.id === id ? { ...c, content } : c,
          ),
        };
      }

      const newComments = state.comments.map((parent) => {
        if (parent.id === parentId && parent.replies) {
          return {
            ...parent,
            replies: parent.replies.map((r) =>
              r.id === id ? { ...r, content } : r,
            ),
          };
        }
        return parent;
      });
      return { comments: newComments };
    });
  },
}));
