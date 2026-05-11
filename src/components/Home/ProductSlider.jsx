import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { SLIDER_ITEMS } from '../../data/products'

// Helper function to create product slug from title
const createSlug = (title) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

export default function ProductSlider() {
  const swiperRef = useRef(null)
  const [index, setIndex] = useState(0)

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] sm:text-[34px] font-medium text-center tracking-tight text-neutral-900">Your favourite gadgets</h2>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => swiperRef.current?.slidePrev()} className="h-9 w-9 grid place-content-center rounded-full border border-neutral-300 text-lg">‹</button>
            <button onClick={() => swiperRef.current?.slideNext()} className="h-9 w-9 grid place-content-center rounded-full border border-neutral-300 text-lg">›</button>
          </div>
        </div>

        <div className="mt-6 relative">

          <Swiper
            modules={[Navigation]}
            onSwiper={(s) => (swiperRef.current = s)}
            onSlideChange={(s) => setIndex((s.realIndex ?? 0) % SLIDER_ITEMS.length)}
            loop={true}
            loopedSlides={SLIDER_ITEMS.length}
            loopAdditionalSlides={SLIDER_ITEMS.length}
            loopedSlidesLimit={false}
            loopPreventsSliding={false}
            watchSlidesProgress={true}
            slidesPerGroup={1}
            speed={500}
            slidesPerView={1.2}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 6, spaceBetween: 20 },
            }}
            className="overflow-visible"
          >
            {SLIDER_ITEMS.map((item, i) => (
              <SwiperSlide key={i}>
                <Link to={`/product/${item.id || createSlug(item.title)}`} className="flex flex-col items-center group">
                  <div className="h-48 sm:h-56 lg:h-72 w-full max-w-[280px] mx-auto overflow-hidden rounded-xl bg-white transition-transform duration-300 group-hover:scale-105">
                    <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="text-sm font-medium tracking-wide text-neutral-900 mt-2 group-hover:text-neutral-600 transition-colors">
                    {item.title}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile buttons */}
          <div className="mt-6 flex md:hidden items-center justify-center gap-3">
            <button onClick={() => swiperRef.current?.slidePrev()} className="h-9 w-9 grid place-content-center rounded-full border border-neutral-300 text-lg">‹</button>
            <button onClick={() => swiperRef.current?.slideNext()} className="h-9 w-9 grid place-content-center rounded-full border border-neutral-300 text-lg">›</button>
          </div>
        </div>
      </div>
    </section>
  )
}
