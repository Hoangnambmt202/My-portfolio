import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
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
};

export default withNextIntl(nextConfig);
