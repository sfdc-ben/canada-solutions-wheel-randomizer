import * as React from "react"
import Head from 'next/head'
import Link from "next/link"
import { Box, Header, Button, Center, CircularProgress, CircularProgressLabel, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, HStack, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid, Stack, Switch, Text, Tooltip, useColorMode, useColorModeValue, useDisclosure, useToast, Spacer, Heading, Input, Tabs, TabList, Tab, TabPanels, TabPanel, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react'
import { app, db } from "../firebase/firebase";
import { getDocs, collection, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import { CalendarIcon, WarningTwoIcon } from "@chakra-ui/icons";

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
    
    const toast = useToast()
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    const [games, setGames] = React.useState()
    const [selectedGame, setSelectedGame] = React.useState()
    const [cat1, setCat1] = React.useState([
            {
                amount: 200,
                category: '',
                clue: '',
                correct: '',
                double: false
            },
            {
                amount: 400,
                category: '',
                clue: '',
                correct: '',
                double: false
            },
            {
                amount: 600,
                category: '',
                clue: '',
                correct: '',
                double: false
            },
            {
                amount: 800,
                category: '',
                clue: '',
                correct: '',
                double: false
            },
            {
                amount: 1000,
                category: '',
                clue: '',
                correct: '',
                double: false
            },
    ])
    const [cat2, setCat2] = React.useState([
        {
            amount: 200,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 400,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 600,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 800,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 1000,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
    ])
    const [cat3, setCat3] = React.useState([
        {
            amount: 200,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 400,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 600,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 800,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 1000,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
    ])
    const [cat4, setCat4] = React.useState([
        {
            amount: 200,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 400,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 600,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 800,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 1000,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
    ])
    const [cat5, setCat5] = React.useState([
        {
            amount: 200,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 400,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 600,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 800,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 1000,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
    ])
    const [cat6, setCat6] = React.useState([
        {
            amount: 200,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 400,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 600,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 800,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 1000,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
    ])
    const [activeGame, setActiveGame] = React.useState({
        id: '',
        name: '',
        cards: [],
        final: {
            clue: '',
            correct: '',
            complete: false
        }
    })
    const [categories, setCategories] = React.useState({
        cat1: '',
        cat2: '',
        cat3: '',
        cat4: '',
        cat5: '',
        cat6: ''
    })

    React.useEffect( async () => {
        console.log('running')
        if (games === undefined ) {
            console.log('getting')
            const load = await getGames()
            setGames(load)
        }
    }, [games])

    const newGame = () => {
        setSelectedGame('')
        setActiveGame({
            id: '',
            name: '',
            cards: [],
            final: {
                clue: '',
                correct: '',
                complete: false
            }
        })
        setCategories({
            cat1: '',
            cat2: '',
            cat3: '',
            cat4: '',
            cat5: '',
            cat6: ''
        })
        setCat1([{
            amount: 200,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 400,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 600,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 800,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 1000,
            category: '',
            clue: '',
            correct: '',
            double: false
        }])
        setCat2([{
            amount: 200,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 400,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 600,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 800,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 1000,
            category: '',
            clue: '',
            correct: '',
            double: false
        }])
        setCat3([{
            amount: 200,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 400,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 600,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 800,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 1000,
            category: '',
            clue: '',
            correct: '',
            double: false
        }])
        setCat4([{
            amount: 200,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 400,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 600,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 800,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 1000,
            category: '',
            clue: '',
            correct: '',
            double: false
        }])
        setCat5([{
            amount: 200,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 400,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 600,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 800,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 1000,
            category: '',
            clue: '',
            correct: '',
            double: false
        }])
        setCat6([{
            amount: 200,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 400,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 600,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 800,
            category: '',
            clue: '',
            correct: '',
            double: false
        },
        {
            amount: 1000,
            category: '',
            clue: '',
            correct: '',
            double: false
        }])

    }

    const updateGame = async () => {
        const gameRef = doc(db, "jeopardy", activeGame.id)
        const output = activeGame
        delete output.id
        await updateDoc(gameRef, {
            ...output
        })
        const games = await getGames()
        setGames(games)
        toast({
            title: 'Game Updated',
            description: `${activeGame.name} has been updated.`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    }

    const addGame = async () => {
        const finalCards = [...cat1, ...cat2, ...cat3, ...cat4, ...cat5, ...cat6]
        const game = {
            ...activeGame,
            cards: finalCards
        }
        delete game.id
        const docRef = await addDoc(collection(db, "jeopardy"), {
            ...game
        })
        game.id = docRef.id
        const games = await getGames()
        setGames(games)
        console.log(game)
        gameSelect(null, game)
        toast({
            title: 'Game Created',
            description: `${game.name} has been created.`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    }   

    const deleteGame = async () => {
        let name = activeGame.name
        await deleteDoc(doc(db, "jeopardy", activeGame.id));
        const games = await getGames()
        setGames(games)
        newGame()
        onClose()
        toast({
            title: 'Game Deleted',
            description: `${name} has been delete.`,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }

    const gameSelect = (e, game) => {
        console.log('game select')
        let newGame = {}
        if (game) {
            newGame = game
        } else {
            newGame = games.find(game => {
                return game.id === e.target.value
            })
        }
        setSelectedGame(newGame.id)
        setActiveGame(newGame)
        let uCat = newGame.cards.map(card => card.category).filter((value, index, self) => self.indexOf(value) === index)
        let catObj = categories
        let catKeys = Object.keys(categories)
        catKeys.forEach((cat, index) => {
            catObj[cat] = uCat[index]
        })
        setCategories(catObj)
        let uCards = newGame.cards.sort((a, b)=> a.amount < b.amount ? -1 : 1)

        // let cardsObj = cards
        let states = [ [cat1, setCat1], [cat2, setCat2], [cat3, setCat3], [cat4, setCat4], [cat5, setCat5], [cat6, setCat6] ]
        uCat.forEach((cat, index) => {
            
            let catRef = Object.keys(catObj).find(key => catObj[key] === cat)
            console.log(catRef)
            let catCards = uCards.filter(card => {
                return card.category === cat
            })
            console.log(catCards)
            states[index][1](catCards)
        })
        
    }

    const changeCat = (e) => {
        let cat = e.currentTarget.dataset.id
        let catCards = activeGame.cards.map(card => {
            if (card.category === categories[cat]) {
                card.category = e.target.value
                return card
            }
            return card
        })
        setActiveGame({
            ...activeGame,
            cards: catCards
        })
        setCategories({
            ...categories,
            [cat]: e.target.value
        })
    }

    const tabPanelRender = (cat, setCat, catName) => {
        const noCatName = categories[catName] === ''
        const hasCatName = !noCatName
        console.log(noCatName)
        return (
            <Stack>
                {cat.map(card => {
                    // console.log('rerender card', card)
                    return (
                        <HStack key={card.amount} spacing={4} alignItems={'center'}>
                            <Text
                                minW={'64px'}
                                color={'yellow.400'}
                                fontWeight={'bold'}
                                fontSize={'xl'}>
                                ${card.amount}
                            </Text>
                            <Tooltip fontSize='xs' label="Set Category Name"  isDisabled={hasCatName}>
                            <FormLabel mb={0} htmlFor='clue'>Clue</FormLabel>
                            </Tooltip>
                            <Input isInvalid={noCatName} errorBorderColor='grey.900' isDisabled={noCatName} value={card.clue} id={card.amount} onChange={(e) => {
                                let index = cat.findIndex(i => {
                                    return i.amount === card.amount
                                })
                                let newCards = [
                                    ...cat,
                                ]
                                newCards[index].clue = e.target.value
                                
                                newCards[index].category = categories[catName]
                                setCat(newCards)
                            }} />

                            <FormLabel minW={'114px'} mb={0} htmlFor='correct'>Correct Answer</FormLabel>
                            <Input isInvalid={noCatName} errorBorderColor='grey.900' isDisabled={noCatName} value={card.correct} id={card.amount} onChange={(e) => {
                                let index = cat.findIndex(i => {
                                    return i.amount === card.amount
                                })
                                let newCards = [
                                    ...cat,
                                ]
                                newCards[index].correct = e.target.value
                                newCards[index].category = categories[catName]
                                setCat(newCards)
                            }}/>
                            <FormLabel  minW={'96px'} mb={0} >Daily Double</FormLabel>
                            <Switch isDisabled={noCatName} isChecked={card.double} onChange={()=> {
                                let index = cat.findIndex(i => {
                                    return i.amount === card.amount
                                })
                                let newCards = [
                                    ...cat,
                                ]
                                newCards[index].double = !cat[index].double
                                newCards[index].category = categories[catName]
                                setCat(newCards)
                            }}/>
                        </HStack>
                    )
                }
                )}
            </Stack>
        )
    }
    
    return (
        <div>
            <Head>
                <title>Solutions Jeopardy!</title>
                <meta name="description" content="Canada Solutions Jeopardy Game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <HeaderNav></HeaderNav>
                <Box position={'relative'} top={'70px'} height="100%">
                    <Box 
                        bgGradient={useColorModeValue("linear(to-r, blue.50,purple.50)", "linear(to-r, blue.800,purple.900)")}
                        px={12}
                        py={6}
                        minH={'80vh'}>
                        <Box
                            minW={'790px'}
                            bgColor={useColorModeValue('white', "gray.800")}
                            rounded={'xl'}
                            p={4}
                            >
                            <Flex mb={4} pb={4} borderBottom='2px' borderBottomColor={useColorModeValue('gray.200','gray.700')} alignItems={'center'}>
                                <Text fontSize='lg' fontWeight={'bold'}>Jeopardy Game Editor</Text>
                                <Spacer/>
                                <HStack spacing={2}>
                                    <Link href='/jeopardy' passHref>
                                        <IconButton
                                            ml={2}
                                            colorScheme='blue'
                                            aria-label='Return To Game'
                                            icon={<CalendarIcon />}
                                        />
                                    </Link>
                                    <Spacer/>
                                    <Select value={selectedGame} w={72} placeholder='Select a game to edit' id='game' onChange={gameSelect}>
                                    {games && games.map(game => (
                                            <option key={game.id} value={game.id}>{game.name}</option>
                                        ))}
                                    </Select>
                                    <Spacer/>
                                    <Button colorScheme={'green'} onClick={newGame}>Create New Game</Button>
                                </HStack>
                            </Flex>
                            <FormControl>
                                <FormLabel htmlFor='name'>Game Name</FormLabel>
                                <Input value={activeGame.name} id='name' onChange={(e) => {
                                    setActiveGame({
                                        ...activeGame,
                                        name: e.target.value
                                    })
                                }}/>
                                <FormLabel mt={4} htmlFor='categories'>Categories</FormLabel>
                                <SimpleGrid columns={6} spacing={2}>
                                    <Input data-id='cat1' value={categories.cat1} onChange={changeCat} placeholder='Category 1 Name'/>
                                    <Input data-id='cat2' value={categories.cat2} onChange={changeCat} placeholder='Category 2 Name'/>
                                    <Input data-id='cat3' value={categories.cat3} onChange={changeCat} placeholder='Category 3 Name'/>
                                    <Input data-id='cat4' value={categories.cat4} onChange={changeCat} placeholder='Category 4 Name'/>
                                    <Input data-id='cat5' value={categories.cat5} onChange={changeCat} placeholder='Category 5 Name'/>
                                    <Input data-id='cat6' value={categories.cat6} onChange={changeCat} placeholder='Category 6 Name'/>
                                </SimpleGrid>
                                <FormLabel fontWeight={'bold'} mt={4} htmlFor='final'>Final Jeopardy</FormLabel>
                                <SimpleGrid columns={2} spacing={2}>
                                    <Stack>
                                        <FormLabel htmlFor='final'>Clue</FormLabel>
                                        <Input value={activeGame.final.clue} id='finalClue' onChange={(e) => {
                                            setActiveGame({
                                                ...activeGame,
                                                final: {
                                                    ...activeGame.final,
                                                    clue: e.target.value
                                                }
                                            })
                                        }}/>
                                    </Stack>
                                    <Stack>
                                        <FormLabel htmlFor='final'>Correct Answer</FormLabel>
                                        <Input value={activeGame.final.correct} id='finalCorrect' onChange={(e) => {
                                            setActiveGame({
                                                ...activeGame,
                                                final: {
                                                    ...activeGame.final,
                                                    correct: e.target.value
                                                }
                                            })
                                        }}/>
                                    </Stack>
                                </SimpleGrid>
                                <FormLabel fontWeight={'bold'} mt={4} htmlFor='final'>Game Questions</FormLabel>
                                <Tabs isLazy isFitted>
                                    <TabList>
                                        <Tab>{categories.cat1 || 'Category 1'}</Tab>
                                        <Tab>{categories.cat2 || 'Category 2'}</Tab>
                                        <Tab>{categories.cat3 || 'Category 3'}</Tab>
                                        <Tab>{categories.cat4 || 'Category 4'}</Tab>
                                        <Tab>{categories.cat5 || 'Category 5'}</Tab>
                                        <Tab>{categories.cat6 || 'Category 6'}</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            {tabPanelRender(cat1, setCat1, 'cat1')}
                                            {categories.cat1 === '' &&
                                                <Flex mt={4} alignItems={'center'}>
                                                    <WarningTwoIcon color={'red'}/>
                                                    <Text ml={2} fontSize={'xs'}>Set a Category Name To Continue</Text>
                                                </Flex>
                                            }
                                        </TabPanel>
                                        <TabPanel>
                                            {tabPanelRender(cat2, setCat2, 'cat2')}
                                            {categories.cat2 === '' &&
                                                <Flex mt={4} alignItems={'center'}>
                                                    <WarningTwoIcon color={'red'}/>
                                                    <Text ml={2} fontSize={'xs'}>Set a Category Name To Continue</Text>
                                                </Flex>
                                            }
                                        </TabPanel>
                                        <TabPanel>
                                            {tabPanelRender(cat3, setCat3, 'cat3')}
                                            {categories.cat3 === '' &&
                                                <Flex mt={4} alignItems={'center'}>
                                                    <WarningTwoIcon color={'red'}/>
                                                    <Text ml={2} fontSize={'xs'}>Set a Category Name To Continue</Text>
                                                </Flex>
                                            }
                                        </TabPanel>
                                        <TabPanel>
                                            {tabPanelRender(cat4, setCat4, 'cat4')}
                                            {categories.cat4 === '' &&
                                                <Flex mt={4} alignItems={'center'}>
                                                    <WarningTwoIcon color={'red'}/>
                                                    <Text ml={2} fontSize={'xs'}>Set a Category Name To Continue</Text>
                                                </Flex>
                                            }
                                        </TabPanel>
                                        <TabPanel>
                                            {tabPanelRender(cat5, setCat5, 'cat5')}
                                            {categories.cat5 === '' &&
                                                <Flex mt={4} alignItems={'center'}>
                                                    <WarningTwoIcon color={'red'}/>
                                                    <Text ml={2} fontSize={'xs'}>Set a Category Name To Continue</Text>
                                                </Flex>
                                            }
                                        </TabPanel>
                                        <TabPanel>
                                            {tabPanelRender(cat6, setCat6, 'cat6')}
                                            {categories.cat6 === '' &&
                                                <Flex mt={4} alignItems={'center'}>
                                                    <WarningTwoIcon color={'red'}/>
                                                    <Text ml={2} fontSize={'xs'}>Set a Category Name To Continue</Text>
                                                </Flex>
                                            }
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </FormControl>
                            <Flex pt={4} borderTop='2px' borderTopColor={useColorModeValue('gray.200','gray.700')} justifyContent={'flex-end'} alignItems={'center'}>
                            {activeGame.id === '' && 
                                <Button colorScheme={'blue'} onClick={addGame}>Create Game</Button>
                            }
                            {activeGame.id === '' || 
                                <Box>
                                    <Button colorScheme={'blue'} onClick={updateGame}>Update Game</Button>
                                    <Button ml={4} colorScheme={'red'} onClick={() => setIsOpen(true)}>Delete Game</Button>
                                </Box>
                            }
                            </Flex>
                        </Box>
                    </Box>
                    <Footer></Footer>
                </Box>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isCentered
                    >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Game
                            </AlertDialogHeader>

                            <AlertDialogBody>
                            Are you sure? You cannot undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                                </Button>
                                <Button colorScheme='red' onClick={deleteGame} ml={4}>
                                Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </main>
        </div>
    )
}