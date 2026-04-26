import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { getAllPostsMeta, getPostBySlug } from "@/lib/blog"
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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <article className="mx-auto max-w-4xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
        <header className="mb-10 border-b border-border pb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/55">{formatDate(post.frontmatter.date)}</p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.06] tracking-[-0.02em] sm:text-5xl">{post.frontmatter.title}</h1>
          <p className="mt-4 text-base leading-7 text-foreground/75">{post.frontmatter.description}</p>
          <p className="mt-3 text-sm text-foreground/60">By {post.frontmatter.author ?? siteConfig.authorName}</p>
        </header>

        <div className="prose-blog">{post.content}</div>
      </article>
    </main>
  )
}
