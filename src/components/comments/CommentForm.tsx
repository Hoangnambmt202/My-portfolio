/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCommentStore } from "@/stores/feature/comment.store";
import { Send, Loader2 } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

interface CommentFormProps {
  parentId?: string;
  postId?: string;
  onSuccess?: () => void;
  autofocus?: boolean;
}

export default function CommentForm({
  parentId,
  postId,
  onSuccess,
  autofocus = false,
}: CommentFormProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const addCommentLocally = useCommentStore((state) => state.addCommentLocally);

  useEffect(() => {
    if (autofocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autofocus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !session) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), parentId, postId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to post comment");

      addCommentLocally(data);
      setContent("");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  if (!session) {
    return (
      <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-gray-200 dark:border-zinc-700 text-center text-sm md:text-base text-gray-500 dark:text-zinc-400">
        Please{" "}
        <Link
          href="/auth/login"
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          sign in
        </Link>{" "}
        to leave a comment.
      </div>
    );
  }

  const userObj = session.user as unknown as {
    avatar?: string;
    image?: string;
  };
  const avatarUrl = userObj?.image || userObj?.avatar;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 items-start w-full transition-all duration-300"
    >
      <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={session.user.name || "User"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full font-bold text-gray-500 dark:text-zinc-400">
            {session.user?.name?.[0]?.toUpperCase() || "U"}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <textarea
          ref={inputRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            parentId ? "Write a reply..." : "Add to the discussion..."
          }
          className="w-full min-h-[50px] max-h-40 p-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-y text-sm transition-all placeholder:text-gray-400"
          disabled={isLoading}
          maxLength={500}
        />

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {content.length}/500 chars
          </span>
          <div className="flex items-center gap-3">
            {error && <span className="text-xs text-red-500">{error}</span>}
            <button
              type="submit"
              disabled={isLoading || !content.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {parentId ? "Reply" : "Post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
