import React from 'react'
import { Grid } from '@chakra-ui/react'
import ProuductGridItem from '../components/ProuductGridItem'
import { useProductsQuery } from '../services/eCommerce'

const Home = () => {
  const { data, isLoading } = useProductsQuery()

  return (
    <div className='container products'>
      <h1 className='product-list-title'>Products List</h1>
      <div className='product-grid'>
        <Grid templateColumns='repeat(4, 1fr)' gap={30}>
          {!isLoading ? (
            data?.data &&
            data.data.map(product => (
              <ProuductGridItem product={product} key={product._id} />
            ))
          ) : (
            <h1>loading</h1>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default Home
