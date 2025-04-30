import { client } from '@/lib/sanityClient'
import { getAllPostsQuery } from '@/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'
import { ChevronDown } from 'lucide-react'
import { urlFor } from '@/lib/imageUrl'

const query = groq`*[_type == "post"]{
  _id,
  title,
  slug,
  publishedAt,
  coverImage,
  excerpt
} | order(publishedAt desc)`

export const revalidate = 60 // seconds

export default async function Blog() {
  const posts = await client.fetch(getAllPostsQuery)
  console.log('Fetched posts:', posts)


  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-10 text-center tracking-tight">Building Sites, Funding Futures</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <div key={post._id} className="group relative border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 bg-white flex flex-col">

            {/* Cover Image */}
            {post.coverImage && (
              <div className="aspect-[3/2] w-full relative">
                <Image
                  src={urlFor(post.coverImage).fit('crop').url()}
                  alt={post.title}
                  fill
                  className="object-cover object-top rounded-t-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}

            <div className="p-4 flex flex-col flex-grow">
              {/* Title */}
              <Link href={`/blog/${post.slug.current}`}>
                <h2 className="text-lg font-semibold text-blue-900 hover:underline text-center">
                  {post.title}
                </h2>
              </Link>

              {/* Date */}
              <p className="text-sm text-gray-500 mt-1 text-center">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>

              {/* ▼ More Info */}
              <div className="flex justify-center items-center text-sm text-blue-600 mt-2">
                <span className="mr-1">More Info</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              </div>

              {/* Animated Excerpt */}
              <div className="max-h-0 group-hover:max-h-[300px] transition-all duration-500 ease-in-out overflow-hidden">
                <p className="text-sm text-gray-600 mt-2">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="mt-3 text-sm font-bold text-blue-700 hover:underline flex justify-center"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
