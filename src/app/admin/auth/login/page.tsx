/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";
import { showToast } from "nextjs-toast-notify";
import LoaderInline from "@/components/common/LoaderInline";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/admin",
    });
    showToast.success("Đăng nhập thành công! Chào mừng quản trị viên", {
      duration: 2000,
    });

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Glassmorphism container */}
        <div className="backdrop-blur-lg bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">
              ĐĂNG NHẬP QUẢN TRỊ
            </h1>
            <p className="text-gray-500 opacity-80 text-sm">
              Vui lòng đăng nhập để truy cập hệ thống quản trị
            </p>
          </div>

          <div className="space-y-6">
            {/* Username field */}
            <div className="relative">
              <div className="absolute top-1/2 transform -translate-y-1/2 left-4 pointer-events-auto z-10">
                <User className="h-5 w-5 text-black" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Tên đăng nhập"
                className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border border-gray-500 border-opacity-20 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <div className="absolute top-1/2 transform -translate-y-1/2 left-4 pointer-events-auto z-10">
                <Lock className="h-5 w-5 text-black" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                className="w-full pl-12 pr-12 py-4 bg-white bg-opacity-10 border border-gray-500 border-opacity-20 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-blue-200 hover:text-white transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-blue-200 hover:text-white transition-colors" />
                )}
              </button>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoaderInline />
                  Đang đăng nhập...
                </div>
              ) : (
                "ĐĂNG NHẬP"
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-blue-100 opacity-60 text-sm">
              © 2025 Hệ thống quản trị. Được bảo vệ bởi bảo mật cao cấp.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-blue-400 border-opacity-30 rounded-full"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 border-2 border-purple-400 border-opacity-30 rounded-full"></div>
        <div className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-400 bg-opacity-20 rounded-full"></div>
        <div className="absolute top-1/4 -right-6 w-3 h-3 bg-purple-400 bg-opacity-20 rounded-full"></div>
      </div>
    </div>
  );
}
