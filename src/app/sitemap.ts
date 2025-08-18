import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://your-domain.com";
	const locales = ["en", "vi"] as const;

	const pages = [
		"",
		"/about",
		"/blog",
		"/contact",
		"/portfolio",
	];

	const now = new Date();

	return locales.flatMap((locale) =>
		pages.map((path) => ({
			url: `${baseUrl}/${locale}${path}`,
			lastModified: now,
			changeFrequency:
				path === "" ? "daily" : path === "/blog" ? "weekly" : path === "/about" ? "monthly" : "yearly",
			priority: path === "" ? 1.0 : path === "/blog" ? 0.9 : path === "/about" ? 0.8 : 0.6,
		}))
	);
}
