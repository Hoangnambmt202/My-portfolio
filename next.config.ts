import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.careerviet.vn",
      "cdn.vietnambiz.vn",
      "cdn.pixabay.com",
      "i.imgur.com",
      "lh3.googleusercontent.com",
    ],
  },
  i18n: {
    locales: ["en", "vi"], // Danh sách ngôn ngữ
    defaultLocale: "en", // Ngôn ngữ mặc định
  },
};

export default nextConfig;
