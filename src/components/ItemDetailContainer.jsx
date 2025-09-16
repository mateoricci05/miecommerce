import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import ItemDetail from './ItemDetail'

export default function ItemDetailContainer() {
  const { itemId } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    async function fetchItem() {
      const docRef = doc(db, 'products', itemId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) setItem({ id: docSnap.id, ...docSnap.data() })
      setLoading(false)
    }
    fetchItem()
  }, [itemId])

  if (loading) return <p>Cargando producto...</p>
  if (!item) return <p>Producto no encontrado.</p>

  return <ItemDetail item={item} />
}
