import React, { useEffect, useRef, useState } from 'react'
import { Terminal } from 'xterm'
// import { Box, Button, Text } from '@chakra-ui/react'
import 'xterm/css/xterm.css'
// import WebSocket from 'ws'

// import { FitAddon } from 'xterm-addon-fit'
// import { WebLinksAddon } from 'xterm-addon-web-links'
// const connection = new WebSocket('wss://echo.websocket.org')
export default function Xterm() {
  const xtermRef = useRef<Terminal>(null!)
  //   const [fitAddon] = useState(new FitAddon())
  //   const [ws, setWs] = useState<WebSocket | null>(null)
  //   const [count, setCount] = useState(0)
  const [socket] = useState(new WebSocket('wss://echo.websocket.org'))
  // const connection = new WebSocket('wss://echo.websocket.org')
  // const ws = useRef(connection)
  //  connection.onopen = () => {
  //     console.log('connected!')
  //      connection.send('サンプルデータ')
  //  }

  useEffect(() => {
    console.log('mount')
    socket.onopen = () => {
      console.log('connected')
      socket.send('sample')
    }
    return () => {
      console.log('unmount')
    }
  }, [socket])

  useEffect(() => {
    if (xtermRef == null) {
      //ws == null) {
      return
    }
    console.log('inicialize xterm')
    const initTerminal = async () => {
      const { Terminal } = await import('xterm')
      const { FitAddon } = await import('xterm-addon-fit')
      const { WebLinksAddon } = await import('xterm-addon-web-links')
      //   const { AttachAddon } = await import('xterm-addon-attach')
      const fitAddon = new FitAddon()
      //   const socket = new WebSocket('ws://{addr}:{port}/ws')
      console.log(socket)
      // setSocket(new WebSocket("wss://echo.websocket.org"))
      //   const attachAddon = new AttachAddon(socket)
      xtermRef.current = new Terminal({
        cursorBlink: true,
      })
      // socket 通信

      console.log(socket)
      if (socket != null) {
        // socket.send('sample')
        console.log('true')
        socket.onopen = () => {
          console.log('connected')
          socket.send('sample')
        }
      }
      //メッセージを受け取った場合
      socket.addEventListener('message', (response) => {
        console.log('accept message')
        xtermRef.current.write('$ ' + response.data + '\r\n')
        xtermRef.current.write('$ ')
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
            (((console.log(cmd), cmd),
            //your cmd logic
            cmd),
            // ws?.send(char)
            (socket.onopen = () => {
              console.log('use connect')
              socket.send(
                JSON.stringify({
                  message: cmd,
                }),
              )
            }))
          ) {
          }
          //   xtermRef.current.write(cmd)
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
      // xterm.then(console.log)
      // xtermRef.current.dispose()
      xterm.then((x) => x.current.dispose())
    }
  }, [socket])
  return (
    <div id="terminal" className="" />
    //your code
  )
}
