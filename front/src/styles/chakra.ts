// import { mode } from '@chakra-ui/theme-tools'
// import { Dict } from '@chakra-ui/utils'
import { extendTheme } from '@chakra-ui/react'

export const styles = extendTheme({
  styles: {
    global: {
      body: {
        // fontFamily: 'body',
        // color: mode('gray.800', 'whiteAlpha.900')(props),
        // bg: 'gray.800',
        // lineHeight: 'base',
      },
      // '*::placeholder': {
      // color: mode('gray.400', 'whiteAlpha.400')(props),
      // },
      // '*, *::before, &::after': {
      // borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      // wordWrap: 'break-word',
      // },
    },
  },
})
