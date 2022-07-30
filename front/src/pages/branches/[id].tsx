import { Box } from '@chakra-ui/layout'
import React, { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import { useRouter } from 'next/router'
import Header from '@/parts/header'
import Footer from '@/parts/footer'

const Branches: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <Box maxW="960px" mx="auto">
        {id}
      </Box>
    </>
  )
}

Branches.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}

export default Branches
