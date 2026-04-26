import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { getAllPostsMeta } from "@/lib/blog"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Blogs",
  description: `Articles by ${siteConfig.authorName} on AI systems, infrastructure, and engineering.`,
  alternates: {
    canonical: "/Blogs",
  },
}

const formatDate = (value: string) => {
  const date = new Date(value)
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export default async function BlogsPage() {
  const posts = await getAllPostsMeta()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="mx-auto max-w-5xl px-6 pb-16 pt-28 lg:px-8 lg:pt-36">
        <header className="mb-10 border-b border-border pb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-foreground/55">Writing</p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.08] tracking-[-0.02em] sm:text-5xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/70 sm:text-base">{siteConfig.description}</p>
        </header>

        {posts.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border p-6 text-sm text-foreground/70">No posts yet. Add an MDX file in content/blog to publish your first article.</p>
        ) : (
          <div className="grid gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/Blogs/${post.slug}`}
                className="group rounded-xl border border-border bg-card/40 p-6 transition-colors hover:bg-card/80"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-serif text-2xl leading-tight tracking-[-0.01em]">{post.title}</h2>
                  <span className="text-xs uppercase tracking-[0.16em] text-foreground/55">{formatDate(post.date)}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-foreground/70">{post.description}</p>
                {(post.tags ?? []).length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(post.tags ?? []).map((tag) => (
                      <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-foreground/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
