import React from 'react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="logo">Amapola Store</Link>
        <Link to="/category/medicamentos">Medicamentos</Link>
        <Link to="/category/accesorios">Accesorios</Link>
      </div>
      <div className="nav-right">
        <CartWidget />
      </div>
    </nav>
  )
}
