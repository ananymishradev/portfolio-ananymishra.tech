import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { mdxComponents } from "@/components/mdx-components"

const BLOG_DIRS = [
  path.join(process.cwd(), "data", "blog"),
  path.join(process.cwd(), "content", "blog"),
]

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  published?: boolean
  author?: string
  tags?: string[]
  coverImage?: string
}

export type BlogPostMeta = BlogFrontmatter & {
  slug: string
}

export type CompiledBlogPost = {
  slug: string
  frontmatter: BlogFrontmatter
  content: React.ReactNode
}

const mdxOptions = {
  remarkPlugins: [remarkGfm, remarkMath],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "append" }],
    rehypeKatex,
    [
      rehypePrettyCode,
      {
        keepBackground: false,
        theme: {
          dark: "github-dark",
          light: "github-light",
        },
      },
    ],
  ],
}

const listBlogEntries = async (dir: string) => {
  try {
    await fs.access(dir)
    return await fs.readdir(dir)
  } catch {
    return [] as string[]
  }
}

const extractFirstHeading = (source: string) => {
  const lines = source.split("\n")
  const headingLine = lines.find((line) => line.trim().startsWith("# "))
  if (!headingLine) return null
  return headingLine.replace(/^#\s+/, "").trim() || null
}

const removeFirstH1 = (source: string) => {
  return source.replace(/^#\s+.+\n+/, "")
}

const normalizeFrontmatter = (
  raw: Partial<BlogFrontmatter>,
  fallback: { title: string; description: string; date: string },
): BlogFrontmatter => {
  return {
    title: raw.title ?? fallback.title,
    description: raw.description ?? fallback.description,
    date: raw.date ?? fallback.date,
    published: raw.published ?? true,
    author: raw.author ?? "Anany Mishra",
    tags: raw.tags ?? [],
    coverImage: raw.coverImage,
  }
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  try {
    const allEntries = await Promise.all(BLOG_DIRS.map((dir) => listBlogEntries(dir)))

    const mdxFiles = Array.from(new Set(allEntries.flat().filter((entry) => entry.endsWith(".mdx"))))

    const posts = await Promise.all(
      mdxFiles.map(async (entry) => {
        const slug = entry.replace(/\.mdx$/, "")

        for (const dir of BLOG_DIRS) {
          const fullPath = path.join(dir, entry)

          try {
            const source = await fs.readFile(fullPath, "utf8")
            const { data } = matter(source)
            const derivedTitle = extractFirstHeading(source) ?? slug.replace(/[-_]/g, " ")
            const frontmatter = normalizeFrontmatter(data as Partial<BlogFrontmatter>, {
              title: derivedTitle,
              description: `Read ${derivedTitle}.`,
              date: new Date().toISOString(),
            })

            return {
              slug,
              ...frontmatter,
            }
          } catch {
            continue
          }
        }

        return null
      }),
    )

    return posts
      .filter((post): post is BlogPostMeta => post !== null)
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<CompiledBlogPost | null> {
  for (const dir of BLOG_DIRS) {
    const fullPath = path.join(dir, `${slug}.mdx`)

    try {
      const source = await fs.readFile(fullPath, "utf8")
      const { content, data } = matter(source)
      const derivedTitle = extractFirstHeading(source) ?? slug.replace(/[-_]/g, " ")
      const shouldTrimFirstHeading = !data.title && Boolean(extractFirstHeading(content))
      const normalizedContent = shouldTrimFirstHeading ? removeFirstH1(content) : content
      const frontmatter = normalizeFrontmatter(data as Partial<BlogFrontmatter>, {
        title: derivedTitle,
        description: `Read ${derivedTitle}.`,
        date: new Date().toISOString(),
      })

      const compiled = await compileMDX({
        source: normalizedContent,
        options: {
          mdxOptions,
        },
        components: mdxComponents,
      })

      return {
        slug,
        frontmatter,
        content: compiled.content,
      }
    } catch {
      continue
    }
  }

  return null
}
