import React from 'react'
import { Link } from 'react-router-dom'

export default function Item({ item }) {
  return (
    <div className="item-card">
      <img src={item.image || '/placeholder.png'} alt={item.title} style={{width:'100%', height:150, objectFit:'cover'}} />
      <h3>{item.title}</h3>
      <p>${item.price}</p>
      <Link to={`/item/${item.id}`}>Ver detalle</Link>
    </div>
  )
}
