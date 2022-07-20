import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/alert'
import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import React, { useEffect, useRef, useState } from 'react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

export const isBrowser = typeof window !== 'undefined'
export const ws = isBrowser
  ? new WebSocket('ws://localhost:8080/socket.io')
  : null
export default function Xterm() {
  const xtermRef = useRef<Terminal>(null!)
  const [isConnected, setIsConnected] = useState(false)

  const socketRef = useRef(ws)

  useEffect(() => {
    if (socketRef.current == null) {
      return
    }
    console.log(socketRef.current)
    socketRef.current.onopen = function () {
      setIsConnected(true)
      console.log('Connected')
    }

    socketRef.current.onclose = function () {
      console.log('closed')
      setIsConnected(false)
    }

    socketRef.current.onmessage = function (event) {
      xtermRef.current?.write(event.data)
      console.log(event.data)
    }

    return () => {
      if (socketRef.current == null) {
        return
      }
      socketRef.current.close()
    }
  }, [])

  const sendPing = () => {
    socketRef.current?.close()
  }

  // TODO: 再接続機能
  const reconnect = () => {
    console.log(ws)
    socketRef.current = ws
  }

  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('unmount')
    }
  }, [])

  useEffect(() => {
    if (xtermRef == null) {
      return
    }
    console.log('inicialize xterm')
    const initTerminal = async () => {
      const { Terminal } = await import('xterm')
      const { FitAddon } = await import('xterm-addon-fit')
      const { WebLinksAddon } = await import('xterm-addon-web-links')
      //   const { AttachAddon } = await import('xterm-addon-attach')
      const fitAddon = new FitAddon()
      //   const attachAddon = new AttachAddon(socket)
      xtermRef.current = new Terminal({
        cursorBlink: true,
      })
      xtermRef.current.loadAddon(fitAddon)
      xtermRef.current.loadAddon(new WebLinksAddon())
      xtermRef.current.open(document.getElementById('terminal') as HTMLElement)
      fitAddon.fit()

      let cmd = ''

      xtermRef.current.onKey((key) => {
        const char = key.domEvent.key
        if (char === 'Enter' && cmd.length > 0) {
          switch (
            (console.log(cmd),
            // send command
            socketRef.current?.send(cmd))
          ) {
          }
          xtermRef.current.write('\r\n')
          xtermRef.current.write('$ ')
          cmd = ''
        } else if (char === 'Backspace') {
          xtermRef.current.write('\b \b')
          cmd = cmd.slice(0, cmd.length - 1)
        } else {
          xtermRef.current.write(char)
          cmd += char
        }
      })
      return xtermRef
    }
    const xterm = initTerminal()
    return () => {
      xterm.then((x) => x.current.dispose())
    }
  }, [])

  return (
    <>
      {!isConnected && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>通信が切断されました</AlertTitle>
          <AlertDescription>リロードして再接続してください</AlertDescription>
        </Alert>
      )}
      {/* <Button onClick={reconnect}>reconnect</Button>
      <Button onClick={sendPing}>close</Button> */}
      <Box id="terminal" className="" />
      <Box
        display="flex"
        gap={6}
        alignItems="center"
        justifyContent="center"
        rounded="full"
        my={20}
        bg={'linkedin.800'}
        height={150}
      >
        <Button shadow="md" rounded="full" onClick={reconnect}>
          ブランチを切る
        </Button>
        <Button shadow="md" rounded="full" onClick={reconnect}>
          アド
        </Button>
        <Button shadow="md" rounded="full" onClick={sendPing}>
          コミット
        </Button>
        <Button shadow="md" rounded="full" onClick={sendPing}>
          プッシュ
        </Button>
      </Box>
    </>
    //your code
  )
}
