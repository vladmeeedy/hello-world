import React from 'react'
import ProductsContainer from '../../components/ProductsContainer'
import ItStarted from '../../components/ItStarted'
import MainVideo from '../../components/MainVideo'
import Advantages from '../../components/AdvantagesSection'

export default function HomePage() {
  return (
    <>
      <MainVideo />
      <Advantages />
      <ProductsContainer />
      <ItStarted />
    </>
  )
}
