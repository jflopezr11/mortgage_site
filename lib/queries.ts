import { groq } from 'next-sanity'

export const getAllPostsQuery = groq`*[_type == "post"]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  coverImage {
    asset->{
      _id,
      url
    }
  }
} | order(publishedAt desc)`
