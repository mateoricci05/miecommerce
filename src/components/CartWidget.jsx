import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartWidget() {
  const { totalUnits } = useCart()

  return (
    <Link to="/cart" className="cart-widget" style={{position:'relative'}}>
      <img src="/cart-icon.svg" alt="cart" style={{ width: 24 }} />
      <span className="cart-count">{totalUnits()}</span>
    </Link>
  )
}
