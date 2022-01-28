import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme'
import Fonts from '../styles/fonts'
import "@fontsource/road-rage"

function MyApp({ Component, pageProps }) {
  return (
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
  )
}

export default MyApp