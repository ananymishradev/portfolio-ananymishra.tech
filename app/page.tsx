import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { BlogsCarousel } from "@/components/blogs-carousel"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/lib/site-config"
import { toJsonLd } from "@/lib/seo"
import { getAllPostsMeta } from "@/lib/blog"
import About from "@/components/about"

export const metadata: Metadata = {
  title: "AI Systems Engineering and Blog",
  description:
    "AI systems engineering articles on model serving, infrastructure, and cost-aware intelligence by Anany Mishra.",
  alternates: {
    canonical: "/",
  },
}

export default async function Home() {
  const posts = await getAllPostsMeta()

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.authorWebsite,
    description: siteConfig.authorBio,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.huggingface,
    ],
  }

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
  }

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(websiteJsonLd) }} />
      <Navigation />
      <HeroSection />
      <About />
      <section className="w-full px-8 py-8 md:px-16 lg:py-12">
        <BlogsCarousel posts={posts} />
      </section>
      <Footer />
    </main>
  )
}
