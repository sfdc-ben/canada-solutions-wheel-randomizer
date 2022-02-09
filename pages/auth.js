import Head from 'next/head'
import { launchSignIn } from '../firebase/firebase'
import HeaderNav from '../components/HeaderNav'
import Footer from '../components/Footer'
import { Box, Button, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FaGoogle } from 'react-icons/fa'

export default function SignIn() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <div>
            <Head>
                <title>Canada Solutions | Edit Team</title>
                <meta name="description" content="Edit Canada Solutions Team" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
				<HeaderNav></HeaderNav>
				<Box position={'relative'} top={'70px'} height="100%">
                    <Flex
                        bgGradient={useColorModeValue("linear(to-r, blue.50,purple.50)", "linear(to-r, blue.800,purple.900)")}
                        px={12}
                        pb={12}
                        pt={20}
                        minH={'80vh'}
                        minW={'790px'}
                        width={'full'}
                        justifyContent={'center'}
                        alignItems={'center'}>
                            <Button leftIcon={<FaGoogle/>} colorScheme='red' variant='solid' onClick={launchSignIn}>Login With Google</Button>
                    </Flex>
                    
					<Footer ></Footer>
				</Box>
            </main>
        </div>
    )
}