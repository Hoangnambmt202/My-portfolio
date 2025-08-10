"use client";
import { Header } from "@/components/layout/Header";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function PortfolioPage() {
  const { t } = useTranslation();

  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: "E-commerce Website",
      description: "Modern e-commerce platform with React and Node.js",
      image: "/assets/imgs/project1.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      category: "web-development",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Secure mobile banking application with React Native",
      image: "/assets/imgs/project2.jpg",
      technologies: ["React Native", "Firebase", "Redux"],
      category: "mobile-development",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    // Add more projects as needed
  ];

  const categories = [
    { key: 'all', label: t('portfolio.allProjects') },
    { key: 'web-development', label: t('portfolio.webDev') },
    { key: 'mobile-development', label: t('portfolio.mobileDev') },
    { key: 'ui-ux-design', label: t('portfolio.design') },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl">
        <Header backdrop={t('portfolio.backdrop')} title={t('portfolio.myWork')} />

        {/* Filter Categories */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Project Image</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{t('portfolio.technologies')}:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                  >
                    {t('portfolio.liveDemo')}
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-800 text-white text-center py-2 rounded hover:bg-gray-900 transition-colors duration-300"
                  >
                    {t('portfolio.sourceCode')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}