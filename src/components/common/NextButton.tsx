"use client";

import Link from "next/link";


export const NextButton = ({ content, class: className, href }: { content: string; class: string; href: string }) => {


  const handleClick = () => {
    // setLoading(true, `Đang chuyển đến ${content.toLowerCase()}...`);
  };

  return (
    <Link href={href} onClick={handleClick}>
      <button
        className={`group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110 ${className}`}
      >
        <span>{content}</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-13deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20"></div>
        </div>
      </button>
    </Link>
  );
};