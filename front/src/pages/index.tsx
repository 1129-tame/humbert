import Xterm from '@/features/xterm'
import { Box, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React, { Suspense } from 'react'

const Home: NextPage = () => {
  return (
    <>
      <Box boxShadow="xs" my={10} w="100%" h="150px" bg="tomato">
        <Text color="whatsapp.100" fontSize="4em" textAlign="center">
          humbert
        </Text>
        <Text color="green.200" fontSize="2em" textAlign="center">
          Terminal on browser
        </Text>
      </Box>
      <Box maxW="960px" mx="auto" h={150}>
        <Suspense fallback={<Text color="whatsapp.100">Loading...</Text>}>
          <Xterm />
        </Suspense>
      </Box>
    </>
  )
}

export default Home
