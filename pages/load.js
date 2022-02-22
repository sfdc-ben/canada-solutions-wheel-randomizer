import * as React from "react"
import Head from 'next/head'
import { Box, Button, Center, CircularProgress, CircularProgressLabel, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Editable, EditableInput, EditablePreview, Flex, FormControl, FormLabel, HStack, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid, Stack, Switch, Text, Tooltip, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import games from "../services/jeop"
import { app, db } from "../firebase/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export default function Home() {
    const gameRef = doc(db, "jeopardy", 'gFcOu9OtFBqslklmlAHD')

    const updateGame = async () => {
        await updateDoc(gameRef, {
            ...games[0]
        })
    }

    const addGame = async () => {
        await addDoc(collection(db, "jeopardy"), {
            ...games[1]
        })
    }

    return (
        <div>
            <Head>
                <title>Solutions Jeopardy!</title>
                <meta name="description" content="Canada Solutions Jeopardy Game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
            <Button m={12} colorScheme={'blue'} onClick={updateGame}>Load Data</Button>
            <Button m={12} colorScheme={'blue'} onClick={addGame}>Add Game 2</Button>
            </main>
        </div>
    )
}