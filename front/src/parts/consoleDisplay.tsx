import { useWebSocket } from '@/features/useWebSocket'
import { useXterm } from '@/features/useXterm'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import 'xterm/css/xterm.css'

export const isBrowser = typeof window !== 'undefined'

export default function ConsoleDisplay() {
  const send = (cmd: string) => {
    // TODO: send 次の処理を追記
    // socketRef.current?.send(cmd))
    console.log(cmd)
  }
  const [terminalWrite] = useXterm('terminal', send)

  const onOpen = () => {
    console.log('open')
  }

  const onClose = () => {
    console.log('close')
  }

  const onMessage = (event: MessageEvent<any>) => {
    if (event.data === 'git branch\r\n\r\n') {
      return
    }

    if (!event.data.indexOf('  ')) {
      console.log('match')
      console.log(event.data)
      // const array = event.data.split('\x1B[m\x1B[m\r\n')
      // console.log(array)
      // setBranch(array)
    }

    if (!terminalWrite) {
      return
    }
    // if (!isBranched) {
    //   console.log(event)
    // }
    terminalWrite(event.data)
  }

  const [] = useWebSocket(
    'ws://localhost:8080/socket.io',
    'git branch\n',
    onOpen,
    onClose,
    onMessage,
  )

  return (
    <>
      <Box id="terminal" className="" />
    </>
  )
}
