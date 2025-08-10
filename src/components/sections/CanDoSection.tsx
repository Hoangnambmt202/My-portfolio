"use client";
import { useTranslation } from "@/lib/hooks/useTranslation";

export const CanDoSection = ({ heading }: { heading?: string }) => {
  const { t } = useTranslation();

  const services = [
    {
      icon: "💻",
      title: t('about.webDevelopment'),
      description: t('about.webDevelopmentDesc'),
    },
    {
      icon: "📱",
      title: t('about.mobileDevelopment'),
      description: t('about.mobileDevelopmentDesc'),
    },
    {
      icon: "🎨",
      title: t('about.uiuxDesign'),
      description: t('about.uiuxDesignDesc'),
    },
    {
      icon: "🚀",
      title: t('about.seoOptimization'),
      description: t('about.seoOptimizationDesc'),
    },
  ];

  return (
    <div className="mt-16 space-y-6">
      <h2 className="text-2xl text-center font-extrabold text-white uppercase pb-12">
        {heading || t('about.whatCanIDo')}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};