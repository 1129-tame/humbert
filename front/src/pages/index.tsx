import Xterm from '@/features/xterm'
import { Box, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'

const Home: NextPage = () => {
  return (
    <>
      <Box boxShadow="xs" my={10} w="100%" h="200px" bg="tomato">
        <Text color="whatsapp.100" fontSize="5em" textAlign="center">
          humbert
        </Text>
        <Text color="green.200" fontSize="2em" textAlign="center">
          Terminal on browser
        </Text>
      </Box>
      <Box maxW="960px" mx="auto">
        <Xterm />
      </Box>
    </>
  )
}

export default Home
