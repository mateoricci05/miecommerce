import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, removeItem, clearCart, totalPrice } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0)
    return (
      <div>
        <p>Carrito vacío</p>
        <Link to="/">Volver al catálogo</Link>
      </div>
    )

  return (
    <div>
      <h2>Tu carrito</h2>
      <div>
        {cartItems.map(i => (
          <div key={i.id} className="cart-row" style={{display:'flex', gap:12, marginBottom:12}}>
            <img src={i.image || '/placeholder.png'} alt={i.title} style={{ width: 80 }} />
            <div>
              <h4>{i.title}</h4>
              <p>Cantidad: {i.quantity}</p>
              <p>Subtotal: ${i.quantity * i.price}</p>
              <button onClick={() => removeItem(i.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      <h3>Total: ${totalPrice()}</h3>
      <button onClick={() => navigate('/checkout')}>Ir a pagar</button>
      <button onClick={() => clearCart()}>Vaciar carrito</button>
    </div>
  )
}
