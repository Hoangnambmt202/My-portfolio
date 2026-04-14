import { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BlogSection from "@/components/sections/blog/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import MindsetSection from "@/components/sections/MindsetSection";

import ExperiencesSection from "@/components/sections/ExperiencesSection";
import CaseStudySection from "@/components/sections/project/CaseStudySection";
import ToolboxSection from "@/components/sections/toolbox/ToolBoxSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Coder To Data | Web Developer | Next.js | WordPress",
  description: "Personal portfolio website showcasing my projects and skills",
};

export default async function HomePage() {
  return (
    <>
      <Header />

      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        <MindsetSection />

        <ToolboxSection />

        {/* Portfolio Section */}
        <CaseStudySection />

        {/* Services Section */}
        <ServicesSection />
        {/* Experiences Section */}
        <ExperiencesSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
