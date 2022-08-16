import { useEffect, useRef } from 'react'

export const isBrowser = typeof window !== 'undefined'

export const useWebSocket = (
  targetUrl: string,
  socketInicializeCmd: string,
  socketOpenHandler: () => void,
  socketCloseHandler: () => void,
  socketMessageHandler: (event: MessageEvent<any>) => void,
) => {
  const ws = isBrowser ? new WebSocket(targetUrl) : null
  const socketRef = useRef(ws)

  useEffect(() => {
    if (socketRef.current == null) {
      return
    }
    console.log(socketRef.current)
    socketRef.current.onopen = function () {
      console.log('Connected')
      socketRef.current?.send(socketInicializeCmd)
      socketOpenHandler()
    }

    socketRef.current.onclose = function () {
      console.log('closed')
      socketCloseHandler()
    }

    socketRef.current.onmessage = function (event) {
      console.log('socketRef message')
      socketMessageHandler(event)
    }

    return () => {
      if (socketRef.current == null) {
        return
      }
      socketRef?.current?.close()
    }
  }, [
    socketCloseHandler,
    socketInicializeCmd,
    socketMessageHandler,
    socketOpenHandler,
  ])

  return [socketRef]
}
