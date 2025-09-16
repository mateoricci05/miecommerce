import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  function addItem(item, quantity) {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: Math.min(i.quantity + quantity, i.stock) } : i
        )
      }
      return [...prev, { ...item, quantity }]
    })
  }

  function removeItem(id) {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  function clearCart() {
    setCartItems([])
  }

  function totalUnits() {
    return cartItems.reduce((s, i) => s + i.quantity, 0)
  }

  function totalPrice() {
    return cartItems.reduce((s, i) => s + i.quantity * i.price, 0)
  }

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, totalUnits, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}
