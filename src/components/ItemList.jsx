import React from 'react'
import Item from './Item'

export default function ItemList({ products }) {
  return (
    <div className="item-list">
      {products.map(p => (
        <Item key={p.id} item={p} />
      ))}
    </div>
  )
}
