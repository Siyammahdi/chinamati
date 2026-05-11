import Marquee from 'react-fast-marquee'

const items = [
  { label: 'Free Shipping from 30€' },
  { label: 'No Sugar' },
  { label: 'Free Goodies from 40€' },
  { label: 'With Natural Ingredients' },
  { label: 'Zero Sugar' },
  { label: 'With Extra Vitamins ' },
  { label: 'Zero Artificial Flavors' },
]

export default function FeatureBar() {
  return (
    <div className='px-4 md:px-8 max-w-[1600px] mx-auto mt-4'>
      <div className="max-w-[1600px] mx-auto rounded-lg bg-black overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 md:py-3">
          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover={false}
            className="flex items-center"
          >
            {items.map((it, idx) => (
              <div key={idx} className="inline-flex items-center gap-2 font-bold mx-8 whitespace-nowrap">
                <span className="text-emerald-600">✓</span>
                <span className="text-white text-xs md:text-sm">{it.label}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
}
