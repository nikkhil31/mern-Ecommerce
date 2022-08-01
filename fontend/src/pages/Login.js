import React from 'react'
import { Alert, AlertIcon, Button, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../services/eCommerce'
import { emailRegex } from '../utils/utils'
import { setCredentials } from '../slices/authSlice'
import InputField from '../components/InputField'
import { useLocalStorage } from '../hook/useLocalStorage'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const [, setToken] = useLocalStorage('token', '')
  const [, setUser] = useLocalStorage('user', '')

  const [login, { error, isLoading, isError }] = useLoginMutation()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = async data => {
    try {
      const user = await login(data).unwrap()
      const { access_token, ...rest } = user.data
      setToken(access_token)
      setUser(rest)
      dispatch(setCredentials({ user: rest, token: access_token }))
      navigate('/')
    } catch (error) {
      toast({
        status: 'error',
        title: 'Error',
        description: 'Oh no, there was an error!',
        isClosable: true,
      })
    }
  }

  // console.log({ data, error, isLoading, isSuccess, isError })

  return (
    <div className='container'>
      <div className='loginBox'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='alert-container'>
            {isError && (
              <Alert status='error'>
                <AlertIcon />
                {error.data.message}
              </Alert>
            )}
          </div>

          <InputField
            name='Email'
            register={register('email', {
              required: true,
              pattern: emailRegex,
            })}
            errors={errors}
          />

          <InputField
            name='Password'
            register={register('password', { required: true })}
            errors={errors}
          />
          <div className='form-field'>
            <Button
              type='submit'
              isLoading={isLoading}
              style={{ width: '315px', marginTop: '1rem' }}
              colorScheme='teal'
              size='lg'
            >
              Submit
            </Button>
          </div>
          <p style={{ marginTop: '1rem' }}>
            Don't have account! <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
