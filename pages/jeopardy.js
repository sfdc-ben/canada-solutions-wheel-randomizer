import * as React from "react"
import Head from 'next/head'
import useSound from "use-sound"
import { Box, Button, Center, CircularProgress, CircularProgressLabel, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, HStack, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid, Stack, Switch, Text, Tooltip, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import Link from "next/link"
import HeaderNav from '../components/HeaderNav'
import Footer from '../components/Footer'
import { app, db } from "../firebase/firebase";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { AddIcon, CheckIcon, EditIcon, MinusIcon, QuestionIcon, SettingsIcon, SmallAddIcon } from "@chakra-ui/icons"

export default function Home() {

    async function getGames() {
        let games = []
        const querySnapshot =  await getDocs(collection(db, "jeopardy"))
        querySnapshot.forEach((doc) => {
            games.push({
                id: doc.id,
                ...doc.data()
            })
        })
        return games
    }

    const loadCategories = (game) => game.cards.map(card => card.category).filter((value, index, self) => self.indexOf(value) === index).sort()
    const loadSortedCards = (game) => game.cards.sort((a, b) => a.category < b.category ? -1 : 1).sort((a, b)=> a.amount < b.amount ? -1 : 1)

    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [games, setGames] = React.useState()
    const [score, setScore] = React.useState({
        team1: 0,
        team2: 0,
        team3: 0
    })
    const [finalWager, setFinalWager] = React.useState({
        team1: 0,
        team2: 0,
        team3: 0
    })
    const [threeTeams, setThreeTeams] = React.useState(true)
    const [names, setNames] = React.useState({
        team1: 'Team 1',
        team2: 'Team 2',
        team3: 'Team 3'
    })
    const [flip, setFlip] = React.useState('None')
    const [double, setDouble] = React.useState(false)
    const [answer, setToAnswer] = React.useState(false)
    const [timer, setTimer] = React.useState(0)
    const [finalTime, setFinalTime] = React.useState(20)
    const [activeCard, setActive] = React.useState({}) 
    const [activeGame, setActiveGame] = React.useState() 
    const [categories, setCategories] = React.useState()
    const [tiles, setTiles] = React.useState()
    
    const boardBG = useColorModeValue('gray.800', "gray.800")

    const gameSelect = (e) => {
        const newGame = games.find(game => {
            return game.id === e.target.value
        })
        setCategories(loadCategories(newGame))
        setTiles(loadSortedCards(newGame))
        setActiveGame(newGame)
    }

    const handleNameChange = (e) => {
        setNames({
            ...names,
            [e.currentTarget.dataset.id]: e.target.value
        })
    }

    const startTimer = (time) => {
        setTimer(time)
    }

    const addScore = (e) => {
        let team = e.currentTarget.dataset.id
        setScore({
            ...score,
            [team]: score[team] + (activeCard.double ? activeCard.amount * 2 : activeCard.amount)
        })
        resetBoard()
    }

    const subScore = (e) => {
        let team = e.currentTarget.dataset.id
        setScore({
            ...score,
            [team]: score[team] - (activeCard.double ? activeCard.amount * 2 : activeCard.amount)
        })
        resetBoard()
    }

    const addFinalWager = (e) => {
        let team = e.currentTarget.dataset.id
        setScore({
            ...score,
            [team]: score[team] +  Number(finalWager[team])
        })
    }

    const subFinalWager = (e) => {
        let team = e.currentTarget.dataset.id
        setScore({
            ...score,
            [team]: score[team] - Number(finalWager[team]) 
        })
    }

    const resetBoard = () => {
        let temp = tiles
        temp[activeCard.index].complete = true
        setTiles(temp)
        setToAnswer(!answer)
        setFlip('None')
    }

    const [play, { stop }] = useSound('/sounds/timesUp.mp3', { volume: 0.5});

    React.useEffect( async () => {
        if (games === undefined ) {
            const load = await getGames()
            setGames(load)
            setCategories(loadCategories(load[0]))
            setTiles(loadSortedCards(load[0]))
            setActiveGame(load[0])
        }
    }, [games])
    // React.useEffect(() => {
    //     setActiveGame(games[0])
    //     setCategories(loadCategories(games[0]))
    //     setTiles(loadSortedCards(games[0]))
    // }, [games])

    React.useEffect(() => {
        timer > 0 && setTimeout(() => setTimer(timer - 1), 1000)
        timer == 0 && play()
    }, [timer])

    return (
        <div>
            <Head>
                <title>Solutions Jeopardy!</title>
                <meta name="description" content="Canada Solutions Jeopardy Game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
				<HeaderNav></HeaderNav>

                {/* Jeopardy Game */}

				<Box position={'relative'} top={'70px'} height="100%">
                    <Box 
                        bgGradient={useColorModeValue("linear(to-r, blue.50,purple.50)", "linear(to-r, blue.800,purple.900)")}
                        px={12}
                        py={6}
                        minW={'800px'}
                        minH={'80vh'}>
                        
                        {activeGame && 
                        <div>
                            
                            {/* Standard Jeopardy */}

                            {flip == 'Standard' &&
                                <Box
                                bgColor={boardBG}
                                rounded={'xl'}
                                p={2}
                                h={'522px'}
                                transition={'0.4s'}
                                >
                                {double && <Box h={'100%'}>
                                    <Center
                                            bg='purple.700'
                                            rounded={'sm'}
                                            h={'100%'}
                                            onClick={() => {
                                                setDouble(!double)
                                                startTimer(5)
                                            }}
                                            >
                                            <Text
                                                color={'white'}
                                                textTransform={'uppercase'}
                                                fontWeight={'extrabold'}
                                                fontSize={'8xl'}
                                                textAlign={'center'}>Daily Double!!!
                                            </Text>
                                        </Center>
                                    </Box>
                                }
                                {double || <Box h={'100%'}>
                                    <Flex position={'absolute'} margin={'12px'}>
                                        <CircularProgress size='80px' value={20 * timer} color={timer > 2 ? 'yellow.400' : 'red.500'}>
                                            <CircularProgressLabel color='white'>{timer}</CircularProgressLabel>
                                        </CircularProgress>
                                    </Flex>
                                
                                    {answer || <Center
                                        bg={activeCard.double ? 'purple.700' : 'blue.700'}
                                        rounded={'sm'}
                                        h={'100%'}
                                        onClick={() => {
                                            setToAnswer(!answer)
                                        }}
                                        >
                                        <Text
                                            color={'white'}
                                            p={8}
                                            textTransform={'uppercase'}
                                            fontWeight={'extrabold'}
                                            fontSize={'6xl'}
                                            textAlign={'center'}>{activeCard.clue}
                                        </Text>
                                    </Center>}
                                    {answer && <Box h={'100%'} >
                                        <Center
                                        bg={activeCard.double ? 'purple.700' : 'blue.700'}
                                        rounded={'sm'}
                                        h={'100%'}
                                        // onClick={resetBoard}
                                        >
                                    
                                        <Text
                                            color={'white'}
                                            textTransform={'uppercase'}
                                            fontSize={'6xl'}
                                            fontWeight={'extrabold'}
                                            textAlign={'center'}>{activeCard.correct}
                                        </Text>
                                    </Center>
                                    <Flex justifyContent={'center'} bottom={'84px'} position={'relative'} m={4}>
                                            <HStack rounded={'xl'} p={4} bgColor={boardBG} color='white'>
                                                <Flex>
                                                    {names.team1}
                                                    <IconButton
                                                        ml={4}
                                                        data-id='team1'
                                                        colorScheme='green'
                                                        size='xs'
                                                        aria-label='Search database'
                                                        icon={<AddIcon />}
                                                        onClick={addScore}
                                                    />
                                                    <IconButton
                                                        ml={4}
                                                        data-id='team1'
                                                        colorScheme='red'
                                                        size='xs'
                                                        aria-label='Search database'
                                                        icon={<MinusIcon />}
                                                        onClick={subScore}
                                                    />
                                                </Flex>
                                                <Flex pl={24}>
                                                    {names.team2}
                                                    <IconButton
                                                        ml={4}
                                                        data-id='team2'
                                                        colorScheme='green'
                                                        size='xs'
                                                        aria-label='Search database'
                                                        icon={<AddIcon />}
                                                        onClick={addScore}
                                                    />
                                                    <IconButton
                                                        ml={4}
                                                        data-id='team2'
                                                        colorScheme='red'
                                                        size='xs'
                                                        aria-label='Search database'
                                                        icon={<MinusIcon />}
                                                        onClick={subScore}
                                                    />
                                                </Flex>
                                                { threeTeams && <Flex pl={24}>
                                                    {names.team3}
                                                    <IconButton
                                                        ml={4}
                                                        data-id='team3'
                                                        colorScheme='green'
                                                        size='xs'
                                                        aria-label='Search database'
                                                        icon={<AddIcon />}
                                                        onClick={addScore}

                                                    />
                                                    <IconButton
                                                        ml={4}
                                                        data-id='team3'
                                                        colorScheme='red'
                                                        size='xs'
                                                        aria-label='Search database'
                                                        icon={<MinusIcon />}
                                                        onClick={subScore}
                                                    />
                                                </Flex>}
                                            </HStack>
                                        </Flex>
                                        </Box>}
                                        </Box>
                                }
                                </Box>
                            }

                            {/* Game Board */}

                            {flip ==  'None' &&
                                <SimpleGrid
                                    bgColor={boardBG}
                                    rounded={'xl'}
                                    p={2}
                                    transition={'0.4s'}
                                    columns={6}
                                    spacing={1}>
                                    {categories.map(category => (
                                        <Center 
                                        key={category}
                                        rounded={'sm'}
                                        p={2}
                                        bg='blue.700'
                                        height='106px'
                                        transition={'0.4s'}
                                        >
                                        <Text
                                            color={'white'}
                                            fontSize={'xl'}
                                            textTransform={'uppercase'}
                                            fontWeight={'extrabold'}
                                            textAlign={'center'}>{category}
                                        </Text>
                                        </Center>
                                    ))}
                                    {tiles.map((tile, index) => (
                                        <Center 
                                        key={index}
                                        rounded={'sm'}
                                        p={2}
                                        bg='blue.700'
                                        height='76px'
                                        transition={'0.4s'}
                                        _hover={{
                                            background: "blue.600"
                                        }}
                                        onClick={() => {
                                            if(!tile.complete) {
                                                setActive({index, ...tile})
                                                if (tile.double) {
                                                    setDouble(!double)
                                                    setFlip('Standard')
                                                } else {
                                                    setFlip('Standard')
                                                    startTimer(5)
                                                }
                                                
                                            }
                                        }}
                                        >
                                        {tile.complete || <Text
                                            color={'yellow.400'}
                                            fontWeight={'bold'}
                                            fontSize={'3xl'}
                                            textAlign={'center'}>${tile.amount}
                                            </Text>
                                        }  
                                        {tile.complete && <Text
                                            color={'grey.600'}
                                            textAlign={'center'}>
                                            </Text>
                                        }   
                                        
                                        </Center>
                                    ))}
                                    
                                </SimpleGrid>
                            }

                            {/* Final Jeopardy */}

                            {flip == 'Final' && 
                                <Box h={'100%'}>
                                <Box
                                    bgColor={boardBG}
                                    rounded={'xl'}
                                    p={2}
                                    h={'522px'}
                                    transition={'0.4s'}
                                    >
                                    <Flex position={'absolute'} margin={'12px'}>
                                        <CircularProgress size='80px' value={(100 / finalTime) * timer} color={timer > 3 ? 'yellow.400' : 'red.500'}>
                                            <CircularProgressLabel color='white'>{timer}</CircularProgressLabel>
                                        </CircularProgress>
                                    </Flex>
                                
                                    {answer || <Center
                                        bg={'green.600'}
                                        rounded={'sm'}
                                        h={'100%'}
                                        onClick={() => {
                                            setToAnswer(!answer)
                                        }}
                                        >
                                        <Text
                                            color={'white'}
                                            p={8}
                                            textTransform={'uppercase'}
                                            fontWeight={'extrabold'}
                                            fontSize={'6xl'}
                                            textAlign={'center'}>{activeGame.final.clue}
                                        </Text>
                                    </Center>}
                                    {answer && <Box h={'100%'} >
                                        <Center
                                        bg={'green.600'}
                                        rounded={'sm'}
                                        h={'100%'}
                                        // onClick={resetBoard}
                                        >
                                    
                                        <Text
                                            color={'white'}
                                            textTransform={'uppercase'}
                                            fontSize={'6xl'}
                                            fontWeight={'extrabold'}
                                            textAlign={'center'}>{activeGame.final.correct}
                                        </Text>
                                    </Center>
                                    <Flex justifyContent={'center'} bottom={'120px'} position={'relative'} m={4}>
                                            <HStack rounded={'xl'} p={4} bgColor={boardBG} color='white'>
                                                <Stack>
                                                    <Center>
                                                        {names.team1}
                                                    </Center>
                                                    <Flex>
                                                        Wager
                                                        <NumberInput
                                                            ml={4}
                                                            maxW={20}
                                                            color={'yellow.400'}
                                                            fontWeight={'bold'}
                                                            variant='unstyled'
                                                            value={finalWager.team1}
                                                            onChange={(e) => {
                                                                setFinalWager({
                                                                    ...finalWager,
                                                                    team1: e
                                                                })
                                                            }}
                                                        >
                                                            <NumberInputField/>
                                                        </NumberInput>
                                                        <IconButton
                                                        
                                                            data-id='team1'
                                                            colorScheme='green'
                                                            size='xs'
                                                            aria-label='Search database'
                                                            icon={<AddIcon />}
                                                            onClick={addFinalWager}
                                                        />
                                                        <IconButton
                                                            ml={4}
                                                            data-id='team1'
                                                            colorScheme='red'
                                                            size='xs'
                                                            aria-label='Search database'
                                                            icon={<MinusIcon />}
                                                            onClick={subFinalWager}
                                                        />
                                                    </Flex>
                                                </Stack>
                                                <Stack pl={24}>
                                                    <Center>
                                                        {names.team2}
                                                    </Center>
                                                    <Flex>
                                                        Wager
                                                        <NumberInput
                                                            ml={4}
                                                            maxW={20}
                                                            color={'yellow.400'}
                                                            fontWeight={'bold'}
                                                            variant='unstyled'
                                                            value={finalWager.team2}
                                                            onChange={(e) => {
                                                                setFinalWager({
                                                                    ...finalWager,
                                                                    team2: e
                                                                })
                                                            }}
                                                        >
                                                            <NumberInputField/>
                                                        </NumberInput>
                                                        <IconButton
                                                        
                                                            data-id='team2'
                                                            colorScheme='green'
                                                            size='xs'
                                                            aria-label='Search database'
                                                            icon={<AddIcon />}
                                                            onClick={addFinalWager}
                                                        />
                                                        <IconButton
                                                            ml={4}
                                                            data-id='team2'
                                                            colorScheme='red'
                                                            size='xs'
                                                            aria-label='Search database'
                                                            icon={<MinusIcon />}
                                                            onClick={subFinalWager}
                                                        />
                                                    </Flex>
                                                </Stack>
                                                { threeTeams && <Stack pl={24}>
                                                    <Center>
                                                        {names.team3}
                                                    </Center>
                                                    <Flex>
                                                        Wager
                                                        <NumberInput
                                                            ml={4}
                                                            maxW={20}
                                                            color={'yellow.400'}
                                                            fontWeight={'bold'}
                                                            variant='unstyled'
                                                            value={finalWager.team3}
                                                            onChange={(e) => {
                                                                setFinalWager({
                                                                    ...finalWager,
                                                                    team3: e
                                                                })
                                                            }}
                                                        >
                                                            <NumberInputField/>
                                                        </NumberInput>
                                                        <IconButton
                                                        
                                                            data-id='team3'
                                                            colorScheme='green'
                                                            size='xs'
                                                            aria-label='Search database'
                                                            icon={<AddIcon />}
                                                            onClick={addFinalWager}
                                                        />
                                                        <IconButton
                                                            ml={4}
                                                            data-id='team3'
                                                            colorScheme='red'
                                                            size='xs'
                                                            aria-label='Search database'
                                                            icon={<MinusIcon />}
                                                            onClick={subFinalWager}
                                                        />
                                                    </Flex>
                                                </Stack>}
                                            </HStack>
                                        </Flex>
                                        </Box>}
                                        </Box>
                                </Box>
                            }
                            
                            {/* Score Board */}

                            <Box
                                bgColor={boardBG}
                                rounded={'xl'}
                                mt={2}
                                p={2}
                                h={'64px'}
                                transition={'0.4s'}
                                >
                                <HStack justify={'stretch'}>
                                <Tooltip fontSize='xs' label="Select &amp; Edit Game" aria-label='A tooltip'>
                                <IconButton
                                    colorScheme='orange'
                                    aria-label='Edit'
                                    size='lg'
                                    icon={<SettingsIcon />}
                                    ref={btnRef}
                                    onClick={onOpen}
                                />
                                </Tooltip>
                                
                                <SimpleGrid
                                    w={'100%'}
                                    columns={threeTeams ? 3 : 2}
                                    spacing={1}>
                                        <Center 
                                        rounded={'sm'}
                                        p={2}
                                        bg='blue.700'
                                        transition={'0.4s'}>
                                            <Editable color={'gray.50'} fontWeight={'bold'} fontSize={'sm'} mr={4} value={names.team1}>
                                                <Tooltip fontSize='xs' label="Click To Change Team Name" aria-label='A tooltip'>
                                                <EditablePreview />
                                                </Tooltip>
                                                <EditableInput data-id='team1' onChange={handleNameChange}/>
                                            </Editable>
                                            <Text 
                                                color={'yellow.400'}
                                                fontWeight={'bold'}
                                                fontSize={'xl'}>{score.team1}
                                            </Text>
                                        </Center>
                                        <Center 
                                        rounded={'sm'}
                                        p={2}
                                        bg='blue.700'
                                        transition={'0.4s'}>
                                            <Editable color={'gray.50'} fontWeight={'bold'} fontSize={'sm'} mr={4} value={names.team2}>
                                                <Tooltip fontSize='xs' label="Click To Change Team Name" aria-label='A tooltip'>
                                                <EditablePreview />
                                                </Tooltip>
                                                <EditableInput data-id='team2' onChange={handleNameChange}/>
                                            </Editable>
                                            <Text 
                                                color={'yellow.400'}
                                                fontWeight={'bold'}
                                                fontSize={'xl'}>{score.team2}
                                            </Text>
                                        </Center>
                                        { threeTeams && <Center 
                                        rounded={'sm'}
                                        p={2}
                                        bg='blue.700'
                                        transition={'0.4s'}>
                                            <Editable color={'gray.50'} fontWeight={'bold'} fontSize={'sm'} mr={4} value={names.team3}>
                                                <Tooltip fontSize='xs' label="Click To Change Team Name" aria-label='A tooltip'>
                                                <EditablePreview />
                                                </Tooltip>
                                                <EditableInput data-id='team3' onChange={handleNameChange}/>
                                            </Editable>
                                            <Text 
                                                color={'yellow.400'}
                                                fontWeight={'bold'}
                                                fontSize={'xl'}>{score.team3}
                                            </Text>
                                        </Center>}
                                    </SimpleGrid>
                                    {flip == 'Final' &&
                                        <div>
                                            <Tooltip fontSize='xs' label="Final Jeopardy" aria-label='A tooltip'>
                                            <IconButton
                                                colorScheme='blue'
                                                aria-label='Edit'
                                                size='lg'
                                                icon={<CheckIcon />}
                                                onClick={() => {
                                                    setFlip('None')
                                                    setActiveGame({
                                                        ...activeGame,
                                                        final: {
                                                            ...activeGame.final,
                                                            complete: true
                                                        }
                                                    })
                                                }}
                                            />
                                            </Tooltip>
                                        </div>}
                                    {flip == 'Final' ||
                                        <div>
                                            <Tooltip fontSize='xs' label="Final Jeopardy" aria-label='A tooltip'>
                                            <IconButton
                                                isDisabled={activeGame.final.complete ? true : false}
                                                colorScheme='green'
                                                aria-label='Edit'
                                                size='lg'
                                                icon={<QuestionIcon />}
                                                onClick={() => {
                                                    setFlip('Final')
                                                    startTimer(finalTime)
                                                }}
                                            />
                                            </Tooltip>
                                        </div>}
                                </HStack> 
                                
                            </Box>

                            {/* Game Settings Drawer */}

                            <Drawer
                                isOpen={isOpen}
                                size={'sm'}
                                placement='left'
                                onClose={onClose}
                                finalFocusRef={btnRef}
                                >
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerCloseButton />
                                    <DrawerHeader pt={24}>Set Game Settings</DrawerHeader>
                                    <DrawerBody>
                                        <FormControl>
                                            <FormLabel htmlFor='game'>Select Game</FormLabel>
                                            <Flex>
                                                <Select value={activeGame.id} id='game' onChange={gameSelect}>
                                                    {games.map(game => (
                                                        <option key={game.id} value={game.id}>{game.name}</option>
                                                    ))}
                                                </Select>
                                                <Link href='/game-creation' passHref>
                                                    <IconButton
                                                        ml={2}
                                                        colorScheme='blue'
                                                        aria-label='Edit Games'
                                                        icon={<EditIcon />}
                                                    />
                                                </Link>
                                                
                                            </Flex>
                                            
                                            <FormLabel mt={4} htmlFor='team3'>Include Third Team</FormLabel>
                                            <Switch isChecked={threeTeams} id='team3' onChange={() => {
                                                setThreeTeams(!threeTeams)
                                            }}/>
                                            <FormLabel mt={4} htmlFor='finalTime'>Final Jeopardy Timer</FormLabel>
                                            <NumberInput size='sm' max={60} min={5} step={5} value={finalTime}
                                                onChange={(e) => {
                                                    setFinalTime(e)
                                                }}
                                                // value={finalTime}
                                            >
                                                <NumberInputField
                                                    // onChange={changeFinalTime}
                                                />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper
                                                        // onClick={() => {
                                                        // setFinalTime(finalTime + 5)
                                                        // }}
                                                    />
                                                    <NumberDecrementStepper
                                                        // onClick={() => {
                                                        // setFinalTime(finalTime - 5)
                                                        // }}
                                                    />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>
                                    
                                    </DrawerBody>
                                    <DrawerFooter>
                                        <Button variant='outline' mr={3} onClick={onClose}>
                                            Close
                                        </Button>
                                        <Button variant='outline' colorScheme='red' mr={3} onClick={() => {
                                            setActiveGame({
                                                ...activeGame,
                                                final: {
                                                    ...activeGame.final,
                                                    complete: false
                                                }
                                            })
                                        }}>
                                            Reset Final Jeopardy
                                        </Button>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        </div>}
                        

                    </Box>
                    <Footer></Footer>
				</Box>

                
            </main>
        </div>
    )
}
