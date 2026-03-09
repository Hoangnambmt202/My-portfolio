import { ImageResponse } from "next/og";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_DETAIL_QUERY } from "@/sanity/lib/queries";

export const runtime = "edge";
export const alt = "Coder To Data Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: POST_DETAIL_QUERY,
    params: { slug },
  });

  if (!post) {
    return new ImageResponse(
      <div
        style={{
          background: "#202020",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 64,
          fontWeight: "bold",
        }}
      >
        Coder To Data
      </div>,
      { ...size },
    );
  }

  return new ImageResponse(
    <div
      style={{
        background: "#1a1a1a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            background: "#3b82f6",
            borderRadius: "50%",
            marginRight: "16px",
          }}
        />
        <span style={{ fontSize: 32, fontWeight: "bold", color: "#9ca3af" }}>
          Coder To Data
        </span>
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: "bold",
          lineHeight: 1.2,
          marginBottom: "40px",
          maxWidth: "900px",
        }}
      >
        {post.title}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: 28, color: "#6b7280", marginRight: "24px" }}>
          {new Date(post.publishedAt || new Date()).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            },
          )}
        </span>
        {post.author?.name && (
          <span style={{ fontSize: 28, color: "#d1d5db" }}>
            By {post.author.name}
          </span>
        )}
      </div>
    </div>,
    { ...size },
  );
}
