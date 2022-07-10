import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { styles } from '@/styles/chakra'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={styles}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
