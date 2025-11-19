import { Facebook, Github, Linkedin, Youtube } from "lucide-react";
import { cubicBezier, motion } from "framer-motion";
import { FaTiktok } from "react-icons/fa";

const heroStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    }
  };

  const heroItem = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.9, 
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
      } 
    }
  };

  const socialList = [
    {
      Icon: Github,
      href: "http://github.com/Hoangnambmt202",

    },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/pham-ngoc-hoang-nam",
    },
    {
      Icon: Facebook,
      href: "https://www.facebook.com/pham.ngoc.hoang.nam",
    },
    {
      Icon: Youtube,
      href: "https://www.youtube.com/@CoderToData",
    },
    {
      Icon: FaTiktok,
      href: "https://www.tiktok.com/@codertodata",
    }
  ]
export default function HeroSection() {
   
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-slate-900" id="hero">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute top-40 -left-40 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={heroStagger}
        >
          <motion.div variants={heroItem}>
            <span className="inline-block py-1 px-3 rounded-full bg-slate-800 text-cyan-400 text-sm font-medium mb-6 border border-slate-700 shadow-lg shadow-cyan-500/10">
              Hello, I&apos;m ready to work
            </span>
          </motion.div>
          
          <motion.h1 
            variants={heroItem}
            className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent tracking-tight"
          >
            Full-Stack Developer
          </motion.h1>
          
          <motion.p 
            variants={heroItem}
            className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Xây dựng những sản phẩm kỹ thuật số tuyệt vời với công nghệ hiện đại, tập trung vào trải nghiệm người dùng và hiệu suất.
          </motion.p>
          
          <motion.div variants={heroItem} className="flex justify-center space-x-6">
            {socialList.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                whileHover={{ scale: 1.2, rotate: 10, color: "#22d3ee" }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-slate-800 rounded-full text-slate-400 transition-colors border border-slate-700 shadow-lg"
                target="_blank"
              >
                <item.Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}