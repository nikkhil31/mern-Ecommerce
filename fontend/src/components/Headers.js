import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '../hook/useAuth'
import './style.css'

const Headers = () => {
  const auth = useAuth()

  const cart = useSelector(state => state.cart.cart)

  return (
    <header className='container header'>
      <h3 className='logo'>
        <Link to='/'>Logo</Link>
      </h3>
      <ul className='header-left'>
        {auth.user ? (
          <li>Hi, {auth.user.firstName}</li>
        ) : (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}

        <li>
          <Link to='/cart'>Cart {Object.values(cart).length}</Link>
        </li>
      </ul>
    </header>
  )
}

export default Headers
