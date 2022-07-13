import React, { Suspense, useState } from 'react'
import { Loadable } from '@/features/loadable'
import DataLoader from '@/parts/dataLoader'
import { Box } from '@chakra-ui/layout'
import { fetchData1 } from '../api/fetchData'

export default function Suspence() {
  const [data1] = useState(() => new Loadable(fetchData1()))
  const [data2] = useState(() => new Loadable(fetchData1()))
  const [data3] = useState(() => new Loadable(fetchData1()))
  return (
    <Box bg="chocolate">
      <h1 className="text-2xl">React App!</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data1} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data2} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data3} />
      </Suspense>
    </Box>
  )
}
