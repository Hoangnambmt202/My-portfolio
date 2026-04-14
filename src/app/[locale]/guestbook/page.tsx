"use client";

import CommentSection from "@/components/sections/blog/CommentSection";

export default function GuestbookPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Guestbook
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Leave a comment below! Share your thoughts on my portfolio, projects,
          or just say hello.
        </p>
      </div>

      <CommentSection postId="guestbook" />
    </div>
  );
}
