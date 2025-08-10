"use client";

import { NextButton } from "@/components/elements/NextButton";
import { useTranslation } from "@/lib/hooks/useTranslation";
import Image from "next/image";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex min-h-screen max-w-5xl mx-auto items-center justify-center px-4">
        <div className="relative rounded-tl-[50px] rounded-bl-[50px]">
          <div className="relative bg-black p-2 overflow-hidden">
            <Image
              className="rounded-3xl !h-[500px] object-cover"
              src="/assets/imgs/Nam_1.jpg"
              width={500}
              height={400}
              alt="Picture of the author"
            />
          </div>
        </div>

        <div className="flex-1 px-4 text-center md:text-left">
          <h1 className="font-bold text-white">
            <span className="text-3xl text-[color:var(--primary-color)]">—</span>{" "}
            <span className="text-2xl">{t('home.greeting')} </span>
            <span className="text-4xl text-[color:var(--primary-color)] uppercase">{t('home.name')}</span>
          </h1>

          <h2 className="text-2xl sm:text-3xl text-white font-extrabold mt-1 mb-4">
            {t('home.title')}
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed mb-6 text-justify mx-auto md:mx-0">
            {t('home.description')}
          </p>

          <div className="pb-8 md:pb-0">
            <NextButton content={t('home.moreAboutMe')} class={""} href="/about" />
          </div>
        </div>
      </div>
    </>
  );
}