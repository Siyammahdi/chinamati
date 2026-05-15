import { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { FiStar } from 'react-icons/fi'

// Mock review data - In production, this would come from an API
const REVIEW_DATA = {
  'microdrink-bestseller-set': {
    overallRating: 4.1,
    totalReviews: 413,
    ratingDistribution: { 5: 6, 4: 2, 3: 0, 2: 0, 1: 0 },
    reviewImages: [
      '/review-img/rev-1.jpeg',
      '/review-img/rev-2.jpeg',
      '/review-img/rev-3.jpeg',
      '/review-img/rev-4.jpeg',
      '/review-img/rev-5.jpeg',
      '/review-img/rev-6.jpeg',
      '/review-img/rev-7.jpeg',
      '/review-img/rev-2.jpeg',
      '/review-img/rev-6.jpeg',
      '/review-img/rev-2.jpeg'
    ],
   reviews: [
  {
    name: 'Rahim Uddin',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    text: "Qurbani time e use korechi. Exact weight diche, full trusted product. Ekdom honest measurement.",
    date: 'March 12, 2026',
    verified: true
  },
  {
    name: 'Shakil Ahmed',
    location: 'Chittagong, Bangladesh',
    rating: 5,
    text: "Meat weight measure korte onek useful. No error, very reliable during Qurbani.",
    date: 'March 13, 2026',
    verified: true
  },
  {
    name: 'Tushar Rahman',
    location: 'Sylhet, Bangladesh',
    rating: 5,
    text: "Family er sobai use kore satisfied. Fair weight pai, kono doubt thake na.",
    date: 'March 13, 2026',
    verified: true
  },
  {
    name: 'Abdul Karim',
    location: 'Dhaka, Bangladesh',
    rating: 4,
    text: "Good quality scale. Accurate reading dey, Qurbani distribution easy hoye jay.",
    date: 'March 14, 2026',
    verified: true
  },
  {
    name: 'Mehedi Hasan',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    text: "Onk bhalo product. Honest measurement er jonno ei scale ta best.",
    date: 'March 14, 2026',
    verified: true
  },
  {
    name: 'Mohammad Hasan',
    location: 'Barishal, Bangladesh',
    rating: 5,
    text: "Strong build quality and perfect accuracy. Qurbani time e very helpful.",
    date: 'March 15, 2026',
    verified: true
  },
  {
    name: 'Farzana Rahman',
    location: 'Dhaka, Bangladesh',
    rating: 5,
    text: "Very satisfied. Meat division now feels fair and transparent.",
    date: 'March 15, 2026',
    verified: true
  },
  {
    name: 'Imran Hossain',
    location: 'Cumilla, Bangladesh',
    rating: 4,
    text: "Good product for home use. Easy to use and gives accurate results.",
    date: 'March 16, 2026',
    verified: true
  }
]
  }
}

function StarRating({ rating, size = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        const filled = i < Math.floor(rating)
        const half = i === Math.floor(rating) && rating % 1 >= 0.5
        return (
          <FiStar
            key={i}
            className={`${size === 5 ? 'h-5 w-5' : size === 4 ? 'h-4 w-4' : 'h-3 w-3'} ${filled
                ? 'fill-amber-400 text-amber-400'
                : half
                  ? 'fill-amber-200 text-amber-400'
                  : 'text-neutral-300'
              }`}
          />
        )
      })}
    </div>
  )
}

function RatingBar({ stars, count, total }) {
  const percentage = total > 0 ? (count / total) * 100 : 0

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-700 w-8">{stars}</span>
      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-neutral-900 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-neutral-600 w-12 text-right">{count}</span>
    </div>
  )
}

