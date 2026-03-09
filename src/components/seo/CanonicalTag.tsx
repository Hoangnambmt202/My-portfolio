import React from "react";

export function CanonicalTag({ url }: { url: string }) {
  return <link rel="canonical" href={url} />;
}
