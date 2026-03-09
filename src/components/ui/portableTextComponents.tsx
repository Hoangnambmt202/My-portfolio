import Image from "next/image";
import { urlFor } from "@/sanity/lib/sanityImageUrl";
import type { PortableTextComponents } from "@portabletext/react";
import type { SanityImageBlock, SanityCodeBlock } from "@/types/features/post";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageBlock }) => {
      if (!value?.asset) return null;

      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(1200).auto("format").url()}
            alt={value.alt || "Blog image"}
            width={1200}
            height={700}
            className="w-full rounded-xl object-cover"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-white/60">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },

    code: ({ value }: { value: SanityCodeBlock }) => (
      <pre className="my-6 overflow-x-auto rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-white">
        <code className="font-mono text-[#137fec]">{value.code}</code>
      </pre>
    ),
  },

  block: {
    h1: ({ children }) => (
      <h1 className="mt-12 mb-6 text-3xl font-black text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-white">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-white">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="mt-4 mb-2 text-base font-semibold text-white/90">
        {children}
      </h5>
    ),
    normal: ({ children }) => (
      <p className="mb-6 leading-relaxed text-white">{children}</p>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-4 list-disc pl-6 text-white">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 list-decimal pl-6 text-white">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2 text-white/90">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-2 text-white/90">{children}</li>
    ),
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;

      return (
        <a
          href={value.href}
          rel={rel}
          className="font-medium text-[#137fec] hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};
