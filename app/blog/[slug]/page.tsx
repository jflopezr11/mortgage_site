import { sanityClient } from '@/lib/sanityClient'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'

export const revalidate = 60

const getPostQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    publishedAt,
    coverImage{
      asset->{
        url
      }
    },
    body
  }
`

export async function generateStaticParams() {
  const query = groq`*[_type == "post"]{ "slug": slug.current }`
  const slugs = await sanityClient.fetch(query)

  return slugs.map((slug: { slug: string }) => ({
    slug: slug.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await sanityClient.fetch(getPostQuery, { slug: params.slug })
  
    if (!post) {
      return <div className="p-6 text-red-600 text-xl">Post not found.</div>
    }
  
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-4">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
  
        {post.coverImage?.asset?.url ? (
          <Image
            src={post.coverImage.asset.url}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg mb-6"
          />
        ) : (
            <div className= "mb-6 bg-gray-100 w-full h-[300px] flex items-center justify-cente text-gray-400 text-sm italic"> 
             No image provided for this post.
            </div>
        )}
  
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>
      </div>
    )
  }


