import { getAllPostsMeta } from "@/lib/blog"
import { siteConfig } from "@/lib/site-config"

export const revalidate = 3600

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;")

export async function GET() {
  const posts = await getAllPostsMeta()

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/Blogs/${post.slug}`
      const description = post.description || `Read ${post.title}`

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid>${url}</guid>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `<description>${escapeXml(description)}</description>`,
        "</item>",
      ].join("")
    })
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escapeXml(siteConfig.title)}</title>
<link>${siteConfig.url}</link>
<description>${escapeXml(siteConfig.description)}</description>
<language>${siteConfig.language}</language>
${items}
</channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
