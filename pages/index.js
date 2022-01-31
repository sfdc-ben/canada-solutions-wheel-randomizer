import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import Wheel from '../components/Wheel'
import HeaderNav from '../components/HeaderNav'
import Footer from '../components/Footer'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Canada Solutions</title>
                <meta name="description" content="Canada Solutions Summit Homepage" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
				<HeaderNav></HeaderNav>
				<Box position={'relative'} top={'10vh'} height="100%">
					<Wheel></Wheel>
					<Footer></Footer>
				</Box>
            </main>
        </div>
    )
}
