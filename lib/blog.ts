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

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

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

const normalizeFrontmatter = (raw: Partial<BlogFrontmatter>): BlogFrontmatter => {
  return {
    title: raw.title ?? "Untitled post",
    description: raw.description ?? "",
    date: raw.date ?? new Date().toISOString(),
    published: raw.published ?? true,
    author: raw.author ?? "Anany Mishra",
    tags: raw.tags ?? [],
    coverImage: raw.coverImage,
  }
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  try {
    const entries = await fs.readdir(BLOG_DIR)

    const posts = await Promise.all(
      entries
        .filter((entry) => entry.endsWith(".mdx"))
        .map(async (entry) => {
          const fullPath = path.join(BLOG_DIR, entry)
          const source = await fs.readFile(fullPath, "utf8")
          const { data } = matter(source)
          const frontmatter = normalizeFrontmatter(data as Partial<BlogFrontmatter>)

          return {
            slug: entry.replace(/\.mdx$/, ""),
            ...frontmatter,
          }
        }),
    )

    return posts
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<CompiledBlogPost | null> {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`)

  try {
    const source = await fs.readFile(fullPath, "utf8")
    const { content, data } = matter(source)
    const frontmatter = normalizeFrontmatter(data as Partial<BlogFrontmatter>)

    const compiled = await compileMDX({
      source: content,
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
    return null
  }
}
