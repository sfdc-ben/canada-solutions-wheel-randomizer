import * as React from "react";
import * as d3 from "d3";
import { 
    Box,
    Stack,
    Flex,
    Container,
    Heading,
    Icon,
    Avatar,
    Center,
    Text,
    IconButton,
    Button,
    ButtonGroup,
    Image,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerOverlay,
    DrawerHeader,
    DrawerContent,
    DrawerFooter,
    useColorModeValue,
    useDisclosure,
    useColorMode,
    useMediaQuery, 
    LinkOverlay,
    Grid,
    GridItem,
    FormLabel,
    Input} from "@chakra-ui/react";
import { ViewIcon, MoonIcon, EditIcon } from "@chakra-ui/icons";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link"
import styles from "../styles/Wheel.module.css"
import { app, db } from "../firebase/firebase";

const filtering = (array, filters) => {
    const data = array.filter(i => {
        if (i.team === 'National' && true === filters.national) return true
        if (i.team === 'Enterprise' && true === filters.enterprise) return true
        if (i.team === 'Architects & Specialists' && true === filters.specialists) return true
        if (i.team === 'Retail & Consumer Goods' && true === filters.rcg) return true
        if (i.team === 'Manufacturing' && true === filters.manufacturing) return true
        if (i.team === 'Small & Medium Business' && true === filters.smb) return true
        if (i.team === 'Commercial' && true === filters.commercial) return true
        if (i.team === 'BVS' && true === filters.bvs) return true
        return false
    })
    if (filters.show === 'all') return data
    else if (filters.show === 'leaders') {
        console.log('leader run', filters.show)
        const leaders = data.filter(i => {
            if (i.leader === true ) return true
        })
        return leaders
    }
    else if (filters.show === 'team') {
        console.log('team run', filters.show)
        const team = data.filter(i => {
            if (i.leader === undefined || i.leader === null || i.leader === false ) return true
        })
        return team
    }
}


let storedData = []

async function drawChart(svgRef, filters, phone) {
    
    var data = []
    if (storedData === undefined || storedData.length == 0 ) {
        const querySnapshot = await getDocs(collection(db, "leaders"))
        let temp = []
        console.log('DB Run', querySnapshot)
        querySnapshot.forEach((doc) => {
            temp.push(doc.data())
        })
        storedData = temp  
    }
    
    data = filtering(storedData, filters)

    d3.select("#piechart").remove()
    console.log('pre-chart', phone)
    const mobilePadding = phone === true ? 10 : 0
    const dim = phone === true ? 410 : 500
	var padding = {top:0, right: mobilePadding, bottom:0, left: mobilePadding},
		w = dim - padding.left - padding.right,
		h = dim - padding.top  - padding.bottom,
		r = Math.min(w, h)/2,
		rotation = 0,
		oldrotation = 0,
		picked = 100000,
		oldpick = [],
		color = d3.scale.category20c()

	var svg = d3.select(svgRef.current)
		.append("svg")
		.data([data])
        .attr("id", "piechart")
		.attr("width",  w + padding.left + padding.right)
		.attr("height", h + padding.top + padding.bottom);
		
	var container = svg.append("g")
		.attr("class", "chartholder")
		.attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

	var vis = container
		.append("g");
		
	var pie = d3.layout.pie().sort(null).value(function(d){return 1;});

	// declare an arc generator function
	var arc = d3.svg.arc().outerRadius(r);
	
	// select paths, use arc generator to draw
	var arcs = vis.selectAll("g.slice")
		.data(pie)
		.enter()
		.append("g")
		.attr("class", "slice");

	function rotTween(to) {
		var i = d3.interpolate(oldrotation % 360, rotation);
		return function(t) {
			return "rotate(" + i(t) + ")";
		};
	}

	function spin(d){
		container.on("click", null);
		//all slices have been seen, all done
		console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
		if(oldpick.length == data.length){
			console.log("done");
			container.on("click", null);
			return;
		}
		var  ps       = 360/data.length,
				pieslice = Math.round(1440/data.length),
				rng      = Math.floor((Math.random() * 1440) + 360);
			
		rotation = (Math.round(rng / ps) * ps);
		
		picked = Math.round(data.length - (rotation % 360)/ps);
		picked = picked >= data.length ? (picked % data.length) : picked;
		if(oldpick.indexOf(picked) !== -1){
			d3.select(this).call(spin);
			return;
		} else {
			oldpick.push(picked);
		}
		rotation += 90 - Math.round(ps/2);
		vis.transition()
			.duration(3000)
			.attrTween("transform", rotTween)
			.each("end", function(){
				//mark question as seen
				d3.select(".slice:nth-child(" + (picked + 1) + ") path")
					.attr("fill", "#FFF");
                console.log(picked)
				//populate question
				d3.select("#name p")
					.text(data[picked].name);
                d3.select("#role p")
					.text(data[picked].role);
                d3.select("#team p")
					.text(data[picked].team);
                d3.select("#headshot")
                    .attr("src", data[picked].img)
                d3.select("#highlight")
                    .attr("hidden", null)
                d3.select("#prespin")
                    .attr("hidden", true)
				oldrotation = rotation;
			
				/* Get the result value from object "data" */
				// console.log(data[picked].value)
			
				/* Comment the below line for restrict spin to sngle time */
				container.on("click", spin);
			});
	}
		
	arcs.append("path")
		.attr("fill", function(d, i){ 
            return color(i); 
        })
		.attr("d", function (d) { return arc(d); });

	// add the text
	arcs.append("text").attr("transform", function(d){
			d.innerRadius = 0;
			d.outerRadius = r;
			d.angle = (d.startAngle + d.endAngle)/2;
			return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -20) +",3 )";
		})
		.attr("text-anchor", "end")
		.style({"font-size": phone === true ? "xx-small" : "x-small" })
		.text( function(d, i) {
			return data[i].name;
		});

	container.on("click", spin);
	
	//make arrow
	svg.append("g")
		.attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
		.append("path")
		.attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
		.style({"fill":"black","stroke":"white","stroke-width":"2px"});

	//draw spin circle
	container.append("circle")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", 60)
		.style({"fill":"white","cursor":"pointer"});

	container.append("svg:image")
		.attr("x", -42)
		.attr("y", -28)
		.attr('height', 60)
		.attr("xlink:href", "/Salesforce.com_logo.png")
		
}

