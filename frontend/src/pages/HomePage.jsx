import React from 'react'
import Layout from '../components/layout/Layout'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import CategoryHome from '../components/CategoryHome'

const HomePage = () => {
  return (
    <Layout>
        <Hero/>
        <ProductList/>
        <CategoryHome/>
    </Layout>
  )
}

export default HomePage
