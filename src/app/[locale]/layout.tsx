import type { Metadata } from "next";
import "@/styles/globals.css";
import { I18nProvider } from "@/components/providers/I18nProvider";



export const metadata: Metadata = {
	title: "My Portfolio",
	description: "Personal portfolio website showcasing my projects and skills",
};
export async function generateStaticParams() {
	return [{ locale: "en" }, { locale: "vi" }];
  }
  
export default function LocaleLayout({
	children,

}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	return (
		<I18nProvider>
			
			<main className="bg-[#202020] min-h-screen">
				{children}
			</main>
		</I18nProvider>
	);
}