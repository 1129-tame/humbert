// import Xterm from '@/features/xterm'
import ConsoleDisplay from '@/parts/consoleDisplay'
// import ConsoleDisplay from '@/parts/consoleDisplay'
import Footer from '@/parts/footer'
import Header from '@/parts/header'
import { Box, Text } from '@chakra-ui/react'
import React, { ReactElement, Suspense } from 'react'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Box maxW="960px" mx="auto">
        <Suspense fallback={<Text color="whatsapp.100">Loading...</Text>}>
          {/* <Xterm /> */}
        </Suspense>
        <ConsoleDisplay />
      </Box>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}

export default Home
