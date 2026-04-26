import Link from "next/link"

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export const mdxComponents = {
  a: ({ href = "", children, ...props }: AnchorProps) => {
    const isExternal = href.startsWith("http")

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
          {children}
        </a>
      )
    }

    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  },
  img: ({ alt = "", ...props }: ImageProps) => {
    return <img alt={alt} loading="lazy" {...props} />
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    return <pre {...props} />
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    return <code {...props} />
  },
}
