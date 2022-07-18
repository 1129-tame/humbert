import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

export const isBrowser = typeof window !== 'undefined'
export const ws = isBrowser
  ? new WebSocket('ws://localhost:8080/socket.io')
  : null
export default function WebSocketComponent() {
  const [isConnected, setIsConnected] = useState(false)
  const [lastPong, setLastPong] = useState<string>('')

  useEffect(() => {
    if (ws == null) {
      return
    }
    //   console.log(socket)
    ws.onopen = function () {
      setIsConnected(true)
      console.log('Connected')
    }

    ws.onclose = function () {
      console.log('closed')
      setIsConnected(false)
    }

    ws.onmessage = function (event) {
      console.log(event.data)
      return setLastPong(new Date().toISOString())
    }

    setInterval(function () {
      ws.send('Hello, Server!')
    }, 3000)

    return () => {
      if (ws == null) {
        return
      }
      ws.onclose = function () {
        console.log('closed')
      }
    }
  }, [])

  const sendPing = () => {
    console.log('ping')
    ws?.send('ping')
  }

  return (
    <Box bg="gold">
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <button onClick={sendPing}>Send ping</button>
      <Button onClick={() => sendPing()}></Button>
    </Box>
  )
}
