import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import BackToTopButton from "@/components/common/BackToTopButton";
import { SanityLive } from "@/sanity/lib/live";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Personal portfolio website showcasing my projects and skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${inter.variable} ${poppins.variable} ${roboto.variable}`}
    >
      <body
        className="bg-[#202020] min-h-screen scrollbar-thin
          scrollbar-thumb-gray-400
          scrollbar-track-transparent
          scrollbar-thumb-rounded-full"
      >
        <Providers>{children}</Providers>
        <BackToTopButton />
        <SanityLive />
        <SpeedInsights />
      </body>
    </html>
  );
}
