import React from 'react'
import { Loadable } from '@/features/loadable'
import { Box } from '@chakra-ui/layout'

const DataLoader: React.VFC<{
  data: Loadable<string>
}> = ({ data }) => {
  const value = data.getOrThrow()
  return (
    <Box>
      <Box>Data is {value}</Box>
    </Box>
  )
}

export default DataLoader