const Blob = (props) => {
	return (
		<Icon
			width={'100%'}
			viewBox="0 0 578 440"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
				fill="currentColor"
			/>
		</Icon>
	)
}

export default function Wheel() {
    const { colorMode, toggleColorMode } = useColorMode()
    const [filters, setFilters] = React.useState({
        national: true,
        smb: true,
        commercial: true,
        enterprise: true,
        rcg: true,
        manufacturing: true,
        specialists: true,
        bvs: true,
        show: 'all'
    })
    const [title, setTitle] = React.useState('')
    const [phone, setPhone] = React.useState(false)
    React.useEffect(() => {
        if (window.innerWidth < 520) {
            console.log(true, window.innerWidth)
            setPhone(true)
        }
        console.log(phone)
        if (window.localStorage.getItem('filters') !== null ) {
            console.log('setting filters')
            setFilters(JSON.parse(window.localStorage.getItem('filters')))
        }
    }, [phone])

    const saveFilters = () => {
        window.localStorage.setItem('filters', JSON.stringify(filters))
    }
    const resetFilters = () => {
        setFilters({
            national: true,
            smb: true,
            commercial: true,
            enterprise: true,
            rcg: true,
            manufacturing: true,
            specialists: true,
            bvs: true,
            show: 'all'
        })
        window.localStorage.removeItem('filters')
    }

    const handleNational = () => {
        setFilters({
            ...filters,
            national: !filters.national
        })
    }
    const handleSMB = () => {
        setFilters({
            ...filters,
            smb: !filters.smb
        })
    }
    const handleCommercial = () => {
        setFilters({
            ...filters,
            commercial: !filters.commercial
        })
    }
    const handleEnterprise = () => {
        setFilters({
            ...filters,
            enterprise: !filters.enterprise
        })
    }
    const handleRCG = () => {
        setFilters({
            ...filters,
            rcg: !filters.rcg
        })
    }
    const handleManufacturing = () => {
        setFilters({
            ...filters,
            manufacturing: !filters.manufacturing
        })
    }
    const handleSpecialists = () => {
        setFilters({
            ...filters,
            specialists: !filters.specialists
        })
    }

    const handleBVS = () => {
        setFilters({
            ...filters,
            bvs: !filters.bvs
        })
    }

    const handleCustomTitle = (e) => {
        setTitle(e.target.value)
    }

    const setValue = (e) => {
        console.log(e.target.value)
        setFilters({
            ...filters,
            show: e.target.value
        })
    }
 

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

	const svg = React.useRef(null);
	React.useEffect(() => {
		drawChart(svg, filters, phone);
	  }, [svg, filters, phone])

    return (
        <div>
            <main >
                <Flex
                    zIndex={100}
                    minH={'80vh'}
                    bgGradient={useColorModeValue("linear(to-r, blue.50,purple.50)", "linear(to-r, blue.800,purple.900)")}
                    >
                    {/* { !isSmallerThan520 && ( */}
                        <ButtonGroup
                        position={'fixed'}
                        top={'13vh'}
                        right={['15px','45px']}
                        >
                        <Stack direction={['column', 'row']}>
                            <IconButton
                                // position={'fixed'}
                                // top={'100px'}
                                // right={'45px'}
                                colorScheme='blue'
                                aria-label='Search database'
                                size='sm'
                                isRound='true'
                                icon={<ViewIcon />}
                                ref={btnRef}
                                onClick={onOpen}
                            />
                            {/* <IconButton
                                colorScheme='red'
                                aria-label='Search database'
                                size='sm'
                                isRound='true'
                                icon={<MoonIcon />}
                                onClick={toggleColorMode}
                            /> */}
                            { !phone && (
                                <Link href='/edit' passHref>
                                    <IconButton
                                        colorScheme='green'
                                        aria-label='Search database'
                                        size='sm'
                                        isRound='true'
                                        icon={<EditIcon />}
                                        href='/edit'
                                    />
                                </Link>
                            )}
                            
                        </Stack>
                        
                    </ButtonGroup>
                    {/* )} */}
                        
                    <Container
                        mb={'6'}
                        maxW={'7xl'}>
                        <Center>
                            <Box mt={'4'}>
                                <Heading
                                    fontSize={"6xl"}
                                    // fontSize={useColorModeValue("6xl","7xl")}
                                    // fontFamily={useColorModeValue("Trailhead Bold","Road Rage")}
                                    // letterSpacing={useColorModeValue("inherit","wider")}
                                    // lineHeight={useColorModeValue("1.6","1")}
                                    lineHeight={{ base: '1.4', md: '1.6' }}
                                    textAlign={'center'}
                                    bgGradient={useColorModeValue("linear(to-r, red.400,pink.400)", "linear(to-r, orange.300,red.400)")}
                                    bgClip="text">{useColorModeValue(title || "Wheel of Gratitude", title || "Wheel of Attitude")}
                                </Heading>
                                {/* {!title && <Heading
                                    fontSize={"6xl"}
                                    // fontSize={useColorModeValue("6xl","7xl")}
                                    // fontFamily={useColorModeValue("Trailhead Bold","Road Rage")}
                                    // letterSpacing={useColorModeValue("inherit","wider")}
                                    // lineHeight={useColorModeValue("1.6","1")}
                                    lineHeight={{ base: '1.4', md: '1.6' }}
                                    textAlign={'center'}
                                    bgGradient={useColorModeValue("linear(to-r, red.400,pink.400)", "linear(to-r, orange.300,red.400)")}
                                    bgClip="text">{useColorModeValue("Wheel of Gratitude", "Wheel of Attitude")}
                                </Heading>}
                                {title && <Heading
                                    fontSize={"6xl"}
                                    // fontSize={useColorModeValue("6xl","7xl")}
                                    // fontFamily={useColorModeValue("Trailhead Bold","Road Rage")}
                                    // letterSpacing={useColorModeValue("inherit","wider")}
                                    // lineHeight={useColorModeValue("1.6","1")}
                                    lineHeight={{ base: '1.4', md: '1.6' }}
                                    textAlign={'center'}
                                    bgGradient={useColorModeValue("linear(to-r, red.400,pink.400)", "linear(to-r, orange.300,red.400)")}
                                    bgClip="text">{title}
                                </Heading>} */}
                                
                            </Box>
                        </Center>
                        <Stack
                            align={'center'}
                            spacing={{ base: 8, md: 10 }}
                            py={{ base: 0, md: 0 }}
                            direction={{ base: 'column', md: 'row' }}
                        >
                            <Flex>
                                <div className={styles.chart} id="chart">
                                    <svg className="svg-canvas" width={phone === true ? 410 : 500} height={phone === true ? 410 : 500} ref={svg}/>
                                </div>
                            </Flex>
                            <Flex
                                id="prespin"
                                flex={1}
                                justify={'center'}
                                align={'center'}
                                position={'relative'}
                                w={'full'}>
                                <Heading
                                    fontSize={"5xl"}
                                    textAlign={'center'}
                                    fontWeight={500}>
                                    Click on the Wheel to Spin!
                                </Heading>
                            </Flex>
                            <Flex
                                id="highlight" hidden 
                                flex={1}
                                justify={'center'}
                                align={'center'}
                                position={'relative'}
                                w={'full'}>
                                <Blob
                                    w={'300%'}
                                    h={'85%'}
                                    position={'absolute'}
                                    left={0}
                                    zIndex={10}
                                    color={useColorModeValue('blue.200', 'orange.400')}
                                />
                                <Center zIndex={50} py={6}>
                                    <Box
                                        maxW={'300px'}
                                        w={'300px'}
                                        bg={useColorModeValue('white', 'gray.800')}
                                        boxShadow={'2xl'}
                                        rounded={'md'}
                                        overflow={'hidden'}>
                                        <Image
                                            alt="background"
                                            h={'120px'}
                                            w={'full'}
                                            src={
                                                '/dreampitch-og-002.jpeg'
                                            }
                                            objectFit={'cover'}
                                        />
                                        <Flex justify={'center'} mt={-16}>
                                            <Image
                                                id="headshot"
                                                alt="headshot"
                                                w={'120px'}
                                                border={'2px solid white'}
                                                borderRadius={'full'}
                                                // src
                                            />
                                        </Flex>

                                        <Box p={6}>
                                            <Stack spacing={0} align={'center'} mb={5}>
                                                <div id="name">
                                                    <Heading textAlign={'center'} fontSize={'3xl'} fontWeight={500}>
                                                        <p></p>
                                                    </Heading>
                                                </div>
                                                <div id="role">
                                                    <Text fontSize={'md'} color={'gray.500'} textAlign={'center'}>
                                                        <p></p>
                                                    </Text>
                                                </div>
                                                <div id="team">
                                                    <Text fontSize={'xs'} color={'gray.500'} textAlign={'center'}>
                                                        <p></p>
                                                    </Text>
                                                </div>
                                            </Stack>
                                        </Box>
                                    </Box>
                                </Center>
                            </Flex>
                            
                        </Stack>
                    </Container>
                </Flex>
            </main>
            <Drawer
                isOpen={isOpen}
                size={'md'}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader pt={24}>Select Teams To Include</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={[1, 5]} direction={['column', 'column']}>
                            <Checkbox value='national' isChecked={filters.national} onChange={handleNational}>National</Checkbox>
                            <Checkbox value='smb' isChecked={filters.smb} onChange={handleSMB}>Small &amp; Medium Business</Checkbox>
                            <Checkbox value='commercial' isChecked={filters.commercial} onChange={handleCommercial}>Commercial</Checkbox>
                            <Checkbox value='enterprise' isChecked={filters.enterprise} onChange={handleEnterprise}>Enterprise &amp; CMT</Checkbox>
                            <Checkbox value='rcg' isChecked={filters.rcg} onChange={handleRCG}>Retail &amp; Consumer Goods</Checkbox>
                            <Checkbox value='manufacturing' isChecked={filters.manufacturing} onChange={handleManufacturing}>Manufacturing</Checkbox>
                            <Checkbox value='specialists' isChecked={filters.specialists} onChange={handleSpecialists}>Architects &amp; Specialists</Checkbox>
                            <Checkbox value='bvs' isChecked={filters.bvs} onChange={handleBVS}>Business Value Services</Checkbox>
                            <RadioGroup defaultValue={filters.show}>
                                <Text>Include:</Text>
                                <Stack spacing={4} direction='row' value={filters.show} onChange={setValue} >
                                    <Radio value='all'>Everyone</Radio>
                                    <Radio value='leaders'>Only Leaders</Radio>
                                    <Radio value='team'>Only Team</Radio>
                                </Stack>
                            </RadioGroup>
                            { !phone && (
                            <Grid mt={2} alignItems={'end'} templateColumns='repeat(16, 1fr)' gap={6}>
                                <GridItem colSpan={[6, 5]}>
                                    <FormLabel htmlFor="title">Custom Title</FormLabel>
                                </GridItem>
                                <GridItem colStart={[7, 6]} colEnd={17}>
                                    <Input value={title} id="title" placeholder='Custom Title' onChange={handleCustomTitle}/>
                                </GridItem>
                            </Grid>
                            )}
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='outline' mr={3} colorScheme='green' onClick={saveFilters}>
                            Save Filters
                        </Button>
                        <Button variant='outline' colorScheme='red' onClick={resetFilters}>
                            Reset Filters
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}