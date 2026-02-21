import { useEffect } from 'react'

interface MetaTagsProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}

export function MetaTags({ title, description, canonical, ogImage }: MetaTagsProps) {
  useEffect(() => {
    document.title = title
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.content = content
    }
    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    if (ogImage) setMeta('og:image', ogImage, true)
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = canonical
    }
  }, [title, description, canonical, ogImage])

  return null
}
