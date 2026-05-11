export default function NavMegaDrawer({ open, active, onClose }) {
  const groups = {
    Featured: [
      { title: 'All Bottles', desc: 'For every drinking occasion.', img: '/product.png' },
      { title: 'Glass Bottles', desc: 'Durable borosilicate glass.', img: '/product.png' },
      { title: 'All-Purpose Steel Bottles', desc: 'Wide opening, mix & match lids.', img: '/product.png' },
      { title: 'Glass Bottles', desc: 'Durable borosilicate glass.', img: '/product.png' },
      { title: 'All-Purpose Steel Bottles', desc: 'Wide opening, mix & match lids.', img: '/product.png' },
      { title: 'All-Purpose Steel Bottles', desc: 'Wide opening, mix & match lids.', img: '/product.png' },
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
      { title: 'Explorer Thermo Tumbler', desc: 'Built-in straw lid', img: '/single-product.png' },
      { title: 'All-Purpose Steel Bottles', desc: 'Wide opening, mix & match lids.', img: '/product.png' },
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
      { title: 'Explorer Thermo Tumbler', desc: 'Built-in straw lid', img: '/single-product.png' },
    ],
    Wallet: [
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
      { title: 'Explorer Thermo Tumbler', desc: 'Built-in straw lid', img: '/single-product.png' },
      { title: 'Lids & Caps', desc: 'Caps for every bottle', img: '/single-product.png' },
      { title: 'Glass Bottles', desc: 'Durable borosilicate glass.', img: '/product.png' },
      { title: 'All-Purpose Steel Bottles', desc: 'Wide opening, mix & match lids.', img: '/product.png' },
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
      { title: 'Explorer Thermo Tumbler', desc: 'Built-in straw lid', img: '/single-product.png' },
      { title: 'All-Purpose Steel Bottles', desc: 'Wide opening, mix & match lids.', img: '/product.png' },
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
      { title: 'Explorer Thermo Tumbler', desc: 'Built-in straw lid', img: '/single-product.png' },
      { title: 'All-Purpose Steel Bottles', desc: 'Wide opening, mix & match lids.', img: '/product.png' },
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
    ],
    Watch: [
      { title: 'Homeware & Accessories', desc: 'Carafes, cups, lids & more.', img: '/product.png' },
      { title: 'LUCY® Filter Carafe', desc: 'Purifies water, preserves minerals.', img: '/product.png' },
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
      { title: 'Explorer Thermo Tumbler', desc: 'Built-in straw lid', img: '/single-product.png' },
      { title: 'All-Purpose Steel Bottles', desc: 'Wide opening, mix & match lids.', img: '/product.png' },
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
      { title: 'Explorer Thermo Tumbler', desc: 'Built-in straw lid', img: '/single-product.png' },
      { title: 'All-Purpose Steel Bottles', desc: 'Wide opening, mix & match lids.', img: '/product.png' },
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
      { title: 'Explorer Thermo Tumbler', desc: 'Built-in straw lid', img: '/single-product.png' },
    ],
    'Learn More': [
      { title: 'Sustainability', desc: 'Better for you and the planet.', img: '/product.png' },
      { title: 'Our Story', desc: 'How we got started.', img: '/product.png' },
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
      { title: 'Explorer Thermo Tumbler', desc: 'Built-in straw lid', img: '/single-product.png' },
      { title: 'All-Purpose Steel Bottles', desc: 'Wide opening, mix & match lids.', img: '/product.png' },
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
      { title: 'Explorer Thermo Tumbler', desc: 'Built-in straw lid', img: '/single-product.png' },
      { title: 'All-Purpose Steel Bottles', desc: 'Wide opening, mix & match lids.', img: '/product.png' },
      { title: 'Steel Bottles', desc: 'Robust and odourless stainless.', img: '/single-product.png' },
      { title: 'Explorer Thermo Tumbler', desc: 'Built-in straw lid', img: '/single-product.png' },
    ],
  }

  const items = groups[active] || []

  return (
    <div className={`absolute left-0 right-0 top-full z-40 ${open ? '' : 'pointer-events-none'}`} onMouseLeave={onClose} style={{height: 'auto', padding:0, margin:0}}>
      <div className={`transition-all duration-200 w-full ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`} style={{height: 'auto', padding:0, margin:0}}>
        <div className="overflow-x-auto overflow-y-visible border-x-0 border-b border-neutral-200 bg-white shadow-lg w-full" style={{height:'auto', padding:0, margin:0}}>
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {items.map((it, idx) => (
              <a key={idx} href="#" className="flex items-center gap-4 rounded-xl p-3 hover:bg-neutral-50">
                <div className="h-16 w-16 rounded-lg bg-neutral-100 overflow-hidden flex items-center justify-center">
                  <img src={it.img} alt="" className="h-14 w-14 object-contain" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-neutral-900">{it.title}</div>
                  <div className="text-sm text-neutral-600">{it.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
