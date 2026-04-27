import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { BlogsCarousel } from "@/components/blogs-carousel"
import { getAllPostsMeta } from "@/lib/blog"
import { siteConfig } from "@/lib/site-config"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blogs",
  description: `Articles by ${siteConfig.authorName} on AI systems, infrastructure, and engineering.`,
  alternates: {
    canonical: "/Blogs",
  },
  openGraph: {
    type: "website",
    url: "/Blogs",
    title: `Blogs | ${siteConfig.title}`,
    description: `Articles by ${siteConfig.authorName} on AI systems, infrastructure, and engineering.`,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blogs | ${siteConfig.title}`,
    description: `Articles by ${siteConfig.authorName} on AI systems, infrastructure, and engineering.`,
    images: [siteConfig.ogImage],
  },
}

export default async function BlogsPage() {
  const posts = await getAllPostsMeta()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="w-full px-8 pb-16 pt-28 md:px-16 lg:pt-36" style={{ minHeight: "520px" }}>
        {posts.length === 0 ? <p className="text-sm text-foreground/70">No posts yet.</p> : <BlogsCarousel posts={posts} />}
      </section>
    </main>
  )
}
