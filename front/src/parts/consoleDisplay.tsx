import { useXterm } from '@/features/useXterm'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import 'xterm/css/xterm.css'

export const isBrowser = typeof window !== 'undefined'

export default function ConsoleDisplay() {
  const send = (cmd: string) => {
    console.log(cmd)
  }
  const [] = useXterm('terminal', send)

  return (
    <>
      <Box id="terminal" className="" />
    </>
  )
}
