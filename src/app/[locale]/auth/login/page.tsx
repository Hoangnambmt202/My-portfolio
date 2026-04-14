"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";

export default function LoginPage() {
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
            The Digital Alchemist
          </h2>

          <p className="text-slate-400 text-lg">
            Transmuting raw logic into refined intelligence.
          </p>
        </section>

        {/* RIGHT */}
        <section className="flex-1 w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold">Welcome Back</h3>
              <p className="text-slate-400 text-sm">Enter your credentials</p>
            </div>

            {/* Form */}
            <form className="space-y-5">
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
                Continue
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
              <button className="bg-red-400 hover:bg-red-300 transition py-3 rounded-lg text-sm font-medium">
                Google
              </button>
              <button className="bg-blue-500 hover:bg-blue-400 transition py-3 rounded-lg text-sm font-medium">
                LinkedIn
              </button>
            </div>

            {/* Footer */}
            <Link
              href={"/auth/sign-up"}
              className="mt-6 text-center text-sm text-slate-400 block"
            >
              Don&apos;t have an account?{" "}
              <span className="text-blue-400 hover:underline cursor-pointer">
                Sign up
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
