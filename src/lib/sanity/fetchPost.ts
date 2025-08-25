import { client } from "./sanity";
import { singlePostQuery } from "./queries";

export async function getPostBySlug(slug: string) {
  return client.fetch(singlePostQuery, { slug });
}
