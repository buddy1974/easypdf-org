import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface Tool {
  label: string
  href: string
  description: string
}

interface RelatedToolsProps {
  tools: Tool[]
  title?: string
}

export function RelatedTools({ tools, title = 'Related Tools' }: RelatedToolsProps) {
  return (
    <section className="mt-12 border-t border-gray-200 pt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            to={tool.href}
            className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group"
          >
            <ArrowRight
              size={16}
              className="mt-0.5 text-blue-500 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
            />
            <div>
              <p className="font-medium text-gray-900 group-hover:text-blue-700">{tool.label}</p>
              <p className="text-sm text-gray-500 mt-0.5">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
