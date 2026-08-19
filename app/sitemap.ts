import type { MetadataRoute } from "next";
import { client } from "@/lib/sanityClient";
import { getSitemapPostsQuery } from "@/lib/queries";
import { SITE_URL } from "@/lib/site";

type SitemapPost = {
  slug: string;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/real-estate` },
    { url: `${SITE_URL}/calculator` },
    { url: `${SITE_URL}/contact` },
    { url: `${SITE_URL}/privacy-policy` },
    { url: `${SITE_URL}/blog` },
    { url: `${SITE_URL}/landing/rent-vs-own` },
    { url: `${SITE_URL}/landing/book-a-call` },
    // Intentionally excluded — see the sitemap report for reasoning:
    // /loan (third-party application embed, noindex)
    // /landing/access-equity, /landing/heloc-access (direct-mail-only, noindex)
    // /api/* (not HTML)
  ];

  let posts: SitemapPost[] = [];
  try {
    posts = await client.fetch(getSitemapPostsQuery);
  } catch {
    // If Sanity is unreachable at build time, still return the static
    // routes rather than failing the whole sitemap.
    posts = [];
  }

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => Boolean(post.slug))
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post._updatedAt ? new Date(post._updatedAt) : undefined,
    }));

  return [...staticRoutes, ...blogRoutes];
}