export default function ProductReviews({ productId = 'microdrink-bestseller-set' }) {
  const swiperRef = useRef(null)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageCount, setPageCount] = useState(1)

  // Get review data for the product, or use default
  let reviewData = REVIEW_DATA[productId]

  // If no specific review data, use the default with modified product-specific info
  if (!reviewData) {
    reviewData = {
      ...REVIEW_DATA['microdrink-bestseller-set'],
      totalReviews: Math.floor(100 + Math.random() * 400),
      overallRating: 4.0 + Math.random() * 1.0
    }
  }

  const { overallRating, totalReviews, ratingDistribution, reviewImages, reviews } = reviewData

  // Calculate total for distribution
  const distributionTotal = Object.values(ratingDistribution).reduce((a, b) => a + b, 0)

  const perViewByWidth = (w) => (w >= 1440 ? 4 : w >= 1024 ? 3 : w >= 640 ? 2 : 1)

  function recalc(swiper) {
    if (!swiper) return
    const perView = perViewByWidth(swiper.width)
    const total = Math.max(1, Math.ceil(reviews.length / perView))
    setPageCount(total)
    const idx = Math.min(swiper.activeIndex || 0, total - 1)
    setPageIndex(idx)
  }

  useEffect(() => {
    if (swiperRef.current) recalc(swiperRef.current)
  }, [reviews.length])

  const progress = pageCount ? ((pageIndex + 1) / pageCount) * 100 : 0

  return (
    <section id="reviews" className="py-12 sm:py-16 border-t border-neutral-200 ">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className='flex gap-12 w-full items-center overflow-hidden'>
          {/* Overall Rating Summary */}
          <div className=" mb-12 w-1/2">
            {/* Left: Overall Rating */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl font-bold text-neutral-900">
                  {overallRating.toFixed(1)}/5
                </span>
                <StarRating rating={overallRating} size={5} />
              </div>
              <p className="text-sm text-neutral-600">
                Based on {totalReviews.toLocaleString()} reviews
              </p>
            </div>

            {/* Right: Rating Distribution */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">Rating Distribution</h3>
              {[5, 4, 3, 2, 1].map((stars) => (
                <RatingBar
                  key={stars}
                  stars={stars}
                  count={ratingDistribution[stars] || 0}
                  total={distributionTotal}
                />
              ))}
            </div>
          </div>

          {/* Review Images Gallery */}
          {reviewImages && reviewImages.length > 0 && (
            <div className="mb-12">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4">
                {reviewImages.map((image, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-neutral-100 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={image}
                      alt={`Review ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Individual Reviews Slider */}
        <div className="min-w-0 pb-5 mb-8">
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
            {reviews.map((review, index) => (
              <SwiperSlide key={index} className="h-auto">
                <article className="rounded-xl bg-neutral-100 p-5 m-1">
                  <header className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="text-sm font-semibold text-neutral-900">
                          {review.name}{review.location ? `, ${review.location}` : ''}
                        </h4>
                  
                      </div>
                    </div>
                  </header>
                  <div className="mt-2 mb-3">
                    <StarRating rating={review.rating} size={4} />
                  </div>
                  <p className="mt-3 text-sm text-neutral-700 leading-6">{review.text}</p>
                  <footer className="mt-6 text-[11px] text-neutral-500">{review.date}</footer>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="h-9 w-9 grid place-content-center rounded-full border border-neutral-300 hover:bg-neutral-50 transition-colors"
              >
                ‹
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="h-9 w-9 grid place-content-center rounded-full border border-neutral-300 hover:bg-neutral-50 transition-colors"
              >
                ›
              </button>
            </div>
            <div className="text-sm text-neutral-600">{pageIndex + 1} / {pageCount}</div>
          </div>
          <div className="mt-3 h-[2px] w-full bg-neutral-200 rounded-full">
            <div className="h-full bg-neutral-900 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Verification Disclaimer */}
        <p className="text-xs text-neutral-500 mb-8 max-w-4xl">
          Reviews displayed with 'Verified Reviewer' are from customers who can be associated with a specific order at chinamati. You can find more information about the review verification process{' '}
          <a href="#" className="text-neutral-900 hover:underline">
            here
          </a>
          .
        </p>
      </div>
    </section>
  )
}


