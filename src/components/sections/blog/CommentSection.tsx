"use client";

import CommentForm from "../../comments/CommentForm";
import CommentList from "../../comments/CommentList";

export default function CommentSection({ postId }: { postId?: string }) {
  return (
    <section className="w-full mt-12 py-6 md:py-8 bg-transparent">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          Discussion
        </h3>
      </div>

      <div className="bg-slate-900/60 p-4 md:p-6 rounded-2xl border border-slate-800 mb-8 backdrop-blur-sm">
        <CommentForm postId={postId} />
      </div>

      <CommentList postId={postId} />
    </section>
  );
}
