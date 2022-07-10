import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
// import { FitAddon } from 'xterm-addon-fit'
// import { WebLinksAddon } from 'xterm-addon-web-links'

export default function Xterm() {
  const xtermRef = useRef<Terminal>(null!)
  //   const [fitAddon] = useState(new FitAddon())

  useEffect(() => {
    if (xtermRef == null) {
      return
    }
    console.log('inicialize xterm')
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
      xtermRef.current.write('\r\n' + shellprompt)

      let cmd = ''

      xtermRef.current.onKey((key) => {
        const char = key.domEvent.key
        if (char === 'Enter' && cmd.length > 0) {
          switch (
            (console.log(cmd), cmd)
            //your cmd logic
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
  }, [])
  return (
    <div id="terminal" className="" />
    //your code
  )
}
