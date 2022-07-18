import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
// import AppContext from "ink/build/components/AppContext"
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
// import Card from "../components/UI/Card";
// import UserInput from "../components/UserInput/UserInput";

const Chat: NextPage = () => {
  const router = useRouter()
  //   const context = useContext(AppContext)

  const onSubmit = (username: string, roomName: string) => {
    router.push({ pathname: `/chat/${roomName}`, query: { username } })
  }

  return (
    <>
      <Box>
        <h2>Chat App</h2>
      </Box>
      <Button onClick={() => onSubmit('f', '1')}></Button>
    </>
  )
}

export default Chat
