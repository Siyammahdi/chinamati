import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { 
  FiShoppingBag, 
  FiLogOut, 
  FiChevronRight, 
  FiCheckCircle,
  FiArrowLeft
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const { orders, ordersLoading, updateOrderStatus } = useCart()
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [selectedOrder, setSelectedOrder] = useState(null)

  const handleSignOut = async () => {
    await signOut()
    navigate('/signin')
  }

  const totalSales = orders.reduce((acc, order) => acc + (order.total || 0), 0)

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 sticky top-24">
              <div className="mb-8 px-2">
                <h2 className="text-xl font-black text-neutral-900 tracking-tight">Admin Console</h2>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Orders Management</p>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    !selectedOrder 
                      ? 'bg-neutral-900 text-white shadow-md' 
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <FiShoppingBag className="h-4 w-4" />
                  All Orders
                </button>
                
                <div className="my-4 border-t border-neutral-50 pt-4">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all"
                  >
                    <FiLogOut className="h-4 w-4" />
                    Exit Admin
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-100 min-h-[600px]">
              
              {/* Orders List View */}
              {!selectedOrder ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black text-neutral-900">Orders</h3>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-neutral-900 text-white">
                      <p className="text-xs font-bold text-neutral-400 uppercase mb-1">Total Sales</p>
                      <h4 className="text-2xl font-black">৳{totalSales.toLocaleString()}</h4>
                    </div>
                    <div className="p-4 rounded-2xl border border-neutral-100">
                      <p className="text-xs font-bold text-neutral-400 uppercase mb-1">Total Orders</p>
                      <h4 className="text-2xl font-black text-neutral-900">{orders.length}</h4>
                    </div>
                    <div className="p-4 rounded-2xl border border-neutral-100">
                      <p className="text-xs font-bold text-neutral-400 uppercase mb-1">Pending</p>
                      <h4 className="text-2xl font-black text-neutral-900">
                        {orders.filter(o => o.status === 'Processing').length}
                      </h4>
                    </div>
                  </div>

                  {/* Orders List */}
                  {ordersLoading ? (
                    <div className="flex items-center justify-center py-16">
                      <p className="text-neutral-500">Loading orders...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <FiShoppingBag className="h-16 w-16 text-neutral-200 mb-4" />
                      <h4 className="text-lg font-bold text-neutral-700 mb-2">No orders yet</h4>
                      <p className="text-sm text-neutral-500">Orders will appear here when customers place them.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-100">
                      {orders.map((order) => (
                        <div 
                          key={order.id} 
                          className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-neutral-50 transition-colors rounded-2xl cursor-pointer"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-sm font-bold text-neutral-900">{order.id}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                order.status === 'Processing' ? 'bg-amber-50 text-amber-600' : 
                                order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                                'bg-emerald-50 text-emerald-600'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-500">
                              {order.full_name} • {new Date(order.created_at || order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-sm font-bold text-neutral-900">৳{order.total?.toLocaleString()}</p>
                            <FiChevronRight className="h-5 w-5 text-neutral-300" />
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
                    <select 
                      value={selectedOrder.status}
                      onChange={(e) => {
                        updateOrderStatus(selectedOrder.id, e.target.value)
                        setSelectedOrder(prev => ({ ...prev, status: e.target.value }))
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-sm font-bold uppercase outline-none cursor-pointer ${
                        selectedOrder.status === 'Processing' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 
                        selectedOrder.status === 'Shipped' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                        'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      }`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Customer Info */}
                  <div className="p-5 rounded-2xl border border-neutral-100">
                    <p className="text-xs font-bold text-neutral-400 uppercase mb-4">Customer Information</p>
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
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
