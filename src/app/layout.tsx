import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import {
  Inter,
  Poppins,
  Roboto,
  Playfair_Display,
  JetBrains_Mono,
  Pacifico,
} from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import "@/styles/globals.css";
import Providers from "./providers";
import { auth } from "@/lib/api/auth";
import BackToTopButton from "@/components/common/BackToTopButton";

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
  metadataBase: new URL("https://codertodata.dev"),
  title: {
    default: "Coder To Data | Web Developer | Next.js | WordPress",
    template: "%s | Coder To Data",
  },
  description:
    "CoderToData is a portfolio website show my skills, projects and experiences. I am a web developer with experience in Next.js, WordPress, DevOps, backend, frontend and software engineering.",
  keywords: [
    "Coder To Data",
    "Web Developer",
    "Next.js",
    "WordPress",
    "DevOps",
    "Backend",
    "Frontend",
    "Software Engineering",
  ],
  authors: [{ name: "Coder To Data" }],
  creator: "Coder To Data",
  publisher: "Coder To Data",
  openGraph: {
    title: "Coder To Data | Web Developer | Next.js | WordPress",
    description:
      "CoderToData is a portfolio website show my skills, projects and experiences. I am a web developer with experience in Next.js, WordPress, DevOps, backend, frontend and software engineering.",
    url: "https://codertodata.dev",
    siteName: "Coder To Data",
    images: [
      {
        url: "https://codertodata.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Coder To Data",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coder To Data | Web Developer | Next.js | WordPress",
    description:
      "CoderToData is a portfolio website show my skills, projects and experiences. I am a web developer with experience in Next.js, WordPress, DevOps, backend, frontend and software engineering.",
    images: ["https://codertodata.dev/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
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
      lang="en"
      suppressHydrationWarning
    >
      <body className="bg-[#202020] min-h-screen ">
        <Providers session={session}>{children}</Providers>
        <BackToTopButton />
        <SanityLive />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
