// import { Terminal } from 'xterm'
import Link from 'next/link'

export default function FirstPost() {
  // const term = new Terminal()
  // term.open(document.getElementById('terminal') as HTMLElement)
  // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}
