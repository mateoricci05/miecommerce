import React, { useState } from 'react'
import ItemCount from './ItemCount'
import { useCart } from '../context/CartContext'

export default function ItemDetail({ item }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function onAdd(quantity) {
    addItem(item, quantity)
    setAdded(true)
  }

  return (
    <div className="item-detail">
      <img src={item.image || '/placeholder.png'} alt={item.title} style={{width:300, height:300, objectFit:'cover'}} />
      <div className="detail-right">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p>Precio: ${item.price}</p>
        <p>Stock: {item.stock}</p>
        {!added ? (
          <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
        ) : (
          <div>
            <p>Producto agregado al carrito.</p>
            <a href="/cart">Ir al carrito</a>
          </div>
        )}
      </div>
    </div>
  )
}
