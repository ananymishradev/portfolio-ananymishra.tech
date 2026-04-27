"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import type { BlogPostMeta } from "@/lib/blog"

type BlogsCarouselProps = {
  posts: BlogPostMeta[]
}

const formatDate = (value: string) => {
  const date = new Date(value)
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

const palette = ["#2d4a3e", "#1e3328", "#345245", "#2b3f36", "#4a6156"]

export function BlogsCarousel({ posts }: BlogsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const cards = useMemo(() => {
    return posts.map((post, index) => {
      const color = palette[index % palette.length]
      return {
        ...post,
        color,
      }
    })
  }, [posts])

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 4)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4)
  }

  const scrollByAmount = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <>
      <header className="max-w-3xl border-b border-border pb-10">
          <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
            My Writings          
           </h1>
        </header>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-col lg:overflow-x-auto lg:flex-row gap-5 pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {cards.map((post) => (
          <Link key={post.slug} href={`/Blogs/${post.slug}`} className="group block w-full lg:w-[220px] lg:min-w-[220px] lg:flex-none cursor-pointer">
            <article className="rounded-sm">
              <div
                className="relative mb-3 aspect-[4/5] w-full overflow-hidden rounded-sm"
                style={{
                  backgroundColor: post.color,
                  transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <p className="font-serif text-xl leading-snug text-white/90">{post.title}</p>
                </div>
              </div>

              <p
                className="mb-1 text-center text-[10px] tracking-[0.01em] text-foreground/60"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {post.author ?? "Anany Mishra"} --- {formatDate(post.date)}
              </p>

              <h3
                className="text-center text-[13px] leading-[1.45] text-foreground"
                style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
              >
                {post.description}
              </h3>
            </article>
          </Link>
        ))}
      </div>
    </>
  )
}
