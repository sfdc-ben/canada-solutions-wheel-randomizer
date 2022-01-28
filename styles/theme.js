import { extendTheme } from '@chakra-ui/react'

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }

const theme = extendTheme({
    fonts: {
        heading: 'Trailhead Bold',
        body: 'Salesforce Regular'
    },
    config
})

export default theme