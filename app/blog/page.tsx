import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

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
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
              {post.frontmatter.title}
            </Link>
            <p className="text-sm text-gray-500">{post.frontmatter.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
