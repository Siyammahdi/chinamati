import { FiX } from 'react-icons/fi'

const hotspots = [
  { id: 1, top: '50%', left: '10%', title: 'ICE TEA PEACH', price: '€8,99' },
  { id: 2, top: '50%', left: '36%', title: 'ICE TEA RASPBERRY', price: '€8,99' },
  { id: 3, top: '50%', left: '60%', title: 'ICE TEA LEMON', price: '€8,99' },
  { id: 4, top: '50%', left: '80%', title: 'ICE TEA BLUEBERRY', price: '€9,90' },
]

export default function BrandFeature() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1100px] px-4 text-center">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900">
          The brand that inspired us to drink
          <br />
          more water everyday.
        </h3>
        <div className="mt-4 tracking-[0.3em] text-neutral-500">VOGUE</div>
      </div>

      <div className="mt-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://res.cloudinary.com/dttbj6a0m/image/upload/v1778526299/photo-1636115305669-9096bffe87fd_dlgxsk.avif"
            alt="Brand"
            className="h-[420px] sm:h-[520px] w-full object-cover"
          />

          {/* Hotspot buttons with hover tooltips */}
          {hotspots.map((h) => (
            <div
              key={h.id}
              className="group absolute"
              style={{ top: h.top, left: h.left }}
            >
              <button
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/50 backdrop-blur-lg shadow-md ring-1 ring-black/5 grid place-content-center hover:bg-white"
                aria-label={h.title}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 block" />
              </button>

              {/* Tooltip card */}
              <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity ">
 
                <div className="w-[260px] sm:w-[280px] flex gap-2 h-32 rounded-xl bg-white p-4 shadow-xl ring-1 ring-black/5">
                <div className="h-40 w-20">
                <img className='rounded-xl' src="/product.png" alt="" />
              </div>
                <div>
                <div className="flex items-center justify-between">
                    <div className="text-[13px] font-semibold">{h.title}</div>
                    <button className="text-neutral-400 hover:text-neutral-600">
                      <FiX />
                    </button>
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">{h.price}</div>
                  <button className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">
                    + ADD TO CART
                  </button>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
