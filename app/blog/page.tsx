import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

export default function Blog() {
  const files = fs.readdirSync('content/posts');
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('content/posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug: filename.replace('.md', ''), // Slug based on the filename
      frontmatter,
    };
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">My Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {post.frontmatter.image && (
              <Image 
                src={post.frontmatter.image} 
                alt={post.frontmatter.title} 
                width={300} 
                height={200} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold text-blue-600 hover:underline">{post.frontmatter.title}</h2>
              </Link>
              <p className="text-sm text-gray-500 mb-2">{post.frontmatter.date}</p>
              <p className="text-gray-700">{post.frontmatter.excerpt}</p>
              <Link href={`/blog/${post.slug}`}>
                <button className="mt-4 inline-block text-blue-500 hover:underline">Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
