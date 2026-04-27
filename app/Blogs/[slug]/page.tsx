import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { BlogPostHero } from "@/components/blog-post-hero"
import { getAllPostsMeta, getPostBySlug } from "@/lib/blog"
import { toJsonLd } from "@/lib/seo"
import { siteConfig } from "@/lib/site-config"

type PageProps = {
  params: Promise<{ slug: string }>
}

const formatDate = (value: string) => {
  const date = new Date(value)
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

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

  const canonical = `/Blogs/${post.slug}`

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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: post.frontmatter.author ?? siteConfig.authorName,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.authorName,
    },
    mainEntityOfPage: `${siteConfig.url}/Blogs/${post.slug}`,
    image: post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [`${siteConfig.url}${siteConfig.ogImage}`],
    keywords: post.frontmatter.tags,
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(articleJsonLd) }} />
      <Navigation />

      <BlogPostHero title={post.frontmatter.title} />

      <article className="mx-auto max-w-4xl px-6 pb-20 pt-14 lg:px-8 lg:pt-20">
        <div className="prose-blog">{post.content}</div>
      </article>
    </main>
  )
}
