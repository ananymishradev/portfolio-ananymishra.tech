import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

export default function About() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.24),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <header className="max-w-3xl border-b border-border pb-10">
          <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
            About Me          
           </h1>
        </header>

        <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-8">
          <aside className="space-y-6">
            <article className="border border-border bg-card p-6">
              <p className="mt-4 text-sm leading-7 text-foreground">{siteConfig.authorBio}</p>
              <p className="mt-4 text-sm leading-7 text-foreground">
                I spend most of my time turning ideas into systems that can actually run in production with clear reliability targets.
              </p>
            </article>

            <article className="border border-border bg-card p-6">
              <p className="uppercase tracking-[0.24em] text-foreground">Current priorities</p>
              <p className="mt-4 text-sm leading-7 text-foreground">
                Right now I am focused on low-latency LLM pipelines, practical eval loops, and shipping workflows that teams can maintain without heavy overhead.
              </p>
            </article>
          </aside>

          <div className="overflow-hidden border border-border bg-card">
            <div className="relative aspect-[4/5] min-h-[420px] lg:h-full lg:min-h-[560px]">
              <Image
                src="/ABOUT-1.png"
                alt="About profile visual"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}