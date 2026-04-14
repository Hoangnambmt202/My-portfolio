"use client";

import React from "react";

interface LoaderPageProps {
  text?: string;
}

export default function LoaderPage({ text = "Loading..." }: LoaderPageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="relative flex flex-col items-center gap-6">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-slate-400 text-sm tracking-wide">{text}</p>
      </div>
    </div>
  );
}
