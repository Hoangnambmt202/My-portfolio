import type { Metadata } from "next";
import {
  Inter,
  Poppins,
  Roboto,
  Playfair_Display,
  JetBrains_Mono,
  Pacifico,
} from "next/font/google";
import BackToTopButton from "@/components/common/BackToTopButton";
import { SanityLive } from "@/sanity/lib/live";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import Providers from "./providers";
import { auth } from "@/lib/api/auth";

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
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair-display",
  display: "swap",
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Coder To Data | Web Developer | Next.js | WordPress",
  description: "Personal portfolio website showcasing my projects and skills",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html
      className={`${inter.variable} ${poppins.variable} ${roboto.variable} ${playfair_display.variable} ${jetbrains_mono.variable} ${pacifico.variable}`}
    >
      <body
        className="bg-[#202020] min-h-screen scrollbar-thin
          scrollbar-thumb-gray-400
          scrollbar-track-transparent
          scrollbar-thumb-rounded-full"
      >
        <Providers session={session}>{children}</Providers>
        <BackToTopButton />
        <SanityLive />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
