import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from 'next/font/google'
import "@/styles/globals.css";

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-poppins',
	display: 'swap',
});

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '700'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: "My Portfolio",
	description: "Personal portfolio website showcasing my projects and skills",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html className={`${roboto.className} ${poppins.className} ${inter.variable}`}>
			<body>{children}</body>
		</html>
	);
}