import { useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { FiInbox } from 'react-icons/fi'
import ProductCard from '../ProductCard'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { CATEGORIZED_PRODUCTS } from '../../data/products'

const categories = [
  { key: 'advent', label: 'Advent Calendar' },
  { key: 'turbo', label: 'NEW: TURBO BOOST' },
  { key: 'bestsellers', label: 'Bestsellers' },
  { key: 'sale', label: 'SALE %' },
]

// Helper function to create product slug from title
const createSlug = (title) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

function chunkInto(arr, size) {
  const res = []
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size))
  return res
}

export default function ProductGrid() {
  const [active, setActive] = useState(categories[0].key)
  const [pageIndex, setPageIndex] = useState(0)
  const swiperRef = useRef(null)

  const pages = useMemo(() => chunkInto(CATEGORIZED_PRODUCTS[active] ?? [], 4), [active])

  useEffect(() => {
    setPageIndex(0)
    if (swiperRef.current) swiperRef.current.slideTo(0, 0)
  }, [active, pages.length])

  const progress = pages.length > 0 ? ((pageIndex + 1) / pages.length) * 100 : 0

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[32px] sm:text-[38px] leading-none font-extrabold tracking-tight text-neutral-900 mb-2">Our Collections</h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={`rounded-full px-8 py-1 ${active === c.key ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-50'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <a href="#" className="hidden lg:inline font-medium">View All</a>
        </div>

        {pages.length > 0 ? (
          <div className="mt-6">
            <Swiper
              modules={[Navigation]}
              onSwiper={(s) => (swiperRef.current = s)}
              onSlideChange={(s) => setPageIndex(s.realIndex ?? 0)}
              slidesPerView={1}
              spaceBetween={24}
            >
              {pages.map((page, idx) => (
                <SwiperSlide key={idx}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {page.map((p, idx) => (
                      <ProductCard key={p.id || `${p.title}-${idx}`} {...p} id={p.id || createSlug(p.title)} />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-8">
              <div className="flex items-center justify-between hidden">
                <div className="flex items-center gap-3">
                  <button onClick={() => swiperRef.current?.slidePrev()} className="h-9 w-9 grid place-content-center rounded-full  bg-black text-lg text-white"><IoArrowBack /></button>
                  <button onClick={() => swiperRef.current?.slideNext()} className="h-9 w-9 grid place-content-center rounded-full  bg-black text-lg text-white"><IoArrowForward /></button>
                </div>
                <div className="h-[2px] w-[85%] bg-neutral-200 rounded-full">
                <div className="h-full bg-neutral-900 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
                {/* <div className="text-sm text-neutral-600">
                  <span>{pageIndex + 1}</span> / <span>{pages.length}</span>
                </div> */}
                <a href="#" className=" font-medium">View All</a>
              </div>


            </div>
          </div>
        ) : (
          <div className="mt-10 flex items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 py-36 text-neutral-600">
            <div className="text-center">
              <FiInbox className="mx-auto h-20 w-20" />
              <p className="mt-3">No products available in this category right now.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
