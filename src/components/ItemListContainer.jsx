import React, { useEffect, useState } from 'react'
import ItemList from './ItemList'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useParams } from 'react-router-dom'

export default function ItemListContainer() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)
    async function fetchProducts() {
      try {
        const colRef = collection(db, 'products')
        let q = colRef
        if (categoryId) {
          q = query(colRef, where('category', '==', categoryId))
        }
        const snapshot = await getDocs(q)
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setProducts(items)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [categoryId])

  if (loading) return <p>Loading productos...</p>
  if (products.length === 0) return <p>No hay productos en esta categoría.</p>

  return <ItemList products={products} />
}
