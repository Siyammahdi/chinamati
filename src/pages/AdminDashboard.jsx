import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { 
  FiShoppingBag, 
  FiUsers, 
  FiBox, 
  FiPieChart, 
  FiLogOut, 
  FiChevronRight, 
  FiSearch, 
  FiMoreVertical,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiArrowLeft
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const { orders, updateOrderStatus } = useCart()
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const handleSignOut = async () => {
    await signOut()
    navigate('/signin')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiPieChart },
    { id: 'orders', label: 'Orders', icon: FiShoppingBag },
    { id: 'products', label: 'Products', icon: FiBox },
    { id: 'users', label: 'Users', icon: FiUsers },
  ]

  // Mock data for products and users
  const [products] = useState([
    { id: 1, name: 'Sample Water Bottle', price: '€19,90', category: 'Accessories', stock: 45 },
    { id: 2, name: 'Classic Leather Bag', price: '€89,00', category: 'Bags', stock: 12 },
    { id: 3, name: 'Premium Watch', price: '€249,00', category: 'Watches', stock: 8 },
  ])

  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2026-04-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '2026-04-05' },
  ])

  const totalSales = orders.reduce((acc, order) => acc + order.total, 0)

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 sticky top-24">
              <div className="mb-8 px-2">
                <h2 className="text-xl font-black text-neutral-900 tracking-tight">Admin Console</h2>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Management Portal</p>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
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
              
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-neutral-900">Dashboard Overview</h3>
                    <div className="text-xs font-bold text-neutral-400 uppercase bg-neutral-50 px-3 py-1 rounded-full">Live Stats</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-3xl bg-neutral-900 text-white shadow-xl shadow-neutral-200">
                      <p className="text-xs font-bold text-neutral-400 uppercase mb-2">Total Sales</p>
                      <h4 className="text-3xl font-black">€{totalSales.toFixed(2).replace('.', ',')}</h4>
                      <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs font-bold">
                        <span>+12% from last month</span>
                      </div>
                    </div>
                    <div className="p-6 rounded-3xl border border-neutral-100 bg-white">
                      <p className="text-xs font-bold text-neutral-400 uppercase mb-2">Total Orders</p>
                      <h4 className="text-3xl font-black text-neutral-900">{orders.length}</h4>
                      <div className="mt-4 flex items-center gap-2 text-neutral-400 text-xs font-bold">
                        <span>{orders.filter(o => o.status === 'Processing').length} pending processing</span>
                      </div>
                    </div>
                    <div className="p-6 rounded-3xl border border-neutral-100 bg-white">
                      <p className="text-xs font-bold text-neutral-400 uppercase mb-2">Active Users</p>
                      <h4 className="text-3xl font-black text-neutral-900">{users.length}</h4>
                      <div className="mt-4 flex items-center gap-2 text-neutral-400 text-xs font-bold">
                        <span>+2 new today</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest mb-4">Recent Activity</h4>
                    <div className="space-y-3">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-neutral-900 border border-neutral-100">
                              <FiShoppingBag className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-neutral-900">New order {order.id}</p>
                              <p className="text-[10px] text-neutral-500">{new Date(order.date).toLocaleString()}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-neutral-900">€{order.total.toFixed(2).replace('.', ',')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black text-neutral-900">Manage Orders</h3>
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input 
                        type="text" 
                        placeholder="Search orders..." 
                        className="pl-10 pr-4 py-2 rounded-full bg-neutral-50 border border-neutral-100 text-sm focus:outline-none focus:border-neutral-900 transition-all w-64"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-neutral-100">
                          <th className="pb-4 text-xs font-bold text-neutral-400 uppercase">Order ID</th>
                          <th className="pb-4 text-xs font-bold text-neutral-400 uppercase">Customer</th>
                          <th className="pb-4 text-xs font-bold text-neutral-400 uppercase">Date</th>
                          <th className="pb-4 text-xs font-bold text-neutral-400 uppercase">Total</th>
                          <th className="pb-4 text-xs font-bold text-neutral-400 uppercase">Status</th>
                          <th className="pb-4 text-xs font-bold text-neutral-400 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-50">
                        {orders.map((order) => (
                          <tr key={order.id} className="group hover:bg-neutral-50 transition-colors">
                            <td className="py-4 text-sm font-bold text-neutral-900">{order.id}</td>
                            <td className="py-4 text-sm text-neutral-600">{order.firstName} {order.lastName}</td>
                            <td className="py-4 text-sm text-neutral-500">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="py-4 text-sm font-bold text-neutral-900">€{order.total.toFixed(2).replace('.', ',')}</td>
                            <td className="py-4">
                              <select 
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase outline-none cursor-pointer ${
                                  order.status === 'Processing' ? 'bg-amber-50 text-amber-600' : 
                                  order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                                  'bg-emerald-50 text-emerald-600'
                                }`}
                              >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-4">
                              <button className="h-8 w-8 rounded-lg hover:bg-white flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-all">
                                <FiMoreVertical />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Products Tab */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black text-neutral-900">Inventory</h3>
                    <button className="flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-200">
                      <FiPlus />
                      Add Product
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-5 rounded-3xl border border-neutral-100 hover:border-neutral-200 transition-all group">
                        <div className="flex items-center gap-5">
                          <div className="h-16 w-16 rounded-2xl bg-neutral-50 flex items-center justify-center p-2 border border-neutral-100">
                            <FiBox className="h-8 w-8 text-neutral-300" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-neutral-900">{product.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs font-bold text-neutral-400 uppercase">{product.category}</span>
                              <span className="text-xs font-bold text-neutral-900">{product.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="h-10 w-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all">
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                          <button className="h-10 w-10 rounded-xl bg-neutral-50 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black text-neutral-900">Customer List</h3>
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{users.length} Customers Registered</div>
                  </div>

                  <div className="divide-y divide-neutral-50">
                    {users.map((user) => (
                      <div key={user.id} className="py-5 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center text-white font-bold">
                            {user.name[0]}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-neutral-900">{user.name}</h4>
                            <p className="text-xs text-neutral-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Joined</p>
                          <p className="text-xs font-bold text-neutral-900">{new Date(user.joined).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
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
