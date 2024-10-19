import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head'

export async function getStaticPaths() {
    console.log("getStaticPaths is running"); 
    const files = fs.readdirSync('content/posts');
    console.log('Markdown files:', files);  // This should appear in your terminal
    const paths = files.map((filename) => ({
        params: { slug: filename.replace('.md', '') },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
    console.log("getStaticProps is running"); 
    const filePath = path.join('content/posts', slug + '.md');
    console.log('Loading file:', filePath);  // This should appear in your terminal
    const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(markdownWithMeta);

    return {
        props: {
            frontmatter,
            content,
        },
    };
}


export default function BlogPost({ frontmatter, content }) {
    console.log('Client-side log: Rendering blog post');  // This will appear in the browser console

    return (
        <>
            <Head>
                <title>{frontmatter.title} | My Blog</title>
                <meta name="description" content={frontmatter.title} />
            </Head>
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
                <p className="text-sm text-gray-500 mb-4">{frontmatter.date}</p>
                <article className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </article>
            </div>
        </>
    );
}