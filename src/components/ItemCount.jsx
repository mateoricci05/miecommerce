import React, { useState } from 'react'

export default function ItemCount({ stock, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial)

  function inc() {
    setCount(c => Math.min(c + 1, stock))
  }
  function dec() {
    setCount(c => Math.max(c - 1, 1))
  }

  return (
    <div className="item-count">
      <div className="controls">
        <button onClick={dec} disabled={count <= 1}>-</button>
        <span>{count}</span>
        <button onClick={inc} disabled={count >= stock}>+</button>
      </div>
      <button onClick={() => onAdd(count)} disabled={stock === 0}>
        Agregar al carrito
      </button>
      {stock === 0 && <p>Producto sin stock</p>}
    </div>
  )
}
