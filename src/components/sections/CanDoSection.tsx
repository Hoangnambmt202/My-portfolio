
export const CanDoSection = ({heading}:{heading?:string}) => {
  return (
    <div className="mt-16 space-y-6">
           <h2 className="text-2xl text-center font-extrabold text-white uppercase pb-12">
        {heading || "MY SKILLS"}
      </h2>
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
  )
}
