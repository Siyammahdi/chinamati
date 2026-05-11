import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders')
    return savedOrders ? JSON.parse(savedOrders) : []
  })

  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

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

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `OST-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      items: [...cartItems],
      total: cartSubtotal,
      status: 'Processing',
      ...orderDetails
    }
    setOrders((prev) => [newOrder, ...prev])
    clearCart()
    return newOrder
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) => 
      prev.map((order) => 
        order.id === orderId ? { ...order, status } : order
      )
    )
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  
  const cartSubtotal = cartItems.reduce((total, item) => {
    const priceValue = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('৳', '').replace(',', '')) 
      : item.price
    return total + (priceValue * item.quantity)
  }, 0)

  const openCart = () => setCartOpen(true)
  const closeCart = () => setCartOpen(false)

  const value = {
    cartItems,
    orders,
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
    cartSubtotal
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
