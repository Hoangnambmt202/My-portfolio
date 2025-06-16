
export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            I am a passionate Full Stack Developer with expertise in modern web technologies.
            My journey in software development started 5 years ago, and I&apos;ve been constantly
            learning and growing ever since.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>React/Next.js</li>
                <li>Node.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>5+ years in Web Development</li>
                <li>3+ years in Full Stack Development</li>
                <li>2+ years in UI/UX Design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 