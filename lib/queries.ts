import { groq } from 'next-sanity'


export const getAllPostsQuery = groq`*[_type == "post" && defined(slug.current) && publishedAt < now()]{
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

export const howItWorksQuery = groq`
  *[_type == "howItWorksSection" && slug.current == $slug][0]{
    title,
    body
  }
`;

