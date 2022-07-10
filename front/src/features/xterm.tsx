import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'

export default function Xterm() {
  const xtermRef = useRef<Terminal>(null!)

  useEffect(() => {
    if (xtermRef == null) {
      return
    }
    console.log('hogehoge')
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

      const shellprompt = '$ '
      xtermRef.current.prompt = () => {
        xtermRef.current.write('\r\n' + shellprompt)
      }
      //your greeting
      xtermRef.current.prompt()
      let cmd = ''

      xtermRef.current.onKey((key) => {
        const char = key.domEvent.key
        if (char === 'Enter' && cmd.length > 0) {
          switch (
            cmd
            //your cmd logic
          ) {
          }
          xtermRef.current.prompt()
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
      return xtermRef.current
    }
    const xterm = initTerminal()
    return async () => {
      console.log(xterm)
      ;(await xterm).reset()
    }
  }, [])
  return (
    <div id="terminal" className="" />
    //your code
  )
}
