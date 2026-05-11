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

export default function CartDrawer({ open, onClose }) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    placeOrder,
  } = useCart()

  const [checkoutStep, setCheckoutStep] = useState('cart') // 'cart', 'checkout', 'success'
  const [orderInfo, setOrderInfo] = useState(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    phone: '',
  })

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

  const handlePlaceOrder = (e) => {
    e.preventDefault()

    const newOrder = placeOrder(formData)

    setOrderInfo(newOrder)
    setCheckoutStep('success')
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      First Name
                    </label>

                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors focus:border-neutral-900 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Last Name
                    </label>

                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors focus:border-neutral-900 focus:outline-none"
                    />
                  </div>
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
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors focus:border-neutral-900 focus:outline-none"
                  />
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
                    placeholder="Street name and number"
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors focus:border-neutral-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      City
                    </label>

                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors focus:border-neutral-900 focus:outline-none"
                    />
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
                      placeholder="+1 234 567 890"
                      className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm transition-colors focus:border-neutral-900 focus:outline-none"
                    />
                  </div>
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

                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-4 text-sm font-bold text-white shadow-lg transition-colors hover:bg-neutral-800"
                >
                  PLACE ORDER • ৳
                  {cartSubtotal.toLocaleString()}
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
              <div className="mb-4 flex items-center justify-between">
                <span className="font-medium text-neutral-600">
                  Subtotal
                </span>

                <span className="text-lg font-bold">
                  ৳{cartSubtotal.toLocaleString()}
                </span>
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