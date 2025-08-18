import type { Metadata } from "next";
import "@/styles/globals.css";

import Sidebar from "@/components/layout/Sidebar";
import { I18nProvider } from "@/components/providers/I18nProvider";



export const metadata: Metadata = {
	title: "My Portfolio",
	description: "Personal portfolio website showcasing my projects and skills",
};

export default function LocaleLayout({
	children,

}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	return (
		<I18nProvider>
			<Sidebar />
			<main className="bg-[#202020] min-h-screen py-8">
				{children}
			</main>
		</I18nProvider>
	);
}