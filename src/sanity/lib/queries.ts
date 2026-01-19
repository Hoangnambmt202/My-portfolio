

export const POSTS_QUERY = `
*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  excerpt,
  slug,
  readTime,
  views,
  tags,
  category,
   image{
    _type,
    asset,
    crop,
    hotspot
  },
  publishedAt,
  
}
`;

export const POST_DETAIL_QUERY = `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  excerpt,
  publishedAt,
  readTime,
  views,
  tags,
  slug,
  author->{
    name
  },
  image
}
`;
