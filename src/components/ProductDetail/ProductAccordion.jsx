import { FiPlus, FiMinus } from 'react-icons/fi'

export default function ProductAccordion({ title, content, isOpen, onToggle }) {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:text-neutral-900 transition-colors"
      >
        <span className="text-base sm:text-lg font-semibold text-neutral-900">
          {title}
        </span>
        {isOpen ? (
          <FiMinus className="h-5 w-5 text-neutral-600 shrink-0" />
        ) : (
          <FiPlus className="h-5 w-5 text-neutral-600 shrink-0" />
        )}
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  )
}


