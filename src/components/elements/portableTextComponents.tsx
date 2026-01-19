import Image from "next/image";
import { urlFor } from "@/sanity/lib/sanityImageUrl";
import type { PortableTextComponents } from "@portabletext/react";
import type { SanityImageBlock, SanityCodeBlock } from "@/types/post";
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
            className="rounded-lg object-cover w-full"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="mt-2 text-sm text-gray-500 text-center">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },

    code: ({ value }: { value: SanityCodeBlock }) => (
      <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-6 text-sm">
        <code>{value.code}</code>
      </pre>
    ),
  },

  block: {
    h1: ({ children }) => (
      <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-cyan-400 pl-4 italic my-6 text-gray-600">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 my-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 my-4">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
};
