import { Code2, Rocket, Zap, Users, ArrowRight } from "lucide-react";
import { cubicBezier, motion } from "framer-motion";

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

export default function ServicesSection() {
  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Web Development",
      description: "Phát triển website responsive, hiện đại với React, Vue, Angular",
      features: ["Single Page Apps", "Progressive Web Apps", "API Integration"],
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Mobile Development",
      description: "Xây dựng ứng dụng di động native và cross-platform",
      features: ["iOS & Android", "React Native", "Flutter"],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Backend Development",
      description: "Thiết kế và phát triển API, microservices, database",
      features: ["RESTful API", "GraphQL", "Microservices"],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consulting",
      description: "Tư vấn kiến trúc hệ thống, code review, mentoring",
      features: ["System Design", "Code Review", "Team Training"],
    },
  ];

  const serviceCard = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94)
      } 
    }
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px", amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold text-white mb-4"
          >
            Dịch vụ
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Các dịch vụ phát triển phần mềm chuyên nghiệp
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px", amount: 0.2 }}
          variants={staggerContainer}
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={serviceCard}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-colors shadow-lg hover:shadow-cyan-500/20"
            >
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-cyan-500/20"
              >
                {s.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-slate-400 mb-6">{s.description}</p>
              <ul className="space-y-2">
                {s.features.map((f, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-2 text-slate-300"
                  >
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                    <span>{f}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}