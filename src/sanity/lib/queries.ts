export const POSTS_QUERY = `
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
   "status": select(
    _id in path("drafts.**") => "draft",
    "published"
  ),
  tags,
  category[]->{
    title,
    "slug": slug.current
  },
  image{
    _type,
    asset->{
      _id,
      url
    },
    crop,
    alt,
    hotspot
  },
  publishedAt,
  _updatedAt,
  author->{
    name,
    "slug": slug.current,
    bio,
    avatar{
      asset->{url}
    }
  }
}
`;

export const POST_DETAIL_QUERY = `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  "status": select(
    _id in path("drafts.**") => "draft",
    "published"
  ),
  category[]->{
    title,
    "slug": slug.current
  },
  body,
  excerpt,
  publishedAt,
  _updatedAt,
  tags,
  author->{
    name,
    "slug": slug.current,
    bio,
    avatar{
      asset->{url}
    }
  },
  image{
    _type,
    asset->{
      _id,
      url,
      metadata {
        dimensions
      }
    },
    alt,
    crop,
    hotspot
  }
}
`;

export const SITEMAP_POSTS_QUERY = `
*[_type == "post"] {
  "slug": slug.current,
  _updatedAt
}
`;

export const RELATED_POSTS_QUERY = `
*[_type == "post" && slug.current != $slug && count((tags) [ @ in $tags ]) > 0] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  image{
    asset->{url},
    alt
  }
}
`;
