import Xterm from '@/features/xterm'
import Header from '@/parts/header'
import { Box, Text } from '@chakra-ui/react'
import React, { ReactElement, Suspense } from 'react'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Box maxW="960px" mx="auto">
        <Suspense fallback={<Text color="whatsapp.100">Loading...</Text>}>
          <Xterm />
        </Suspense>
      </Box>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
    </>
  )
}

export default Home
