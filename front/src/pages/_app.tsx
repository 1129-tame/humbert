import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { styles } from '@/styles/chakra'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ChakraProvider theme={styles}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}

export default MyApp
