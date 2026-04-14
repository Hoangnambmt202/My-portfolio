"use client";

import { useState, FormEvent } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempted:", { email });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Email */}
      <div className="space-y-1.5">
        <label
          className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1"
          htmlFor="email"
        >
          Email Address
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">
            mail
          </span>
          <input
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg py-3 pl-11 pr-4 text-on-background placeholder:text-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            id="email"
            name="email"
            type="email"
            placeholder="alchemist@codertodata.io"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center px-1">
          <label
            className="text-xs font-semibold uppercase tracking-wider text-slate-500"
            htmlFor="password"
          >
            Password
          </label>
          <a
            className="text-xs font-medium text-primary hover:text-primary-fixed-dim transition-colors"
            href="#"
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">
            lock
          </span>
          <input
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg py-3 pl-11 pr-4 text-on-background placeholder:text-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
      </div>

      <button
        className="w-full bg-primary hover:bg-primary-container text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 active:scale-95 transition-all mt-4 cursor-pointer"
        type="submit"
      >
        Continue
      </button>
    </form>
  );
}
