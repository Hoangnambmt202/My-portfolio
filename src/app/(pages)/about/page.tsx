import {
  FiFacebook,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiYoutube,
} from "react-icons/fi";
import MySkillSection from "@/components/sections/MySkillSection";
import { CanDoSection } from "@/components/sections/CanDoSection";
import { NextButton } from "@/components/elements/NextButton";
import { Header } from "@/components/layout/Header";

export default function AboutPage() {
  const contactLinks = [
    {
      label: "nam23062002@gmail.com",
      icon: <FiMail className="text-blue-600 text-xl " />,
    },
    {
      label: "+84 914 837 433 (Zalo)",
      icon: <FiPhone className="text-blue-600 text-xl " />,
    },
    {
      label: "https://www.linkedin.com/in/pham-ngoc-hoang-nam",
      icon: <FiLinkedin className="text-blue-600 text-xl " />,
    },
    {
      label: "https://www.facebook.com/pham.ngoc.hoang.nam",
      icon: <FiFacebook className="text-blue-600 text-xl " />,
    },
    {
      label: "http://github.com/Hoangnambmt202",
      icon: <FiGithub className="text-blue-600 text-xl " />,
    },
    {
      label: "https://www.youtube.com/@NamGoPhim",
      icon: <FiYoutube className="text-blue-600 text-xl " />,
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl">
        <Header backdrop="RESUME" title="ABOUT ME" />

        <div className="flex gap-6 items-start">
          <div className="flex-4/6 space-y-4 ">
            <h2 className="text-2xl font-extrabold text-white uppercase">
              PERSONAL INFOS
            </h2>
            <div className="text-white text-sm grid grid-cols-2 grid-rows-5 gap-4 ">
              <p className=" text-sm">
                <span>First Name :</span> <span> Hoang Nam</span>
              </p>
              <p className=" text-sm">
                <span>Birth day :</span> <span> 23 / 06 / 2002</span>
              </p>
              <p className=" text-sm">
                <span>Last Name :</span> <span> Pham Ngoc</span>
              </p>
              <p className=" text-sm">
                <span>Address :</span>
                <span> Buon Ma Thuot City, DakLak Province</span>
              </p>
              <p className=" text-sm">
                <span>Nationality :</span> <span>Viet Nam</span>
              </p>
              <p className=" text-lg"></p>
              {contactLinks.map((item, index) => (
                <p key={index} className="flex gap-2 text-sm flex-wrap">
                  <span>{item.icon}</span>
                  <span className="flex-1 text-slate-300 text-sm ">
                    {item.label}
                  </span>
                </p>
              ))}
            </div>
            <div className="flex justify-center">
              <button className="cursor-pointer flex justify-between bg-gray-800 px-3 py-2 rounded-full text-white tracking-wider shadow-xl hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-mono mt-10 ">
                Download CV
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 ml-4 animate-bounce"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-2/6 w-full h-full text-white">
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div className="w-full h-full pt-5 pb-6 px-8 border border-slate-500 rounded-[5px]">
                <h3 className="text-4xl font-bold font-poppins text-[color:var(--primary-color)] after:content-['+'] after:absolute after:right-12 after:-top-2 relative">
                  12
                </h3>
                <p className="">YEAR OF EXPERIENCE</p>
              </div>
              <div className="w-full h-full pt-5 pb-6 px-8 border border-slate-500 rounded-[5px]">
                <h3 className="text-4xl font-bold font-poppins text-[color:var(--primary-color)] after:content-['+'] after:absolute after:right-12 after:-top-2 relative">
                  97
                </h3>
                <p className="">COMPLETED PROJECTS</p>
              </div>
              <div className="w-full h-full pt-5 pb-6 px-8 border border-slate-500 rounded-[5px]">
                <h3 className="text-4xl font-bold font-poppins text-[color:var(--primary-color)] after:content-['+'] after:absolute after:right-12 after:-top-2 relative">
                  81
                </h3>
                <p className="">HAPPY CUSTOMERS</p>
              </div>
              <div className="w-full h-full pt-5 pb-6 px-8 border border-slate-500 rounded-[5px]">
                <h3 className="text-4xl font-bold font-poppins text-[color:var(--primary-color)] after:content-['+'] after:absolute after:right-12 after:-top-2 relative">
                  53
                </h3>
                <p className="">AWARDS WON</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-t border-solid border-t-white/20 mx-auto max-w-80 mt-30 mb-20" />
        <MySkillSection heading={"MY SKILLS"} />
        <hr className="border-t border-solid border-t-white/20 mx-auto max-w-80 mt-30 mb-20" />
        <CanDoSection heading={"WHAT I CAN DO"} />
        <div className="mt-16 space-y-6 flex justify-center w-full">
          <NextButton content="See my projects" class="" href={"/portfolio"} />
        </div>
      </div>
    </div>
  );
}
