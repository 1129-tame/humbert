import { Button } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import React, { useEffect, useRef, useState } from 'react'
import { Terminal } from 'xterm'
// import { Box, Button, Text } from '@chakra-ui/react'
import 'xterm/css/xterm.css'

export const isBrowser = typeof window !== 'undefined'
export const ws = isBrowser
  ? new WebSocket('ws://localhost:8080/socket.io')
  : null
export default function Xterm() {
  const xtermRef = useRef<Terminal>(null!)
  const [isConnected, setIsConnected] = useState(false)
  const [lastPong, setLastPong] = useState<string>('')

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
      xtermRef.current?.write(event.data + '\r\n$ ')
      console.log(event.data)
      return setLastPong(new Date().toISOString())
    }

    // setInterval(function () {
    //   ws.send('Hello, Server!')
    // }, 3000)

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
  const reconnect = () => {
    console.log(socketRef.current)
    console.log(ws)
    socketRef.current = ws
    console.log(socketRef.current)
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

      const shellprompt = '$ '
      xtermRef.current.write('\r\n' + shellprompt)

      let cmd = ''

      xtermRef.current.onKey((key) => {
        const char = key.domEvent.key
        if (char === 'Enter' && cmd.length > 0) {
          switch (
            (console.log(cmd),
            //your cmd logic
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
      // Add logic
      return xtermRef
    }
    const xterm = initTerminal()
    return () => {
      xterm.then((x) => x.current.dispose())
    }
  }, [])

  return (
    <>
      <Box boxShadow="xs" my={10} w="100%" h="50px" bg="indigo">
        <Text color="whatsapp.100" fontSize="1em" textAlign="center">
          Connected: {'' + isConnected}
        </Text>
        <Text color="green.200" fontSize="1em" textAlign="center">
          Last pong: {lastPong || '-'}
        </Text>
      </Box>
      <Button onClick={sendPing}>close</Button>
      <Button onClick={reconnect}>reconnect</Button>
      <div id="terminal" className="" />
    </>
    //your code
  )
}
