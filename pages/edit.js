import Head from 'next/head'
import { Box, TabList, Tabs, Tab, TabPanels, TabPanel, Flex, useColorMode, useColorModeValue, Link, IconButton, Stack, ButtonGroup} from '@chakra-ui/react'
import HeaderNav from '../components/HeaderNav'
import Footer from '../components/Footer'
import Team from '../components/Team'
import { MoonIcon, SpinnerIcon, ViewIcon } from '@chakra-ui/icons'

export default function Home() {
    const { colorMode, toggleColorMode } = useColorMode()
    const backgrounds = [
        `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
        `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
        `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
        `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
      ];
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
                            <IconButton
                                colorScheme='red'
                                aria-label='Search database'
                                size='sm'
                                isRound='true'
                                icon={<MoonIcon />}
                                onClick={toggleColorMode}
                            />
                            <Link href='/' passHref>
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