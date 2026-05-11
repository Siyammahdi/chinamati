import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiStar } from 'react-icons/fi'
import Breadcrumbs from '../components/ProductDetail/Breadcrumbs'
import ProductImageGallery from '../components/ProductDetail/ProductImageGallery'
import ProductBadges from '../components/ProductDetail/ProductBadges'
import ProductAccordion from '../components/ProductDetail/ProductAccordion'
import ProductReviews from '../components/ProductDetail/ProductReviews'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, openCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState(0) // First accordion open by default

  const product = PRODUCTS[id]

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-neutral-900 text-white rounded-full"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image || product.images[0]
    }, quantity)
    openCart()
  }

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={product.breadcrumbs} />

        {/* Main Content */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Product Images */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductImageGallery images={product.images} tag={product.tag} />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight mb-4">
              {product.title}
            </h1>

            {/* Product Info */}
            <p className="text-lg text-neutral-500 mb-6 leading-relaxed">
              {product.info}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8 bg-neutral-50 self-start px-4 py-2 rounded-2xl">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => {
                  const filled = i < Math.floor(product.rating)
                  return (
                    <FiStar
                      key={i}
                      className={`h-4 w-4 ${
                        filled
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-300'
                      }`}
                    />
                  )
                })}
              </div>
              <span className="text-sm font-bold text-neutral-900">
                {product.rating}
              </span>
              <span className="text-neutral-300">|</span>
              <a
                href="#reviews"
                className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                {product.reviews} reviews
              </a>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-4xl font-black text-neutral-900">
                {product.price}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-neutral-400 line-through decoration-neutral-300">
                  {product.oldPrice}
                </span>
              )}
            </div>

            {/* Quantity & Order Now */}
            <div className="mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xl rounded-2xl shadow-xl shadow-neutral-200 transition-all active:scale-[0.98]"
              >
                ORDER NOW
              </button>
            </div>

            {/* Shipping Info */}
            <div className="space-y-2 mb-8">
              {product.shipping.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span className="text-sm text-neutral-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Product Badges */}
            <ProductBadges badges={product.badges} />

            {/* Accordion Sections */}
            <div className="mt-8 border-t border-neutral-200 pt-6">
              {product.accordionSections.map((section, index) => (
                <ProductAccordion
                  key={index}
                  title={index === 0 ? 'Description' : section.title}
                  content={index === 0 ? product.description : section.content}
                  isOpen={openAccordion === index}
                  onToggle={() => toggleAccordion(index)}
                />
              ))}
            </div>
          </div>
        </div>
        

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />
      </div>
    </div>
  )
}

