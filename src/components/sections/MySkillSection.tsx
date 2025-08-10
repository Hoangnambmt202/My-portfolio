"use client";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function MySkillSection({ heading }: { heading?: string }) {
  const { t } = useTranslation();

  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Tailwind CSS", level: 80 },
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 90 },
    { name: "Git", level: 75 },
  ];

  return (
    <div className="mt-16 space-y-6">
      <h2 className="text-2xl text-center font-extrabold text-white uppercase pb-12">
        {heading || t('about.mySkills')}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
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
                  strokeDashoffset={100 - skill.level}
                  strokeLinecap="round"
                />
              </svg>
              {/* Percentage Text */}
              <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-2xl font-bold text-blue-600">
                  {skill.level}%
                </span>
              </div>
            </div>

            <div className="text-white text-center mt-4">
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}