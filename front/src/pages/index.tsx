import Xterm from '@/features/xterm'
import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'

const Home: NextPage = () => {
  return (
    <div>
      <Box w="100%" h="200px" bgGradient="linear(to-t, green.200, pink.500)" />
      <Box maxW="960px" mx="auto">
        <Xterm />
      </Box>
    </div>
    //your code
  )
}

export default Home
