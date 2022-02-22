import Head from 'next/head'
import Link from "next/link"
import { Box, Center, Heading, SimpleGrid, Stack, Image, Text, useColorMode, useColorModeValue, Avatar, Button, Container } from '@chakra-ui/react'
import Wheel from '../components/Wheel'
import HeaderNav from '../components/HeaderNav'
import Footer from '../components/Footer'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Canada Solutions Hub</title>
                <meta name="description" content="Canada Solutions Summit Homepage" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
				<HeaderNav></HeaderNav>
				<Box position={'relative'} top={'10vh'} height="100%">
                    <Container py={8} maxW={'7xl'}>
                    <Box my={0}>
                        <Heading
                            fontSize={"6xl"}
                            lineHeight={{ base: '1.4', md: '1.6' }}
                            textAlign={'center'}
                            bgGradient={useColorModeValue("linear(to-r, red.400,pink.400)", "linear(to-r, orange.300,red.400)")}
                            bgClip="text">Canada Solutions Hub
                        </Heading>
                    </Box>
                    <SimpleGrid minChildWidth='380px' columns={2} spacing={8}>
                        {/* <Link 
                        href='/wheel' passHref> */}
                        <Center
                        py={0}>
                            <Box
                                maxW={'445px'}
                                w={'full'}
                                bg={useColorModeValue('white', 'gray.900')}
                                boxShadow={'2xl'} 
                                rounded={'md'}
                                p={6}
                                overflow={'hidden'}>
                                <Stack>
                                    <Text
                                        color={'green.500'}
                                        textTransform={'uppercase'}
                                        fontWeight={800}
                                        fontSize={'sm'}
                                        letterSpacing={1.1}>
                                        Team Activity
                                    </Text>
                                    <Heading
                                        color={useColorModeValue('gray.700', 'white')}
                                        fontSize={'3xl'}
                                        // fontFamily={'body'}
                                        >
                                        Wheel of Gratitude
                                    </Heading>
                                </Stack>
                                <Box
                                    maxH={'210px'}
                                    bg={'gray.100'}
                                    mt={4}
                                    mx={-6}
                                    mb={4}
                                    pos={'relative'}>
                                    <Image
                                        src={
                                        '/images/wheel.png'
                                        }
                                        maxH={'210px'}
                                        width={'100%'}
                                        objectFit={'cover'}
                                        objectPosition={'top'}
                                        layout={'fill'}
                                    />
                                </Box>
                                <Stack spacing={4}>
                                    <Text color={'gray.500'}>
                                        Spin the wheel of gratitude, or customize it into a randomizer for other team activities and competitions.
                                    </Text>
                                    <Link href='/wheel' passHref>
                                    <Button colorScheme='green' size='xs'>Open</Button>
                                    </Link>
                                </Stack>
                            </Box>
                        </Center>
                        {/* </Link> */}
                        <Center py={0}>
                            <Box
                                maxW={'445px'}
                                w={'full'}
                                bg={useColorModeValue('white', 'gray.900')}
                                boxShadow={'2xl'}
                                rounded={'md'}
                                p={6}
                                overflow={'hidden'}>
                                <Stack>
                                    <Text
                                        color={'green.500'}
                                        textTransform={'uppercase'}
                                        fontWeight={800}
                                        fontSize={'sm'}
                                        letterSpacing={1.1}>
                                        Team Activity
                                    </Text>
                                    <Heading
                                        color={useColorModeValue('gray.700', 'white')}
                                        fontSize={'3xl'}
                                        // fontFamily={'body'}
                                        >
                                        Jeopardy
                                    </Heading>
                                </Stack>
                                <Box
                                    maxH={'210px'}
                                    bg={'gray.100'}
                                    mt={4}
                                    mx={-6}
                                    mb={4}
                                    pos={'relative'}>
                                    <Image
                                        src={
                                        '/images/jeopardy.png'
                                        }
                                        maxH={'210px'}
                                        width={'100%'}
                                        objectFit={'cover'}
                                        objectPosition={'top'}
                                        layout={'fill'}
                                    />
                                </Box>
                                <Stack spacing={4}>
                                    <Text color={'gray.500'}>
                                        Create and play games of Jeopardy with your team, complete with scoring, daily doubles, and final Jeopardy.
                                    </Text>
                                    <Link href='/jeopardy' passHref>
                                    <Button colorScheme='green' size='xs'>Open</Button>
                                    </Link>
                                </Stack>
                            </Box>
                        </Center>
                    </SimpleGrid>
                    </Container>
                    
					<Footer></Footer>
				</Box>
            </main>
        </div>
    )
}
