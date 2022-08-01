import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

const Checkout = () => {
  return (
    <Box textAlign='center' py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as='h2' size='xl' mt={6} mb={2}>
        Order has been Placed Succesfully!
      </Heading>
      <Text color={'gray.500'}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </Text>
    </Box>
  )
}

export default Checkout
