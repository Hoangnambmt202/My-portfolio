
export default function Projects() {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js and Node.js',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      image: '/projects/ecommerce.jpg'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates',
      technologies: ['React', 'Firebase', 'Material-UI'],
      image: '/projects/taskmanager.jpg'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern portfolio website showcasing my work and skills',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      image: '/projects/portfolio.jpg'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200">
                {/* Add project image here */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 