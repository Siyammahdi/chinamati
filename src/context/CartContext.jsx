import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const { user, profile, loading: authLoading } = useAuth()
  const ordersFetchingRef = useRef(false)

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  const [cartOpen, setCartOpen] = useState(false)
  
  const DELIVERY_CHARGE = 90

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Fetch orders from Supabase
  const fetchOrders = useCallback(async () => {
    if (ordersFetchingRef.current) {
      console.log('[CartContext] Already fetching orders, skipping')
      return
    }

    try {
      ordersFetchingRef.current = true
      setOrdersLoading(true)
      console.log('[CartContext] Fetching orders...')
      
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      console.log('[CartContext] User:', user?.id, 'Profile role:', profile?.role)

      // If user is not admin, only fetch their own orders
      if (profile?.role !== 'admin' && user?.id) {
        query = query.eq('user_id', user.id)
        console.log('[CartContext] Fetching only user orders')
      }
      
      const { data, error } = await query
      
      if (!error) {
        console.log('[CartContext] Orders fetched:', data)
        setOrders(data || [])
      } else {
        console.error('[CartContext] Error fetching orders:', error)
        setOrders([])
      }
    } catch (err) {
      console.error('[CartContext] Exception fetching orders:', err)
      setOrders([])
    } finally {
      setOrdersLoading(false)
      ordersFetchingRef.current = false
    }
  }, [user?.id, profile?.role])

  useEffect(() => {
    console.log('[CartContext] useEffect triggered:', { authLoading, user: !!user, profile: !!profile })
    
    // Only fetch orders when auth is done loading and user is authenticated
    if (!authLoading) {
      if (user) {
        fetchOrders()
      } else {
        setOrders([])
        setOrdersLoading(false)
      }
    }
  }, [user?.id, authLoading, fetchOrders])

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevItems, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const placeOrder = async (orderDetails) => {
    // Block if no user
    if (!user) {
      alert('Please log in to place an order')
      return null
    }

    try {
      const newOrder = {
        id: `OST-${Math.floor(100000 + Math.random() * 900000)}`,
        created_at: new Date().toISOString(),
        items: [...cartItems],
        total: cartTotal,
        status: 'Processing',
        user_id: user.id,
        ...orderDetails
      }

      console.log('[CartContext] Sending order to Supabase:', newOrder)

      // Insert order into Supabase
      const { data, error } = await supabase
        .from('orders')
        .insert([newOrder])
        .select()
        .single()

      console.log('[CartContext] Supabase response:', { data, error })

      if (!error && data) {
        setOrders((prev) => [data, ...prev])
        clearCart()
        return data
      } else if (error) {
        console.error('ORDER ERROR:', error)
        alert(`Error placing order: ${error.message}`)
        return null
      }

      return null
    } catch (err) {
      console.error('Error placing order:', err)
      alert(`Error placing order: ${err.message}`)
      return null
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    // Update in Supabase first
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (!error) {
      // Update local state
      setOrders((prev) => 
        prev.map((order) => 
          order.id === orderId ? { ...order, status } : order
        )
      )
    }
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  
  const cartSubtotal = cartItems.reduce((total, item) => {
    const priceValue = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('৳', '').replace(',', '')) 
      : item.price
    return total + (priceValue * item.quantity)
  }, 0)

  const cartTotal = cartSubtotal + DELIVERY_CHARGE

  const openCart = () => setCartOpen(true)
  const closeCart = () => setCartOpen(false)

  const value = {
    cartItems,
    orders,
    ordersLoading,
    fetchOrders,
    cartOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    placeOrder,
    updateOrderStatus,
    cartCount,
    cartSubtotal,
    cartTotal,
    deliveryCharge: DELIVERY_CHARGE
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
