"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { CommentType } from "@/types/features/comment";
import { useCommentStore } from "@/stores/feature/useCommentStore";
import CommentForm from "./CommentForm";
import Image from "next/image";
import { Trash2, MessageSquareReply, Clock } from "lucide-react";

interface CommentItemProps {
  comment: CommentType;
  isReply?: boolean;
}

export default function CommentItem({
  comment,
  isReply = false,
}: CommentItemProps) {
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const removeCommentLocally = useCommentStore(
    (state) => state.removeCommentLocally,
  );

  const isOwner = session?.user?.id === comment.userId;
  const isAdmin = session?.user?.role === "ADMIN";
  const canDelete = isOwner || isAdmin;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/comments/${comment.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      removeCommentLocally(comment.id, comment.parentId);
    } catch (error) {
      console.error(error);
      alert("Error deleting comment");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) return d.toLocaleDateString();
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <div
      className={`flex flex-col gap-3 py-4 ${!isReply ? "border-b border-gray-100 dark:border-zinc-800/60" : "mt-2"} transition-opacity ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800">
          {comment.user?.avatar ? (
            <Image
              src={comment.user.avatar}
              alt={comment.user.name || "User"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full font-bold text-gray-500 dark:text-zinc-400">
              {comment.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 cursor-default">
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              {comment.user?.name || "Anonymous"}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock size={12} />
              {formatDate(comment.createdAt)}
            </span>
            {isOwner && (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                You
              </span>
            )}
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap word-break break-words leading-relaxed">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            {!isReply && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-xs font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
              >
                <MessageSquareReply size={14} />
                Reply
              </button>
            )}

            {canDelete && (
              <button
                onClick={handleDelete}
                className="text-xs font-medium text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {isReplying && !isReply && (
        <div className="pl-14 pt-2 -mb-2">
          <CommentForm
            parentId={comment.id}
            onSuccess={() => setIsReplying(false)}
            autofocus
          />
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-6 md:pl-10 mt-2 border-l-2 border-gray-100 dark:border-zinc-800 ml-4">
          <div className="flex flex-col gap-2">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isReply />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
