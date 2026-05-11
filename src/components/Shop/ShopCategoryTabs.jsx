export default function ShopCategoryTabs({ selected, onSelect, categories = ["All products"] }) {
  return (
    <div className="bg-white sticky top-0 z-20 py-4 border-b border-neutral-200">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 min-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onSelect?.(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${selected === cat ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}


