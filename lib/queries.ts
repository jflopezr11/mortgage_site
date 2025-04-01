import { groq } from 'next-sanity'
import { sanityClient } from './sanityClient'

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

export const getLoanProgramsQuery = groq`
  *[_type == "loanProgram"] | order(createdAt desc) {
    _id,
    loanName,
    loanDescription,
    programType,
    minCreditScore,
    downPayment,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }
`
console.log('Sanity client:', sanityClient)


