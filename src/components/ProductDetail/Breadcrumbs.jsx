import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null

  return (
    <nav className="flex items-center gap-2 text-xs text-neutral-600" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        
        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <FiChevronRight className="h-4 w-4 text-neutral-400" />
            )}
            {isLast ? (
              <span className="text-neutral-900 font-medium">{item}</span>
            ) : (
              <Link
                to={index === 0 ? '/' : '/products'}
                className="hover:text-neutral-900 transition-colors"
              >
                {item}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}


