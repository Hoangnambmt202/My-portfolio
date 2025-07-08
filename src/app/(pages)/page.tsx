"use client";

import { NextButton } from "@/components/elements/NextButton";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen max-w-5xl mx-auto items-center justify-center ">
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

        <div className="flex-1 px-10">
          <h1 className="text-4xl font-bold text-[color:var(--primary-color)] inline-block">
            <span className="text-xl text-[color:var(--primary-color)]">—</span>{" "}
            I&apos;M NAM.
          </h1>
          <h2 className="text-4xl font-extrabold mt-1 mb-4">
            FULLSTACK WEB DEV
          </h2>

          <p className="text-lg text-gray-300 max-w-xl leading-relaxed mb-6 text-justify ">
            I&apos;m a Tunisian based web designer & front-end developer focused
            on crafting clean & user-friendly experiences, I am passionate about
            building excellent software that improves the lives of those around
            me.
          </p>
          <NextButton content="More about me" class={""} href="/about" />
        </div>
      </div>
    </>
  );
}
