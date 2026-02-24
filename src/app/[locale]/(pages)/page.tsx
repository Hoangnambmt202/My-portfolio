import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ServicesSection from "@/components/sections/ServicesSection";

export default function HomePage() {
  return (
    <>
      <Header />

      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Portfolio Section */}
        <PortfolioSection />

        {/* Services Section */}
        <ServicesSection />

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
