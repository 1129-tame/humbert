import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
// import { GraphQLClient } from "graphql-request"

export default function Btn({ user = 'default' }) {
  console.log('btn_inicialize')
  const [btnName] = useState('btn')
  // const [data, setData] = useState()
  // const login = 'moonhighway'

  // const query = `
  //     query findRepos($login:String!) {
  //         user(login:$login) {
  //             login
  //             name
  //             location
  //             avatar_url: avatarUrl
  //             repositories(first:100) {
  //                 totalCount
  //                 nodes {
  //                     name
  //                 }
  //             }
  //         }
  //     }
  // `

  // useEffect(() => {
  //   client
  //   .request(query, { login: '1129-tame' })
  //   .then((results: any) => JSON.stringify(results, null, 2))
  //   .then(console.log)
  //   .catch(console.error)
  // }, [])

  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('Btn component がアンマウントしました')
      // setBtnName('btnName2')
    }
  }, [])

  // useEffect(() => {
  //     if (!login) return
  //     fetch(`https://api.github.com/users/${login}`)
  //       .then(responce => responce.json())
  //       .then(setData)
  //       .catch(console.error)
  // })

  // if (data)
  //     return <pre>{JSON.stringify(data, null, 2)}</pre>

  return (
    <>
      <Button colorScheme="blue">{user}</Button>
      <Button colorScheme="teal">{btnName}</Button>
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
    </>
  )
}
