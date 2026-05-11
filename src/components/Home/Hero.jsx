import { FiShoppingBag, FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import { HERO_PRODUCTS } from '../../data/products'
import { useCart } from '../../context/CartContext'

export default function Hero() {
  const { addToCart, openCart } = useCart()

  const handleOrderNow = (product) => {
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image })
    openCart()
  }

  return (
    <section className="relative px-3 sm:px-4 pt-4 sm:pt-6 pb-8 sm:pb-12 overflow-hidden">
      <div className="mx-auto max-w-[1600px] bg-[#F2EDE4] rounded-[32px] sm:rounded-[40px] overflow-hidden relative">
        <div className="grid lg:grid-cols-12 gap-8 items-center p-5 sm:p-10 lg:p-16">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col min-w-0">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 leading-[1.1] tracking-tight mb-8 sm:mb-12 break-words">
              Chinamati <br />
              <span className="text-[#C6B697]">Premium</span> Gadgets
            </h1>

            {/* Product Cards Row / Slider for Mobile */}
            <div className="relative mb-8 sm:mb-12">
              <div className="hidden sm:grid sm:grid-cols-3 gap-4">
                {HERO_PRODUCTS.map((product) => (
                  <div key={product.id} className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-neutral-100">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-sm text-neutral-900">{product.title}</h3>
                        <button className="text-neutral-400 hover:text-red-500 transition-colors" onClick={(e) => e.preventDefault()}>
                          <FiHeart size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-400 mb-3">{product.tag}</p>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-neutral-900">{product.price}</span>
                      <button 
                        className="text-[10px] font-bold text-neutral-900 underline underline-offset-4"
                        onClick={() => handleOrderNow(product)}
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Swiper */}
              <div className="sm:hidden overflow-visible">
                <Swiper
                  modules={[FreeMode]}
                  spaceBetween={16}
                  slidesPerView={1.2}
                  freeMode={true}
                  className="hero-cards-swiper !overflow-visible"
                >
                  {HERO_PRODUCTS.map((product) => (
                    <SwiperSlide key={product.id} className="!h-auto">
                      <div className="bg-white rounded-3xl p-4 shadow-sm h-full cursor-pointer">
                        <Link to={`/product/${product.id}`}>
                          <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-neutral-100">
                            <img 
                              src={product.image} 
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-sm text-neutral-900">{product.title}</h3>
                            <button className="text-neutral-400 hover:text-red-500 transition-colors" onClick={(e) => e.preventDefault()}>
                              <FiHeart size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-neutral-400 mb-3">{product.tag}</p>
                        </Link>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-neutral-900">{product.price}</span>
                          <button 
                            className="text-[10px] font-bold text-neutral-900 underline underline-offset-4"
                            onClick={() => handleOrderNow(product)}
                          >
                            Order Now
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              <p className="text-neutral-500 max-w-sm text-sm sm:text-base leading-relaxed">
                Experience the perfect blend of innovation and minimalist design. 
                Our gadgets are crafted for the modern lifestyle.
              </p>
              <Link 
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-800 transition-all active:scale-95 shadow-lg"
              >
                <FiShoppingBag />
                Explore Shop
              </Link>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative aspect-square sm:aspect-[4/5] lg:aspect-square rounded-[26px] lg:rounded-full overflow-hidden border-[8px] sm:border-[12px] border-white/30 shadow-2xl">
              <img 
                src="gadget.jpg" 
                alt="Main product showcase"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Tags - Hidden on very small screens or repositioned */}
            <div className="absolute top-[15%] left-0 sm:-left-12 bg-white/90 backdrop-blur-md rounded-2xl p-3  shadow-xl flex items-center gap-3 sm:gap-4 max-w-[140px] sm:max-w-[200px] animate-bounce-slow z-20">
              <div className="w-12 h-12 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img src="mouse.png" alt="tag product" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-[10px] sm:text-xs text-neutral-900">Tech Pouch</h4>
                <p className="font-bold text-[10px] sm:text-xs mt-0.5">€8,99</p>
              </div>
            </div>

            <div className="absolute bottom-[15%] right-0 sm:-right-4 bg-white/90 backdrop-blur-md rounded-2xl p-2  shadow-xl flex items-center gap-3 sm:gap-4 max-w-[140px] sm:max-w-[200px] animate-bounce-slow delay-700 z-20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img src="watch.png" alt="tag product" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-[10px] sm:text-xs text-neutral-900">Cable Organizer</h4>
                <p className="font-bold text-[10px] sm:text-xs mt-0.5">€9,90</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

