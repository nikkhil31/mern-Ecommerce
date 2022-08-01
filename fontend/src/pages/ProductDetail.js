import React from 'react'
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
} from '@chakra-ui/react'
import { MdLocalShipping } from 'react-icons/md'
import { useGetProductByIdQuery } from '../services/eCommerce'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth } from '../hook/useAuth'
import { addToCart } from '../slices/cartSlice'

const ProductDetail = () => {
  let { id } = useParams()
  const { user } = useAuth()
  let navigate = useNavigate()

  const dispatch = useDispatch()

  const { data, isLoading } = useGetProductByIdQuery(id)

  const handleAddToCart = product => {
    if (!user) {
      return navigate('/login')
    }

    const { _id, image_link: image, name, price } = product

    let cart = { _id, image, name, price, quantity: 1 }
    // console.log(cart)
    dispatch(addToCart(cart))
    navigate('/cart')
  }

  return (
    !isLoading && (
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={data.data.image_link}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {data.data.name}
              </Heading>
              <Text color={'gray.900'} fontWeight={300} fontSize={'2xl'}>
                {data.data.priceInWord}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={<StackDivider borderColor={'gray.200'} />}
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={'lg'}>{data.data.description}</Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={'yellow.500'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Features
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    {data.data.features.map(feature => (
                      <ListItem key={feature}>{feature}</ListItem>
                    ))}
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={'yellow.500'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Product Details
                </Text>

                <List spacing={2}>
                  {data.data.specification.map(spec => (
                    <ListItem key={spec.title}>
                      <Text as={'span'} fontWeight={'bold'}>
                        {spec.title}:
                      </Text>{' '}
                      {spec.value}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>

            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={'gray.900'}
              color={'white'}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
              onClick={() => handleAddToCart(data.data)}
            >
              Add to cart
            </Button>

            <Stack
              direction='row'
              alignItems='center'
              justifyContent={'center'}
            >
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    )
  )
}

export default ProductDetail
