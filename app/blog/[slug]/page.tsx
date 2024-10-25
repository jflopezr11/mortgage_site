import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
import { GetStaticPropsContext } from 'next';

// Get all the slugs (blog post filenames) for static generation
export async function generateStaticParams() {
    const files = fs.readdirSync('content/posts');
    return files.map((filename) => ({
        slug: filename.replace('.md', ''),
    }));
}

// Fetch the blog content based on the slug
async function getPostData(slug: string) {
    const markdownWithMeta = fs.readFileSync(path.join('content/posts', slug + '.md'), 'utf-8');
    const { data: frontmatter, content } = matter(markdownWithMeta);

    // Process the markdown content to HTML (if you're using a markdown-to-HTML converter)
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        frontmatter,
        contentHtml,
    };
}


// Blog post component
export default async function BlogPost({ params }: { params: { slug: string } }) {
    const { slug } = params; // Get the slug from the URL
    const { frontmatter, contentHtml } = await getPostData(slug); // Fetch post data

    return (
        <>
            <Head>
                <title>{frontmatter.title} | Joshua Lopez Blog</title>
                <meta name="description" content={frontmatter.description} />
                <meta name="keywords" content={frontmatter.keywords || "mortgage, loans, QM loan"} />
            </Head>
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
                <p className="text-sm text-gray-500 mb-4">{frontmatter.date}</p>
                <article className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                </article>
            </div>
        </>
    );
}

