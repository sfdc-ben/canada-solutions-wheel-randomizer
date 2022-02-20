import Head from 'next/head'
import { Box, TabList, Tabs, Tab, TabPanels, TabPanel, Flex, useColorMode, useColorModeValue, Link, IconButton, Stack, ButtonGroup} from '@chakra-ui/react'
import HeaderNav from '../components/HeaderNav'
import Footer from '../components/Footer'
import Team from '../components/Team'
import { MoonIcon, SpinnerIcon, ViewIcon } from '@chakra-ui/icons'

export default function Home() {
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
                    <Box 
                        bgGradient={useColorModeValue("linear(to-r, blue.50,purple.50)", "linear(to-r, blue.800,purple.900)")}
                        px={12}
                        pb={12}
                        pt={20}
                        minH={'80vh'}>
                        <ButtonGroup
                        position={'fixed'}
                        top={'13vh'}
                        right={['15px','45px']}
                        >
                        <Stack direction={['column', 'row']}>
                            {/* <IconButton
                                colorScheme='red'
                                aria-label='Search database'
                                size='sm'
                                isRound='true'
                                icon={<MoonIcon />}
                                onClick={toggleColorMode}
                            /> */}
                            <Link href='/wheel' passHref>
                                <IconButton
                                    colorScheme='green'
                                    aria-label='Search database'
                                    size='sm'
                                    isRound='true'
                                    icon={<SpinnerIcon />}
                                />
                            </Link>
                        </Stack>
                    </ButtonGroup>
                        <Tabs 
                            isLazy
                            minW={'790px'}
                            bgColor={useColorModeValue('white', "gray.800")}
                            rounded={'xl'}
                            p={2}>
                            <TabList>
                                <Tab>National</Tab>
                                <Tab>Small &amp; Medium Business</Tab>
                                <Tab>Commercial</Tab>
                                <Tab>Enterprise &amp; CMT</Tab>
                                <Tab>Retail &amp; Consumer Goods</Tab>
                                <Tab>Manufacturing</Tab>
                                <Tab>Architects &amp; Specialists</Tab>
                                <Tab>BVS</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Team team={'National'}></Team>
                                </TabPanel>
                                <TabPanel>
                                    <Team team={'Small & Medium Business'}></Team>
                                </TabPanel>
                                <TabPanel>
                                    <Team team={'Commercial'}></Team>
                                </TabPanel>
                                <TabPanel>
                                    <Team team={'Enterprise'}></Team>
                                </TabPanel>
                                <TabPanel>
                                    <Team team={'Retail & Consumer Goods'}></Team>
                                </TabPanel>
                                <TabPanel>
                                    <Team team={'Manufacturing'}></Team>
                                </TabPanel>
                                <TabPanel>
                                    <Team team={'Architects & Specialists'}></Team>
                                </TabPanel>
                                <TabPanel>
                                    <Team team={'BVS'}></Team>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        {/* <Team></Team> */}
                    </Box>
					<Footer ></Footer>
				</Box>
            </main>
        </div>
    )
}