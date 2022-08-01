import React from 'react'
import { Image, Stack, Button, useToast } from '@chakra-ui/react'
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearCart } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import { usePlaceOrderMutation } from '../services/eCommerce'

const Cart = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const cart = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()

  const [placeOrder] = usePlaceOrderMutation()

  const handleCheckout = async () => {
    try {
      const passCart = {
        orderItem: Object.values(cart).map(c => ({
          product: c._id,
          quantity: c.quantity,
        })),
      }

      await placeOrder(passCart).unwrap()

      dispatch(clearCart())
      navigate('/checkout')
    } catch (error) {
      toast({
        status: 'error',
        title: 'Error',
        description: 'Oh no, there was an error!',
        isClosable: true,
      })
    }

    navigate('/checkout')
  }

  // Object.values(cart).map(c => console.log(c.name))

  return (
    <>
      <div className='container products'>
        <h1 className='product-list-title'>Cart</h1>
      </div>

      <div className='table container'>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              Object.values(cart).map(c => (
                <tr key={c._id}>
                  <td>
                    <Image boxSize='80px' src={c.image} alt={c.name} />
                  </td>
                  <td>{c.name}</td>
                  <td>
                    <Stack
                      spacing={4}
                      direction='row'
                      justify={'center'}
                      align='center'
                    >
                      <Button
                        className='quantity'
                        onClick={() =>
                          dispatch(
                            addToCart({
                              ...c,
                              quantity: c.quantity - 1,
                            })
                          )
                        }
                      >
                        <FaMinus />
                      </Button>
                      <Button className='quantity'>{c.quantity}</Button>
                      <Button
                        className='quantity'
                        onClick={() =>
                          dispatch(
                            addToCart({
                              ...c,
                              quantity: c.quantity + 1,
                            })
                          )
                        }
                      >
                        <FaPlus />
                      </Button>
                    </Stack>
                  </td>
                  <td>{c.price.toFixed(2)}</td>
                  <td>{(c.price * c.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      className='quantity'
                      onClick={() =>
                        dispatch(
                          addToCart({
                            ...c,
                            quantity: 0,
                          })
                        )
                      }
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className='container cart-bottom'>
        <Button
          className='cart-bottom-button'
          colorScheme='teal'
          size='lg'
          onClick={() => navigate('/')}
        >
          Go Back to Shopping
        </Button>
        <Button
          className='cart-bottom-button'
          colorScheme='teal'
          size='lg'
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </>
  )
}

export default Cart
