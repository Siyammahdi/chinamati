import ProductCard from '../ProductCard'

export default function ShopProducts({ products, page, setPage, pageSize = 8, total }) {
  const pages = Math.ceil(total / pageSize)
  if (!products || products.length === 0) return (<div className='py-16 text-center text-neutral-600'>No products found.</div>)

  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="text-[15px] mb-4">{total} products</div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p, i) => (
            <ProductCard key={(p.title||'') + i} {...p} />
          ))}
        </div>
        {pages > 1 && (
          <div className="flex justify-center gap-2 items-center mt-8">
            <button disabled={page === 1} onClick={() => setPage(page-1)} className={`rounded-md px-3 py-1 text-sm ${page === 1 ? "text-neutral-400 cursor-not-allowed" : "hover:bg-neutral-100"}`}>Previous</button>
            {[...Array(pages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`mx-1 rounded-full w-9 h-9 text-sm font-semibold ${page === idx+1 ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'}`}
              >
                {idx+1}
              </button>
            ))}
            <button disabled={page === pages} onClick={() => setPage(page+1)} className={`rounded-md px-3 py-1 text-sm ${page === pages ? "text-neutral-400 cursor-not-allowed" : "hover:bg-neutral-100"}`}>Next</button>
          </div>
        )}
      </div>
    </section>
  )
}


