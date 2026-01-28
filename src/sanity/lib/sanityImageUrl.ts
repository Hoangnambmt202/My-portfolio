/* eslint-disable @typescript-eslint/no-explicit-any */
// sanityImageUrl.ts
import createImageUrlBuilder from "@sanity/image-url";

import { client } from "./client"; // see example client config
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Create an image URL builder using the client
const builder = createImageUrlBuilder(client as any);

// Export a function that can be used to get image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
