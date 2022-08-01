import React from 'react'
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ProuductGridItem = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${product.image_link})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}
          >
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={product.image_link}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text
              color={'gray.500'}
              fontSize={'sm'}
              textTransform={'uppercase'}
            >
              {product.brand.title}
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {product.name}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xl'}>
                {product.priceInWord}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    </Link>
  )
}

export default ProuductGridItem
