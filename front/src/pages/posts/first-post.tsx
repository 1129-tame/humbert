import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Heading } from '@chakra-ui/react'

import { XTerm } from 'xterm-for-react'
// import Btn from './_btn'

export default function FirstPost() {
  console.log('inicialize')
  //   const [term] = useState(new Terminal())
  const xtermRef = useRef(null)
  const inputElement = useRef(null)

  useEffect(() => {
    // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
    xtermRef.current.terminal.writeln('Hello, World!')
  }, [])

  return (
    <>
      <Heading color="red">Hello, Next.js with Chakra UI</Heading>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <XTerm ref={xtermRef} />
      <input ref={inputElement} type="text" />
      {console.log(inputElement.current)}
    </>
  )
}
