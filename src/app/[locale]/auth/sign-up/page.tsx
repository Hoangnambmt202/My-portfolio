"use client";

import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px]" />

      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-12">
        {/* LEFT */}
        <section className="flex-1 max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            codertodata
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-blue-400">
            Join the Lab
          </h2>

          <p className="text-slate-400 text-lg">
            Start your journey from code to data mastery today.
          </p>
        </section>

        {/* RIGHT */}
        <section className="flex-1 w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold">Create Account</h3>
              <p className="text-slate-400 text-sm">
                Fill in your details to get started
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-xs text-slate-400">Full Name</label>
                <input
                  className="w-full mt-2 bg-slate-900/60 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-slate-400">Email</label>
                <input
                  className="w-full mt-2 bg-slate-900/60 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-xs text-slate-400">Password</label>
                <input
                  className="w-full mt-2 bg-slate-900/60 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-lg font-semibold active:scale-95"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="border-t border-slate-700" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-950 px-3 text-xs text-slate-500">
                OR
              </span>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-slate-800 hover:bg-slate-700 transition py-3 rounded-lg text-sm font-medium">
                Google
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 transition py-3 rounded-lg text-sm font-medium">
                LinkedIn
              </button>
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">
                Sign in
              </span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
