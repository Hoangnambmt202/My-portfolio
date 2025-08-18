"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUser, FaBriefcase, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { useScrollPosition } from "@/lib/hooks";
import { useLoading, useNavigation } from "@/lib/hooks/useStores";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

export default function Sidebar() {
	const scrollPosition = useScrollPosition();
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const pathname = usePathname();

	const { setLoading } = useLoading();
	const { setCurrentPath, setNavigating } = useNavigation();
	const { t, locale } = useTranslation();

	const navLinks = [
		{
			name: t("navigation.home"),
			icon: <FaHome className="w-5 h-5" />,
			href: `/${locale}`,
			color: "hover:text-blue-400",
		},
		{
			name: t("navigation.about"),
			icon: <FaUser className="w-5 h-5" />,
			href: `/${locale}/about`,
			color: "hover:text-blue-600",
		},
		{
			name: t("navigation.portfolio"),
			icon: <FaBriefcase className="w-5 h-5" />,
			href: `/${locale}/portfolio`,
			color: "hover:text-blue-400",
		},
		{
			name: t("navigation.contact"),
			icon: <FaPhoneAlt className="w-5 h-5" />,
			href: `/${locale}/contact`,
			color: "hover:text-blue-400",
		},
		{
			name: t("navigation.blog"),
			icon: <FaBookOpenReader className="w-5 h-5" />,
			href: `/${locale}/blog`,
			color: "hover:text-blue-400",
		},
	];

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(scrollPosition < lastScrollY);
			setLastScrollY(scrollPosition);
		};

		handleScroll();
	}, [scrollPosition, lastScrollY]);

	useEffect(() => {
		setCurrentPath(pathname);
	}, [pathname, setCurrentPath]);

	const handleClick = (href: string) => {
		setLoading(true, t("common.loading"));
		setNavigating(true);
		setCurrentPath(href);
		setIsMobileOpen(false);
	};

	return (
		<>
			{/* Desktop Sidebar */}
			<motion.aside
				initial={{ opacity: 1, x: 100 }}
				animate={{ x: isVisible ? 0 : 20 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="hidden lg:block fixed right-12 top-1/2 -translate-y-1/2 z-50"
			>
				<div className="flex flex-col items-center space-y-6">
					<div className="mb-4">
						<LanguageSwitcher
							variant="dropdown"
							size="sm"
							showLabel={false}
							className="bg-white/10 backdrop-blur-sm rounded-lg p-1"
						/>
					</div>

					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className={`p-3 rounded-full bg-white border shadow-lg ${link.color} ${
								pathname === link.href ? "focus:bg-blue-400 focus:text-white" : ""
							} hover:scale-110 transition-transform group`}
							onClick={() => handleClick(link.href)}
						>
							<div className="relative">
								{link.icon}
								<span className="absolute right-full mr-5 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
									{link.name}
								</span>
							</div>
						</Link>
					))}
					<div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-30" />
				</div>
			</motion.aside>

			{/* Mobile Button */}
			<button
				onClick={() => setIsMobileOpen(true)}
				className="lg:hidden fixed top-6 right-6 z-50 p-4 rounded-full bg-gray-400 text-white shadow-lg"
			>
				<FaBars size={20} />
			</button>

			{/* Mobile Sidebar Overlay */}
			<AnimatePresence>
				{isMobileOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black z-40"
							onClick={() => setIsMobileOpen(false)}
						/>

						{/* Sidebar Panel */}
						<motion.aside
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "tween", duration: 0.3 }}
							className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg p-6 flex flex-col"
						>
							<div className="flex justify-between items-center mb-6">
								<div>
									<h2 className="text-lg font-bold">NAM GO PHIM </h2>
									<h4 className="text-sm font-light mt-1">WEB DEVELOPER</h4>
								</div>
								<button onClick={() => setIsMobileOpen(false)}>
									<FaTimes size={20} />
								</button>
							</div>

							<LanguageSwitcher
								variant="dropdown"
								size="sm"
								showLabel={true}
								className="mb-6"
							/>

							<nav className="flex flex-col space-y-4">
								{navLinks.map((link) => (
									<Link
										key={link.name}
										href={link.href}
										className={`flex items-center space-x-3 p-2 rounded ${
											pathname === link.href ? "bg-blue-100 text-blue-600" : ""
										}`}
										onClick={() => handleClick(link.href)}
									>
										{link.icon}
										<span>{link.name}</span>
									</Link>
								))}
							</nav>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
