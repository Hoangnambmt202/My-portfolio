import Image from "next/image";
import {
  FiFacebook,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiYoutube,
} from "react-icons/fi";

export default function AboutPage() {
  const contactLinks = [
    {
      label: "nam23062002@gmail.com",
      icon: <FiMail className="text-blue-600 text-xl mr-4" />,
    },
    {
      label: "+84 914 837 433 (Zalo)",
      icon: <FiPhone className="text-blue-600 text-xl mr-4" />,
    },
    {
      label: "https://www.linkedin.com/in/pham-ngoc-hoang-nam",
      icon: <FiLinkedin className="text-blue-600 text-xl mr-4" />,
    },
    {
      label: "https://www.facebook.com/pham.ngoc.hoang.nam",
      icon: <FiFacebook className="text-blue-600 text-xl mr-4" />,
    },
    {
      label: "http://github.com/Hoangnambmt202",
      icon: <FiGithub className="text-blue-600 text-xl mr-4" />,
    },
    {
      label: "https://www.youtube.com/@NamGoPhim",
      icon: <FiYoutube className="text-blue-600 text-xl mr-4" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-white font-bold text-center mb-8">
          About Me
        </h1>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[color:var(--primary-color)]">
              Full Stack Web Developer
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Hi! I&apos;m Nam, a passionate full stack web developer with a
              keen eye for creating beautiful and user-friendly web
              applications.
            </p>
            <p className="text-slate-300 leading-relaxed">
              With [X] years of experience in web development, I&apos;ve worked
              on various projects ranging from small business websites to
              large-scale applications.
            </p>

            <div className="pt-4">
              <h3 className="text-xl text-[color:var(--primary-color)] font-semibold mb-3">
                My Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "JavaScript",
                  "Tailwind CSS",
                  "HTML5",
                  "CSS3",
                  "Git",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-xl text-[color:var(--primary-color)] font-semibold mb-3">
                Information
              </h3>
              <div className="flex flex-col gap-2">
                {contactLinks.map((item, index) => (
                  <div key={index} className="flex items-center">
                    {item.icon}
                    <span className="break-all text-slate-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src="https://images.careerviet.vn/content/images/developer-la-gi-CareerBuilder-1.jpg"
                alt="Profile"
                width={800}
                height={533}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-4xl">👨‍💻</span>
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-6">
          <h2 className="text-2xl font-semibold text-[color:var(--primary-color)]">What I Do</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">Web Development</h3>
              <p className="text-gray-600">
                Creating responsive and interactive web applications using
                modern technologies.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Mobile Development</h3>
              <p className="text-gray-600">
                Developing mobile applications for multiple platforms using
                React Native and Flutter.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
              <p className="text-gray-600">
                Designing beautiful and intuitive user interfaces with great
                user experience.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Performance</h3>
              <p className="text-gray-600">
                Optimizing applications for maximum speed and scalability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
