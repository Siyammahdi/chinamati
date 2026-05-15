import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

const REVIEWS = [
  {
    name: 'Masudur Rahman',
    location: 'Dhaka, BD',
    text: 'Very useful product. Build quality is solid and works perfectly for daily use.',
    date: 'May 16, 2026',
    rating: 5,
  },
  {
    name: 'Nusrat Jahan',
    location: 'Chattogram, BD',
    text: 'Accurate and compact. Exactly what I needed for kitchen measurements.',
    date: 'May 15, 2026',
    rating: 5,
  },
  {
    name: 'Mehedi Hasan',
    location: 'Dhaka, BD',
    text: 'Lightweight and easy to carry. Battery lasts longer than expected.',
    date: 'May 16, 2026',
    rating: 4,
  },
  {
    name: 'Foysal Hossain',
    location: 'Dhaka, BD',
    text: 'Good accuracy for the price. Using it for parcels and it works well.',
    date: 'May 16, 2026',
    rating: 5,
  },
  {
    name: 'Robi Hasan',
    location: 'Khulna, BD',
    text: 'Nice product but the display could be a bit brighter in daylight.',
    date: 'Oct 15, 2025',
    rating: 4,
  },
  {
    name: 'Fahim Zaman',
    location: 'Chadpur, BD',
    text: 'Very helpful for my small business. Makes weighing items super easy.',
    date: 'Oct 12, 2025',
    rating: 5,
  },
];

function Stars({ n = 5 }) {
  return <div className="text-amber-400 text-xs">{'★★★★★'.slice(0, n)}</div>
}

export default function Reviews() {
  const swiperRef = useRef(null)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageCount, setPageCount] = useState(1)

  const perViewByWidth = (w) => (w >= 1440 ? 4 : w >= 1024 ? 3 : w >= 640 ? 2 : 1)

  function recalc(swiper) {
    if (!swiper) return
    const perView = perViewByWidth(swiper.width)
    const total = Math.max(1, Math.ceil(REVIEWS.length / perView))
    setPageCount(total)
    const idx = Math.min(swiper.activeIndex || 0, total - 1)
    setPageIndex(idx)
  }

  useEffect(() => {
    if (swiperRef.current) recalc(swiperRef.current)
  }, [])

  const progress = pageCount ? ((pageIndex + 1) / pageCount) * 100 : 0

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[360px_1fr]">
          <div>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">What our community<br />says</h3>
            <p className="mt-3 text-sm text-neutral-600 max-w-xs">Real feedback from people of our facebook community</p>
          </div>

          <div className="min-w-0 pb-5">
            <Swiper
              modules={[Navigation]}
              onSwiper={(s) => (swiperRef.current = s)}
              onSlideChange={(s) => recalc(s)}
              onResize={(s) => recalc(s)}
              slidesPerView={1}
              spaceBetween={16}
              autoHeight={true}
              observer={true}
              observeParents={true}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 18 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1440: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="w-full overflow-hidden"
            >
              {REVIEWS.map((r, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <article className="rounded-xl bg-neutral-100 p-5 m-1">
                    <header className="flex items-start justify-between">
                      <div className="text-sm font-semibold text-neutral-900">{r.name}{r.location ? `, ${r.location}` : ''}</div>
                    </header>
                    <div className="mt-2"><Stars n={r.rating} /></div>
                    <p className="mt-3 text-sm text-neutral-700 leading-6">{r.text}</p>
                    <footer className="mt-6 text-[11px] text-neutral-500">{r.date}</footer>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => swiperRef.current?.slidePrev()} className="h-9 w-9 grid place-content-center rounded-full border border-neutral-300">‹</button>
                <button onClick={() => swiperRef.current?.slideNext()} className="h-9 w-9 grid place-content-center rounded-full border border-neutral-300">›</button>
              </div>
              <div className="text-sm text-neutral-600">{pageIndex + 1} / {pageCount}</div>
            </div>
            <div className="mt-3 h-[2px] w-full bg-neutral-200 rounded-full">
              <div className="h-full bg-neutral-900 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
