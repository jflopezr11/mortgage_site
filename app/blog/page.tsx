import { client } from '@/lib/sanityClient'
import { getAllPostsQuery } from '@/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'

const query = groq`*[_type == "post"]{
  _id,
  title,
  slug,
  publishedAt,
  coverImage,
  excerpt
} | order(publishedAt desc)`


export default async function Blog() {
  const posts = await client.fetch(getAllPostsQuery)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">My Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {post.coverImage && (
              <Image 
                src={post.coverImage.asset.url} 
                alt={post.title} 
                width={300} 
                height={200} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <Link href={`/blog/${post.slug.current}`}>
                <h2 className="text-2xl font-semibold text-blue-600 hover:underline">{post.title}</h2>
              </Link>
              <p className="text-sm text-gray-500 mb-2">{new Date(post.publishedAt).toLocaleDateString()}</p>
              <p className="text-gray-700">{post.excerpt}</p>
              <Link href={`/blog/${post.slug.current}`}>
                <button className="mt-4 inline-block text-white-700 hover:underline">Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
