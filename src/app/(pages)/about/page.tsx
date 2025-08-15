"use client";
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
import { Header } from "@/components/layout/Header";
import { useTranslation } from "@/lib/hooks/useTranslation";

export default function AboutPage() {
  const { t } = useTranslation();

  const contactLinks = [
    { label: "nam23062002@gmail.com", icon: <FiMail className="text-blue-600 text-xl" /> },
    { label: "+84 914 837 433 (Zalo)", icon: <FiPhone className="text-blue-600 text-xl" /> },
    { label: "https://www.linkedin.com/in/pham-ngoc-hoang-nam", icon: <FiLinkedin className="text-blue-600 text-xl" /> },
    { label: "https://www.facebook.com/pham.ngoc.hoang.nam", icon: <FiFacebook className="text-blue-600 text-xl" /> },
    { label: "http://github.com/Hoangnambmt202", icon: <FiGithub className="text-blue-600 text-xl" /> },
    { label: "https://www.youtube.com/@NamGoPhim", icon: <FiYoutube className="text-blue-600 text-xl" /> },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-6xl">
        <Header backdrop={t('about.backdrop')} title={t('about.title')} />

        {/* Responsive flex: mobile => column, md trở lên => row */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Thông tin cá nhân */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-extrabold text-white uppercase">
              {t('about.personalInfo')}
            </h2>

            {/* Grid 2 cột, mobile gap nhỏ, tablet/desktop gap lớn */}
            <div className="text-white text-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p><span>{t('about.firstName')} :</span> <span> Hoang Nam</span></p>
              <p><span>{t('about.birthday')} :</span> <span> 23 / 06 / 2002</span></p>
              <p><span>{t('about.lastName')} :</span> <span> Pham Ngoc</span></p>
              <p><span>{t('about.address')} :</span> <span> Buon Ma Thuot City, DakLak Province</span></p>
              <p><span>{t('about.nationality')} :</span> <span>Viet Nam</span></p>

              {/* Liên hệ */}
              {contactLinks.map((item, index) => (
                <p key={index} className="flex items-center gap-2 text-sm flex-wrap">
                  {item.icon}
                  <span className="text-slate-300 break-all">{item.label}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <MySkillSection heading={t('about.mySkills')} />

        {/* What Can I Do Section */}
        <CanDoSection heading={t('about.whatCanIDo')} />

     
      </div>
    </div>
  );
}
