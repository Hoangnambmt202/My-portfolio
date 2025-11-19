
export const allPostsQuery = `
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage {
    asset -> {
      url
    }
  },
  publishedAt
}
`;
// lib/sanity/queries.ts
export const singlePostQuery = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "readingTime": round(length(pt::text(content)) / 5 / 180),
    body,
    featuredImage,
    views,
    author->{
      name,
      bio,
      image
    },
    categories[]->{
      title
    },
    tags
  }
`;
