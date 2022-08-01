import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Headers from './components/Headers'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Register from './pages/Register'
import Cart from './pages/Cart'
import PrivateOutlet from './components/PrivateOutlet'
import Checkout from './pages/Checkout'

const App = () => {
  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/product/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />

        <Route path='*' element={<PrivateOutlet />}>
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
