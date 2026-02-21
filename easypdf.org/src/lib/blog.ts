import matter from 'gray-matter'
import { marked } from 'marked'
import { readingTime } from './utils'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  content: string
  html: string
  readingTime: number
}

// Vite glob import for all markdown files
const modules = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true })

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = []

  for (const [path, raw] of Object.entries(modules)) {
    const slug = path.replace('/content/blog/', '').replace('.md', '')
    const { data, content } = matter(raw as string)
    const html = marked(content) as string

    posts.push({
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      author: data.author || 'EasyPDFKit Team',
      tags: data.tags || [],
      content,
      html,
      readingTime: readingTime(content),
    })
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}
