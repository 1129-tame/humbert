// import { Terminal } from 'xterm'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Heading } from '@chakra-ui/react'
import Btn from './_btn'

export default function FirstPost() {
  console.log('inicialize')
  const [user, setUser] = useState('firstName')
  // const term = new Terminal()
  // term.open(document.getElementById('terminal') as HTMLElement)
  // term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('unmount')
      setUser('secondName')
    }
  }, [])

  return (
    <>
      {console.log(user)}
      <Heading color="red">Hello,{user} Next.js with Chakra UI</Heading>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <div>
        <Btn user={user}></Btn>
      </div>
    </>
  )
}
