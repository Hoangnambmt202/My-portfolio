"use client";
import { FileText, Terminal } from "lucide-react";
import { LanguageSwitcher } from "../common/LanguageSwitcher";

export default function Header() {
  // const [scrolled, setScrolled] = useState(false);
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const t = useTranslations("nav"); // Namespace 'nav'

  // const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001,
  // });

  // useEffect(() => {
  //   document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  //   document.addEventListener("scroll", () => {
  //     if (window.scrollY === 0 && !mobileMenuOpen) {
  //       setScrolled(false);
  //       return;
  //     } else {
  //       setScrolled(true);
  //     }
  //   });
  // }, [mobileMenuOpen]);

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  // const menuItems = [
  //   { name: t("portfolio"), href: "#portfolio" },
  //   { name: t("services"), href: "#services" },
  //   { name: t("blog"), href: "#blog" },
  //   { name: t("contact"), href: "#contact" },
  // ];

  return (
    // <header
    //   className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    //     scrolled
    //       ? "bg-slate-900/95 backdrop-blur-md shadow-lg shadow-cyan-500/10"
    //       : "bg-transparent"
    //   }`}
    // >
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
    //     {/* Logo */}
    //     <Link
    //       href=""
    //       onClick={scrollToTop}
    //       className="flex items-center space-x-2 group cursor-pointer"
    //     >
    //       <Terminal className="w-8 h-8 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
    //       <span className="text-2xl font-bold text-gradient">CoderToData</span>
    //     </Link>

    //     {/* Desktop menu */}
    //     <nav className="hidden md:flex items-center space-x-2">
    //       {menuItems.map((item) => (
    //         <a
    //           key={item.name}
    //           href={item.href}
    //           className="px-4 py-2 text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
    //         >
    //           {item.name}
    //         </a>
    //       ))}

    //       {/* Nút chuyển đổi ngôn ngữ */}
    //       <div className="ml-2">
    //         <LanguageSwitcher size="sm" variant="dropdown" showLabel={false} />
    //       </div>

    //       <button className="ml-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20">
    //         <Phone className="inline w-4 h-4 mr-2" />
    //         {t("phone")}
    //       </button>
    //     </nav>

    //     {/* Mobile menu button */}
    //     <div className="flex items-center gap-4 md:hidden">
    //       <LanguageSwitcher size="sm" showLabel={false} />
    //       <button
    //         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    //         className="p-2 text-slate-300 hover:text-cyan-400 transition-colors"
    //       >
    //         {mobileMenuOpen ? (
    //           <X className="w-6 h-6" />
    //         ) : (
    //           <Menu className="w-6 h-6" />
    //         )}
    //       </button>
    //     </div>
    //   </div>

    //   {/* Mobile menu */}
    //   {mobileMenuOpen && (
    //     <div className="md:hidden bg-slate-900/98 border-t border-cyan-500/20 py-6 px-4 absolute top-full left-0 right-0 shadow-2xl">
    //       {menuItems.map((item) => (
    //         <a
    //           key={item.name}
    //           href={item.href}
    //           onClick={() => setMobileMenuOpen(false)}
    //           className="block py-3 text-slate-300 hover:text-cyan-400 transition font-medium border-b border-slate-800 last:border-none"
    //         >
    //           {item.name}
    //         </a>
    //       ))}
    //     </div>
    //   )}

    //   <motion.div
    //     className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 origin-left"
    //     style={{ scaleX }}
    //   />
    // </header>

    <header className="flex flex-col items-start px-8 py-0 relative bg-[#1E293B] border border-solid border-slate-800">
      <div className="flex h-20 items-center justify-between pl-0 pr-[0.01px] py-0 relative self-stretch w-full">
        <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
          <div className="flex w-10 h-10 items-center justify-center relative bg-[#137fec33] rounded-lg">
            <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
              <Terminal className="w-8 h-8 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>

          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <p className="relative flex items-center justify-center  h-7 mt-[-1.00px] [font-family:'Manrope-ExtraBold',Helvetica] font-extrabold text-transparent text-xl leading-5">
              <span className="text-white tracking-[-0.10px] leading-7">
                CoderTo
              </span>

              <span className="text-[#137fec] tracking-[0]">Data</span>
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-8 relative flex-[0_0_auto]">
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <div className="w-[40.8px] text-slate-300 relative flex items-center justify-center h-5 mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-sm tracking-[0] leading-5 whitespace-nowrap">
              About
            </div>
          </div>

          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <div className="w-[33.92px] text-slate-300 relative flex items-center justify-center h-5 mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-sm tracking-[0] leading-5 whitespace-nowrap">
              Work
            </div>
          </div>

          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <div className="w-[34.97px] text-slate-300 relative flex items-center justify-center h-5 mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-sm tracking-[0] leading-5 whitespace-nowrap">
              Skills
            </div>
          </div>

          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <div className="w-[55.14px] text-slate-300 relative flex items-center justify-center h-5 mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-sm tracking-[0] leading-5 whitespace-nowrap">
              Contact
            </div>
          </div>
        </div>
        <LanguageSwitcher size="sm" variant="dropdown" showLabel={false} />

        <div className="inline-flex items-center gap-2 px-5 py-2.5 relative flex-[0_0_auto] bg-[#137fec] rounded-lg">
          <div className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-lg shadow-[0px_4px_6px_-4px_#137fec33,0px_10px_15px_-3px_#137fec33]" />

          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <FileText className="w-4 h-4 text-white" />
          </div>

          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <div className="w-[54.91px] text-white relative flex items-center justify-center h-5 mt-[-1.00px] [font-family:'Manrope-Bold',Helvetica] font-bold text-sm tracking-[0] leading-5 whitespace-nowrap">
              Resume
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
