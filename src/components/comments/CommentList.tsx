"use client";

import { useEffect } from "react";
import { useCommentStore } from "@/stores/feature/comment.store";
import CommentItem from "./CommentItem";
import { Loader2 } from "lucide-react";

export default function CommentList({ postId }: { postId?: string }) {
  const { comments, isLoading, error, fetchComments } = useCommentStore();

  useEffect(() => {
    fetchComments(postId);
  }, [fetchComments, postId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-xl text-center">
        Failed to load comments. {error}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="py-10 text-center text-gray-400 italic bg-gray-50 dark:bg-zinc-800/20 rounded-xl border border-dashed border-gray-200 dark:border-zinc-700">
        No comments yet. Be the first to start the discussion!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
