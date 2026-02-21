import { useEffect } from 'react'

interface Crumb {
  label: string
  href: string
}

export function BreadcrumbSchema({ crumbs }: { crumbs: Crumb[] }) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://easypdfkit.org/' },
        ...crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: c.label,
          item: 'https://easypdfkit.org' + c.href,
        })),
      ],
    }
    const existing = document.querySelector('script[data-schema="breadcrumb"]')
    if (existing) existing.remove()
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-schema', 'breadcrumb')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => { script.remove() }
  }, [crumbs])
  return null
}
