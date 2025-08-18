"use client";

import { NextButton } from "@/components/elements/NextButton";
import { useTranslation } from "@/lib/hooks/useTranslation";
import Image from "next/image";

export default function Home() {
  const { t, locale } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen max-w-5xl mx-auto items-center justify-center px-4 gap-8">
      {/* Hình ảnh */}
      <div className="relative rounded-tl-[30px] rounded-bl-[30px] w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <div className="relative bg-black p-2 overflow-hidden rounded-3xl">
          <Image
            className="rounded-3xl h-[300px] sm:h-[400px] lg:h-[500px] w-full object-cover"
            src="/assets/imgs/Nam_1.jpg"
            width={500}
            height={400}
            alt="Picture of the author"
          />
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex-1 px-4 text-center lg:text-left">
        <h1 className="font-bold text-white">
          <span className="text-2xl sm:text-3xl text-[color:var(--primary-color)]">—</span>{" "}
          <span className="text-xl sm:text-2xl">{t("home.greeting")} </span>
          <span className="text-2xl sm:text-4xl text-[color:var(--primary-color)] uppercase">
            {t("home.name")}
          </span>
        </h1>

        <h2 className="text-xl sm:text-2xl lg:text-3xl text-white font-extrabold mt-2 mb-4">
          {t("home.title")}
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-xl leading-relaxed mb-6 text-justify mx-auto lg:mx-0">
          {t("home.description")}
        </p>

        <div className="pb-8 lg:pb-0">
          <NextButton
            content={t("home.moreAboutMe")}
            class={""}
            href={`/${locale}/about`}
          />
        </div>
      </div>
    </div>
  );
} 