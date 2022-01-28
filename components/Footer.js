import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react'
import { FaGithub, FaSalesforce, FaSlack } from 'react-icons/fa'

const SocialButton = ({ children, label, href }) => {
	return (
		<chakra.button
			bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
			rounded={'full'}
			w={8}
			h={8}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
			}}>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	)
}

export default function Footer() {
    return (
		<Box
			bg={useColorModeValue('gray.50', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}
			minH={'10vh'}>
			<Container
				as={Stack}
				maxW={'100vw'}
                px={{ base: 4, md: 12 }}
				py={4}
				direction={{ base: 'column', md: 'row' }}
				spacing={4}
				justify={{ base: 'center', md: 'space-between' }}
				align={{ base: 'center', md: 'center' }}>
				<Text>© 2021 Salesforce Canada Solutions</Text>
				<Stack direction={'row'} spacing={6}>
					<SocialButton label={'Github'} href={'https://github.com/SalesforceCA'}>
						<FaGithub />
					</SocialButton>
					<SocialButton label={'Solution Central'} href={'https://solutionscentral.io/'}>
						<FaSalesforce />
					</SocialButton>
					<SocialButton label={'Instagram'} href={'https://salesforce-internal.slack.com/archives/C01JJMHRH9C'}>
						<FaSlack />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	)
}