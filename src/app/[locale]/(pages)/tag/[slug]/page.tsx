import type { Metadata } from "next";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Posts tagged with ${slug}`,
    description: `Browse all articles related to ${slug}`,
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-500">#{slug}</h1>
      {/* Map through posts here */}
    </div>
  );
}
