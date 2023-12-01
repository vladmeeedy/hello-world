import React from 'react'
import ProductItem from '../../components/ProductItem'
import ProductsContainer from '../../components/ProductsContainer'
import { useParams } from 'react-router-dom'
export default function ProductPage() {
  const { productId } = useParams()
  return (
    <>
      <ProductItem props={productId} />
      <ProductsContainer id={productId} />
    </>
  )
}
