import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { FiPackage, FiUser, FiShoppingBag, FiChevronRight, FiClock, FiCheckCircle, FiMapPin, FiMail, FiPhone, FiLogOut, FiSettings, FiArrowLeft } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { orders, cartItems, cartSubtotal, ordersLoading } = useCart()
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const isAdmin = profile?.role === 'admin'

  const handleSignOut = async () => {
    await signOut()
    navigate('/signin')
  }

  const getCartItemTotal = (item) => {
    const priceValue = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('৳', '').replace(',', '')) 
      : item.price
    return (priceValue * item.quantity).toLocaleString()
  }

  const tabs = [
    { id: 'orders', label: 'Orders', icon: FiPackage },
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'cart', label: 'Cart', icon: FiShoppingBag },
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-24 pb-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center text-white font-bold text-lg">
                  {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="font-bold text-neutral-900">
                    {profile?.full_name || user?.email?.split('@')[0]}
                  </h2>
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setSelectedOrder(null)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id 
                        ? 'bg-neutral-900 text-white shadow-md' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-all"
                  >
                    <FiSettings className="h-4 w-4" />
                    Admin Console
                  </Link>
                )}
                
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all mt-4"
                >
                  <FiLogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl p-6 sm:p-8 min-h-[500px]">
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                !selectedOrder ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-neutral-900">Order History</h3>
                      <span className="text-xs font-medium text-neutral-400">{orders.length} total orders</span>
                    </div>

                    {ordersLoading ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-neutral-500">Loading orders...</div>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-16 w-16 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
                          <FiPackage className="h-8 w-8 text-neutral-200" />
                        </div>
                        <p className="text-neutral-500 text-sm">You haven't placed any orders yet.</p>
                        <Link to="/products" className="mt-4 text-sm font-bold text-neutral-900 underline underline-offset-4">
                          Start Shopping
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="border border-neutral-100 rounded-2xl p-4 sm:p-5 hover:border-neutral-200 transition-colors cursor-pointer" onClick={() => setSelectedOrder(order)}>
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-bold text-neutral-900">{order.id}</span>
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    order.status === 'Processing' ? 'bg-amber-50 text-amber-600' : 
                                    order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                                    order.status === 'Cancelled' ? 'bg-red-50 text-red-600' :
                                    'bg-emerald-50 text-emerald-600'
                                  }`}>
                                    {order.status}
                                  </span>
                                </div>
                                <p className="text-xs text-neutral-500">
                                  {new Date(order.created_at || order.date).toLocaleDateString('en-US', { 
                                    month: 'long', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-neutral-400 mb-1">Total Amount</p>
                                <p className="font-bold text-neutral-900">৳{order.total?.toLocaleString()}</p>
                              </div>
                            </div>
                            
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="h-14 w-14 shrink-0 rounded-lg bg-neutral-50 p-1 border border-neutral-100">
                                  <img src={item.image} alt="" className="h-full w-full object-contain" title={item.title} />
                                </div>
                              ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-neutral-50 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-[11px] font-medium text-neutral-500">
                                <FiClock className="h-3 w-3" />
                                Estimated delivery: 2-3 business days
                              </div>
                              <button className="text-xs font-bold text-neutral-900 hover:underline">
                                Order Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Order Details View
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="h-10 w-10 rounded-xl bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                      >
                        <FiArrowLeft className="h-4 w-4" />
                      </button>
                      <div>
                        <h3 className="text-2xl font-black text-neutral-900">Order Details</h3>
                        <p className="text-sm text-neutral-500">{selectedOrder.id}</p>
                      </div>
                    </div>

                    {/* Order Status */}
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                      <p className="text-xs font-bold text-neutral-400 uppercase mb-2">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-xl text-sm font-bold uppercase ${
                        selectedOrder.status === 'Processing' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 
                        selectedOrder.status === 'Shipped' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                        selectedOrder.status === 'Cancelled' ? 'bg-red-50 text-red-600 border border-red-200' :
                        'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      }`}>
                        {selectedOrder.status}
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="p-5 rounded-2xl border border-neutral-100">
                      <p className="text-xs font-bold text-neutral-400 uppercase mb-4">Delivery Information</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-neutral-500 mb-1">Name</p>
                          <p className="text-sm font-medium text-neutral-900">{selectedOrder.full_name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 mb-1">Email</p>
                          <p className="text-sm font-medium text-neutral-900">{selectedOrder.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-500 mb-1">Phone</p>
                          <p className="text-sm font-medium text-neutral-900">{selectedOrder.phone}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs text-neutral-500 mb-1">Address</p>
                        <p className="text-sm font-medium text-neutral-900">{selectedOrder.address}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="p-5 rounded-2xl border border-neutral-100">
                      <p className="text-xs font-bold text-neutral-400 uppercase mb-4">Order Items</p>
                      <div className="divide-y divide-neutral-100">
                        {selectedOrder.items?.map((item, idx) => (
                          <div key={idx} className="py-4 flex items-center gap-4">
                            <div className="h-16 w-16 rounded-xl bg-neutral-100 overflow-hidden flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-neutral-900">{item.title}</p>
                              <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-sm font-bold text-neutral-900">৳{item.price}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                        <p className="text-sm font-bold text-neutral-400 uppercase">Total</p>
                        <p className="text-xl font-black text-neutral-900">৳{selectedOrder.total?.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Order Date */}
                    <div className="text-xs text-neutral-400">
                      Placed on {new Date(selectedOrder.created_at || selectedOrder.date).toLocaleString()}
                    </div>
                  </div>
                )
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">Profile Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Personal Info</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                          <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-neutral-400 shadow-sm">
                            <FiUser className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase">Full Name</p>
                            <p className="text-sm font-bold text-neutral-900">
                              {profile?.full_name || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                          <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-neutral-400 shadow-sm">
                            <FiMail className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase">Email Address</p>
                            <p className="text-sm font-bold text-neutral-900">{user?.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Tab */}
              {activeTab === 'cart' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-neutral-900">Active Cart</h3>
                    <span className="text-xs font-medium text-neutral-400">{cartItems.length} items</span>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="h-16 w-16 rounded-full bg-neutral-50 flex items-center justify-center mb-4">
                        <FiShoppingBag className="h-8 w-8 text-neutral-200" />
                      </div>
                      <p className="text-neutral-500 text-sm">Your cart is currently empty.</p>
                      <Link to="/products" className="mt-4 text-sm font-bold text-neutral-900 underline underline-offset-4">
                        Browse Products
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="divide-y divide-neutral-100">
                        {cartItems.map((item) => (
                          <div key={item.id} className="py-4 flex items-center gap-4">
                            <div className="h-16 w-16 rounded-xl bg-neutral-50 p-1 border border-neutral-100">
                              <img src={item.image} alt="" className="h-full w-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-neutral-900 truncate">{item.title}</h4>
                              <p className="text-xs text-neutral-500">{item.quantity} × {item.price}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-neutral-900">৳{getCartItemTotal(item)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-6 border-t border-neutral-100">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <p className="text-xs text-neutral-400 font-bold uppercase">Subtotal</p>
                            <p className="text-2xl font-black text-neutral-900">৳{cartSubtotal.toLocaleString()}</p>
                          </div>
                          <Link 
                            to="/products"
                            className="text-xs font-bold text-neutral-900 hover:underline"
                          >
                            Add more items
                          </Link>
                        </div>
                        <button 
                          className="w-full py-4 rounded-full bg-neutral-900 text-white font-bold text-sm shadow-xl shadow-neutral-200 hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent('openCartDrawer'));
                          }}
                        >
                          PROCEED TO CHECKOUT
                          <FiChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
