import { Box } from '@chakra-ui/layout'
import React, { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

export const isBrowser = typeof window !== 'undefined'
// export const ws = isBrowser
//   ? new WebSocket('ws://localhost:8080/socket.io')
//   : null
export default function ConsoleDisplay() {
  const xtermRef = useRef<Terminal>(null!)

  useEffect(() => {
    if (xtermRef == null) {
      return
    }
    const initTerminal = async () => {
      const { Terminal } = await import('xterm')
      const { FitAddon } = await import('xterm-addon-fit')
      const { WebLinksAddon } = await import('xterm-addon-web-links')
      const fitAddon = new FitAddon()
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
      <Box id="terminal" className="" />
    </>
  )
}
