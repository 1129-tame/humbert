import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react'

export default function Card() {
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Branch
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Main
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              10日前
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              {/* $199 */}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}
