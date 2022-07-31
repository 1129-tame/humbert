import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'

export const useXterm = (
  targetIdName: string,
  enteredLogic?: (cmd: string) => void,
) => {
  const xtermRef = useRef<Terminal>(null!)

  useEffect(() => {
    if (xtermRef == null) {
      return
    }
    if (typeof enteredLogic === 'undefined') {
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
      xtermRef.current.open(
        document.getElementById(targetIdName) as HTMLElement,
      )
      fitAddon.fit()

      let cmd = ''

      xtermRef.current.onKey((key) => {
        const char = key.domEvent.key
        if (char === 'Enter' && cmd.length > 0) {
          enteredLogic(cmd)
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
  }, [enteredLogic, targetIdName])

  return [xtermRef.current?.write]
}
