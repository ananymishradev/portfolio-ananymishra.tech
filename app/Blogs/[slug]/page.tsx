import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { BlogPostHero } from "@/components/blog-post-hero"
import { getAllPostsMeta, getPostBySlug } from "@/lib/blog"
import { toJsonLd } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

type PageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getAllPostsMeta()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post not found",
    }
  }

  const canonical = `${siteConfig.url}/Blogs/${post.slug}`

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      siteName: siteConfig.title,
      images: post.frontmatter.coverImage ? [{ url: post.frontmatter.coverImage }] : [{ url: siteConfig.ogImage }],
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author ?? siteConfig.authorName],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [siteConfig.ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post || !post.frontmatter.published) {
    notFound()
  }

  const allPosts = await getAllPostsMeta()
  const currentTags = new Set(post.frontmatter.tags ?? [])
  const relatedPosts = allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const overlapCount = (candidate.tags ?? []).filter((tag) => currentTags.has(tag)).length
      return { candidate, overlapCount }
    })
    .sort((a, b) => {
      if (b.overlapCount !== a.overlapCount) {
        return b.overlapCount - a.overlapCount
      }
      return new Date(b.candidate.date).getTime() - new Date(a.candidate.date).getTime()
    })
    .slice(0, 3)
    .map((entry) => entry.candidate)

  const postUrl = `${siteConfig.url}/Blogs/${post.slug}`

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    url: postUrl,
    author: {
      "@type": "Person",
      name: post.frontmatter.author ?? siteConfig.authorName,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.authorName,
    },
    mainEntityOfPage: postUrl,
    image: post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [`${siteConfig.url}${siteConfig.ogImage}`],
    keywords: post.frontmatter.tags,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${siteConfig.url}/Blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
        item: postUrl,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <Navigation />

      <BlogPostHero title={post.frontmatter.title} />

      <article className="mx-auto max-w-4xl px-6 pb-20 pt-14 lg:px-8 lg:pt-20">
        <div className="prose-blog">{post.content}</div>

        {relatedPosts.length > 0 ? (
          <section aria-label="Related posts" className="mt-16 border-t border-border/60 pt-10">
            <h2 className="font-serif text-2xl">Related posts</h2>
            <ul className="mt-5 space-y-3">
              {relatedPosts.map((relatedPost) => (
                <li key={relatedPost.slug}>
                  <Link href={`/Blogs/${relatedPost.slug}`} className="text-base underline underline-offset-4 hover:opacity-80">
                    {relatedPost.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  )
}
