export const POSTS_QUERY = `
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  tags,
  category[]->{
    title,
    slug
  },
   image{
    _type,
    asset,
    crop,
    alt,
    hotspot
  },
  publishedAt,
  author->{
    name,
    slug,
    bio,
    avatar
  },
  
}
`;

export const POST_DETAIL_QUERY = `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  category[]->{
    title,
    slug
  },
  body,
  excerpt,
  publishedAt,
  tags,
  author->{
    name,
    slug,
    bio,
    avatar
  },
  image{
    _type,
    asset,
    alt,
    crop,
    hotspot
  },
}
`;
