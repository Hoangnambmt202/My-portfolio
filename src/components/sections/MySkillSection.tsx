export default function MySkillSection({heading}: {heading?: string}) {
  return (
    <div className="">
      <h2 className="text-2xl text-center font-extrabold text-white uppercase pb-12">
        {heading || "MY SKILLS"}
      </h2>
      <div className="grid grid-cols-4 grid-rows-2 gap-8">
        {["React", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Git"].map(
          (skill, index) => (
            <>
           
              {/* Circular Progress */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative size-40">
                    <svg
                    className="size-full -rotate-90"
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    {/* Background Circle */}
                    <circle
                        cx={18}
                        cy={18}
                        r={16}
                        fill="none"
                        className="stroke-current text-gray-200"
                        strokeWidth={2}
                    />
                    {/* Progress Circle */}
                    <circle
                        cx={18}
                        cy={18}
                        r={16}
                        fill="none"
                        className="stroke-current text-blue-600"
                        strokeWidth={2}
                        strokeDasharray={100}
                        strokeDashoffset={65}
                        strokeLinecap="round"
                    />
                    </svg>
                    {/* Percentage Text */}
                    <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <span className="text-center text-2xl font-bold text-blue-600">
                    
                        35%
                    </span>
                    </div>
                </div>

                <div className="text-white text-centers" key={index}>
                    {skill}
                </div>
              </div>
              {/* End Circular Progress */}
            </>
          )
        )}
      </div>
    </div>
  );
}
