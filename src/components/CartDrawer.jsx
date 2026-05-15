import { useState, useEffect } from 'react'
import {
  FiX,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiCheckCircle,
} from 'react-icons/fi'
import { createPortal } from 'react-dom'
import { useCart } from '../context/CartContext'

const BANGLADESH_DISTRICTS = [
  "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail",
  "Chittagong", "Bandarban", "Brahmanbaria", "Chandpur", "Comilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati",
  "Rajshahi", "Bogra", "Chapai Nawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Sirajganj",
  "Khulna", "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira",
  "Barisal", "Barguna", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur",
  "Sylhet", "Habiganj", "Moulvibazar", "Sunamganj",
  "Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon",
  "Mymensingh", "Jamalpur", "Netrokona", "Sherpur"
]

export default function CartDrawer({ open, onClose }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    deliveryCharge,
    placeOrder,
  } = useCart()

  const [checkoutStep, setCheckoutStep] = useState('cart') // 'cart', 'checkout', 'success'
  const [orderInfo, setOrderInfo] = useState(null)
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false)
  const [districtSearch, setDistrictSearch] = useState('')

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    address: '',
    district: '',
    phone: '',
  })

  const filteredDistricts = BANGLADESH_DISTRICTS.filter(district =>
    district.toLowerCase().includes(districtSearch.toLowerCase())
  )

  // Reset checkout step when drawer closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setCheckoutStep('cart')
        setOrderInfo(null)
      }, 300)
    }
  }, [open])

  if (typeof document === 'undefined') return null

  const handlePlaceOrder = async (e) => {
    console.log('[CartDrawer] Place Order button clicked!')
    e.preventDefault()
    try {
      const orderPayload = {
        full_name: formData.full_name,
        email: formData.email,
        address: `${formData.district}, ${formData.address}`,
        phone: formData.phone,
      }
      console.log('[CartDrawer] Calling placeOrder with orderPayload:', orderPayload)
      const newOrder = await placeOrder(orderPayload)
      console.log('[CartDrawer] Order placed:', newOrder)
      if (newOrder) {
        setOrderInfo(newOrder)
        setCheckoutStep('success')
      }
    } catch (err) {
      console.error('[CartDrawer] Error in handlePlaceOrder:', err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] ${
        open ? '' : 'pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-lg transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-[92%] sm:w-[500px] max-w-[92%] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 sm:px-5">
            <div className="flex items-center gap-3">
              {checkoutStep === 'checkout' && (
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="grid h-8 w-8 place-content-center rounded-full transition-colors hover:bg-neutral-100"
                >
                  <FiArrowLeft className="h-5 w-5" />
                </button>
              )}

              <h3 className="text-base font-semibold text-neutral-900">
                {checkoutStep === 'cart' &&
                  `Your Cart (${cartItems.length})`}

                {checkoutStep === 'checkout' && 'Checkout'}

                {checkoutStep === 'success' && 'Order Placed'}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="grid h-9 w-9 place-content-center rounded-md hover:bg-neutral-100"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto px-4 py-4 sm:px-5">
            {/* CART VIEW */}
            {checkoutStep === 'cart' && (
              <div className="space-y-6">
                {cartItems.length === 0 ? (
                  <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-50">
                      <FiTrash2 className="h-8 w-8 text-neutral-300" />
                    </div>

                    <p className="text-neutral-500">
                      Your cart is empty
                    </p>

                    <button
                      onClick={onClose}
                      className="mt-4 text-sm font-semibold text-neutral-900 underline underline-offset-4"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const itemPrice =
                      typeof item.price === 'string'
                        ? parseFloat(
                            item.price
                              .replace('৳', '')
                              .replace(',', '')
                          )
                        : item.price

                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-4"
                      >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                          <img
                            src={item.image || '/single-product.png'}
                            alt={item.title}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between">
                            <h4 className="truncate text-sm font-semibold text-neutral-900">
                              {item.title}
                            </h4>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="grid h-8 w-8 place-content-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-rose-500"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-1 text-sm font-medium text-neutral-600">
                            {item.price}
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-neutral-200 px-2 py-1">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="grid h-6 w-6 place-content-center rounded-full hover:bg-neutral-100"
                              >
                                <FiMinus className="h-3 w-3" />
                              </button>

                              <span className="mx-3 w-4 text-center text-xs font-semibold">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="grid h-6 w-6 place-content-center rounded-full hover:bg-neutral-100"
                              >
                                <FiPlus className="h-3 w-3" />
                              </button>
                            </div>

                            <div className="text-sm font-bold text-neutral-900">
                              ৳
                              {(
                                itemPrice * item.quantity
                              ).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}

            {/* CHECKOUT VIEW */}
            {checkoutStep === 'checkout' && (
              <form
                onSubmit={handlePlaceOrder}
                className="space-y-4 py-2"
              >
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Full Name
                  </label>

                  <input
                    required
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors focus:border-neutral-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Email Address
                  </label>

                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors focus:border-neutral-900 focus:outline-none"
                  />
                </div>

                                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 relative">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      District
                    </label>

                    <input
                      required
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={(e) => {
                        setFormData({ ...formData, district: e.target.value })
                        setDistrictSearch(e.target.value)
                        setShowDistrictDropdown(true)
                      }}
                      onFocus={() => setShowDistrictDropdown(true)}
                      onBlur={() => setTimeout(() => setShowDistrictDropdown(false), 200)}
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors focus:border-neutral-900 focus:outline-none"
                    />
                    {showDistrictDropdown && filteredDistricts.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                        {filteredDistricts.map((district, idx) => (
                          <div
                            key={idx}
                            onMouseDown={() => {
                              setFormData({ ...formData, district: district })
                              setDistrictSearch(district)
                              setShowDistrictDropdown(false)
                            }}
                            className="px-4 py-2 text-sm hover:bg-neutral-100 cursor-pointer"
                          >
                            {district}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Phone
                    </label>

                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors focus:border-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Shipping Address
                  </label>

                  <input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors focus:border-neutral-900 focus:outline-none"
                  />
                </div>



                <div className="mt-6 rounded-2xl bg-neutral-50 p-4">
                  <h4 className="mb-2 text-sm font-bold text-neutral-900">
                    Payment Method
                  </h4>

                  <div className="flex items-center gap-3 rounded-xl border-2 border-neutral-900 bg-white p-3">
                    <div className="h-4 w-4 rounded-full border-4 border-neutral-900" />

                    <span className="text-sm font-medium">
                      Cash on Delivery (COD)
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] text-neutral-500">
                    Pay with cash upon delivery. Please ensure you
                    have the exact amount ready.
                  </p>
                </div>

                <div className="mt-6 rounded-2xl bg-neutral-50 p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium text-neutral-900">৳{cartSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Delivery Charge</span>
                    <span className="font-medium text-neutral-900">৳{deliveryCharge.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                    <span className="font-bold text-neutral-900">Total</span>
                    <span className="text-lg font-black text-neutral-900">৳{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-4 text-sm font-bold text-white shadow-lg transition-colors hover:bg-neutral-800"
                >
                  PLACE ORDER • ৳
                  {cartTotal.toLocaleString()}
                </button>
              </form>
            )}

            {/* SUCCESS VIEW */}
            {checkoutStep === 'success' && (
              <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
                  <FiCheckCircle className="h-12 w-12 text-emerald-500" />
                </div>

                <h4 className="mb-2 text-xl font-bold text-neutral-900">
                  Order Confirmed!
                </h4>

                <p className="mb-8 text-sm text-neutral-500">
                  Thank you for your purchase. We've sent a
                  confirmation email to{' '}
                  <span className="font-semibold text-neutral-900">
                    {formData.email}
                  </span>
                  .
                </p>

                <div className="w-full space-y-3 rounded-2xl bg-neutral-50 p-5 text-left">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">
                      Order Number
                    </span>

                    <span className="font-bold text-neutral-900">
                      {orderInfo?.id}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">
                      Payment Mode
                    </span>

                    <span className="font-bold text-neutral-900">
                      Cash on Delivery
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-neutral-200 pt-3 text-xs">
                    <span className="text-neutral-500">
                      Delivery to
                    </span>

                    <span className="font-bold text-neutral-900">
                      {formData.city}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full border-2 border-neutral-900 px-4 py-3 text-sm font-bold text-neutral-900 transition-all hover:bg-neutral-900 hover:text-white"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {checkoutStep === 'cart' && cartItems.length > 0 && (
            <div className="border-t border-neutral-200 bg-white p-4 sm:p-5">
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">
                    Subtotal
                  </span>
                  <span className="text-sm font-semibold text-neutral-900">
                    ৳{cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-600">
                    Delivery Charge
                  </span>
                  <span className="text-sm font-semibold text-neutral-900">
                    ৳{deliveryCharge.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                  <span className="font-bold text-neutral-900">
                    Total
                  </span>
                  <span className="text-lg font-black text-neutral-900">
                    ৳{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutStep('checkout')}
                className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-4 text-sm font-bold text-white shadow-lg transition-colors hover:bg-neutral-800"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>,
    document.body
  )
}
