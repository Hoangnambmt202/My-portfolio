import { Code2, ExternalLink } from "lucide-react";
import { cubicBezier, motion } from "framer-motion";
import { useTranslations } from "next-intl";
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94)
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function PortfolioSection() {
  const t = useTranslations('portfolio');
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Nền tảng thương mại điện tử với React & Node.js",
      tags: ["React", "Node.js", "MongoDB"],
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Mobile Banking App",
      description: "Ứng dụng ngân hàng di động với React Native",
      tags: ["React Native", "TypeScript", "Firebase"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "AI Dashboard",
      description: "Dashboard phân tích dữ liệu với AI integration",
      tags: ["Vue.js", "Python", "TensorFlow"],
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Real-time Chat",
      description: "Hệ thống chat realtime với WebSocket",
      tags: ["Next.js", "Socket.io", "Redis"],
      color: "from-emerald-400 to-cyan-500",
    },
  ];

  const projectCard = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.7,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94)
      } 
    }
  };

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px", amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
           {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 items-stretch"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px", amount: 0.2 }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={i}
              variants={projectCard}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-colors shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className={`w-full aspect-[4/3] bg-gradient-to-br ${p.color} flex items-center justify-center relative overflow-hidden`}>
                <motion.div
                  initial={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.3, rotate: 20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Code2 className="w-20 h-20 text-white/80" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-black/20"
                  whileHover={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-400 mb-6">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      className="px-3 py-1 bg-slate-800 text-cyan-400 rounded-full text-xs font-medium border border-slate-700"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <motion.button 
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-2 text-white font-medium hover:text-cyan-400 transition-colors"
                >
                  <span>{t('viewDetails')}</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}