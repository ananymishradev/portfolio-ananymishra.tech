import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { footerSocialLinks, siteConfig } from "@/lib/site-config"

const socialLinks = footerSocialLinks

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <section className="px-6 pb-10 pt-28 lg:px-8 lg:pb-16 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-border pb-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">Contact</p>
              <h1 className="font-serif text-4xl leading-[1.05] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">
                Let&apos;s build something useful and sharp.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-foreground/70 sm:text-lg">
                {siteConfig.authorBio}
              </p>
            </div>

            <div className="space-y-5 text-sm leading-7 text-foreground/75">
              <p>
                Best way to reach me:
                <a
                  href={`mailto:${siteConfig.authorEmail}`}
                  className="ml-2 font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {siteConfig.authorEmail}
                </a>
              </p>
              <p>
                If email is slow, use one of the social links below and I&apos;ll reply there.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer links={socialLinks} className="border-t-0" />
    </main>
  )
}