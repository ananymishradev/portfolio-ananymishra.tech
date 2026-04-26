import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { BlogGrid } from "@/components/blog-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <BlogGrid />
      <Footer />
    </main>
  )
}
