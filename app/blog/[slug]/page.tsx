import { client } from '@/lib/sanityClient'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

export const dynamic = 'force-dynamic'
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await client.fetch(getPostQuery, { slug: params.slug })

  return {
    title: `${post.title} | Josh Lopez Loans`,
    description: post.body?.[0]?.children?.[0]?.text || post.title,
    openGraph: {
      title: post.title,
      description: post.body?.[0]?.children?.[0]?.text || post.title,
      type: 'article',
      url: `https://joshualopezloans.com/blog/${params.slug}`,
      images: [
        {
          url: post.coverImage?.asset?.url || 'https://joshualopezloans.com/default-og.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await client.fetch(getPostQuery, { slug: params.slug })

  if (!post) {
    return <div className="p-6 text-red-600 text-xl">Post not found.</div>
  }

  const structuredDataJson: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title || '',
    description: post.body?.[0]?.children?.[0]?.text || post.title || '',
    image: post.coverImage?.asset?.url || '',
    author: {
      '@type': 'Person',
      name: 'Josh Lopez',
    },
    datePublished: post.publishedAt || '',
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <StructuredData json={structuredDataJson} />
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
          priority
        />
      ) : (
        <div className="mb-6 bg-gray-100 w-full h-[300px] flex items-center justify-center text-gray-400 text-sm italic">
          No image provided for this post.
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <PortableText value={post.body} />
      </div>
    </div>
  )
}
