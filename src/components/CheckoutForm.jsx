import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useCart } from '../context/CartContext'

export default function CheckoutForm() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const [buyer, setBuyer] = useState({ name: '', phone: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const order = {
      buyer,
      items: cartItems.map(i => ({ id: i.id, title: i.title, price: i.price, quantity: i.quantity })),
      total: totalPrice(),
      createdAt: serverTimestamp(),
    }

    try {
      const colRef = collection(db, 'orders')
      const docRef = await addDoc(colRef, order)
      setOrderId(docRef.id)
      clearCart()
    } catch (err) {
      console.error(err)
      alert('Error creando la orden')
    } finally {
      setLoading(false)
    }
  }

  if (orderId)
    return (
      <div>
        <h2>Compra confirmada</h2>
        <p>Tu ID de orden es: <strong>{orderId}</strong></p>
        <p>Guarda este ID para consultas.</p>
      </div>
    )

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <input placeholder="Nombre" value={buyer.name} onChange={e => setBuyer({...buyer, name: e.target.value})} required />
      <input placeholder="Teléfono" value={buyer.phone} onChange={e => setBuyer({...buyer, phone: e.target.value})} required />
      <input placeholder="Email" type="email" value={buyer.email} onChange={e => setBuyer({...buyer, email: e.target.value})} required />
      <button type="submit" disabled={loading}>Confirmar compra</button>
    </form>
  )
}
