import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useDisclosure,
	Image
} from '@chakra-ui/react'
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
} from '@chakra-ui/icons'
import NextLink from 'next/link'

const NAV_ITEMS = [
	{
		label: 'Canada Solutions Summit FY23',
		// href: '/',
	},
	// {
	// 	label: 'Inspiration',
	// 	children: [
	// 		{
	// 			label: 'Explore Design Work',
	// 			subLabel: 'Trending Design to inspire you',
	// 			href: '/content-page',
	// 		},
	// 		{
	// 			label: 'New & Noteworthy',
	// 			subLabel: 'Up-and-coming Designers',
	// 			href: '#',
	// 		},
	// 	],
	// },
	// {
	// 	label: 'Find Work',
	// 	children: [
	// 		{
	// 			label: 'Job Board',
	// 			subLabel: 'Find your dream design job',
	// 			href: '#',
	// 		},
	// 		{
	// 			label: 'Freelance Projects',
	// 			subLabel: 'An exclusive list for contract work',
	// 			href: '#',
	// 		},
	// 	],
	// },
	// {
	// 	label: 'Learn Design',
	// 	href: '#',
	// },
	// {
	// 	label: 'Hire Designers',
	// 	href: '#',
	// },
]

export default function HeaderNav() {
    const { isOpen, onToggle } = useDisclosure()

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'70px'}
				position={'fixed'}
				width={'100vw'}
				top={0}
				zIndex={'2000'}
				py={{ base: 2 }}
				px={{ base: 4, md: 12 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}
				justify={'center'}>
				<Flex
					flex={{ base: 1, md: 'auto' }}
					ml={{ base: -2 }}
					display={{ base: 'flex', md: 'none' }}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
					<Image width='64px' src='/Salesforce.com_logo.png' alt='Salesforce' />
					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					spacing={6}>
					<NextLink href='' passHref>
						<Button
							as={'a'}
							fontSize={'sm'}
							fontWeight={400}
							variant={'link'}
							href={'#'}
							// onClick={logoutRequest}
                            >
							February 18, 2022
						</Button>
					</NextLink>
					
				</Stack>
			</Flex>

			<Collapse  in={isOpen} animateOpacity style={{ zIndex: '1000' }}>
				<MobileNav />
			</Collapse>
		</Box>
	)
}

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200')
	const linkHoverColor = useColorModeValue('gray.800', 'white')
	const popoverContentBgColor = useColorModeValue('white', 'gray.800')

	return (
		<Stack alignItems={'center'} direction={'row'} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Link
								p={2}
								href={navItem.href ?? 'javascript:;'}
								fontSize={'lg'}
								fontWeight={900}
								color={linkColor}
								_hover={{
									textDecoration: 'none',
									color: linkHoverColor,
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={popoverContentBgColor}
								p={4}
								rounded={'xl'}
								minW={'sm'}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	)
}

const DesktopSubNav = ({ label, href, subLabel }) => {
	return (
		<Link
			href={href}
			role={'group'}
			display={'block'}
			p={2}
			rounded={'md'}
			_hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text
						transition={'all .3s ease'}
						_groupHover={{ color: 'blue.400' }}
						fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={'sm'}>{subLabel}</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}>
					<Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	)
}

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			position={'fixed'}
			top={'70px'}
			width={'100%'}
			zIndex={'1000'}
			display={{ md: 'none' }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	)
}

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure()

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? 'javascript:;'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse  in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}>
					{children &&
						children.map((child) => (
							<Link key={child.label} py={2} href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	)
}