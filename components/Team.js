import * as React from "react"
import { 
    Flex,
    Table, 
    Thead, 
    Tbody, 
    Tfoot,
    Tr, 
    Th, 
    Td, 
    chakra, 
    Image, 
    Button, 
    IconButton, 
    Input, 
    useToast, 
    Spinner, 
    Stack, 
    HStack, 
    Spacer, 
    Box, 
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalOverlay,
    ModalBody,
    ModalCloseButton, 
    useDisclosure, 
    FormControl,
    FormLabel,
    Switch, 
    Grid, 
    GridItem} from '@chakra-ui/react'
import { DeleteIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { collection, getDocs, query, where, doc, updateDoc, deleteDoc, setDoc, addDoc } from "firebase/firestore";
import styled from 'styled-components'
import { app, db } from "../firebase/firebase";

const Styles = styled.div`
    table {
        /* Make sure the inner table is always as wide as needed */
        width: 100%;

        td {
            
            /* But "collapsed" cells should be as small as possible */
            &.collapse {
                width: 0.0000000001%;
            }
        }
    }
    
`

const EditableCell = ({
    value: initialValue,
    row,
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
    setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        if (initialValue !== value) {
            updateMyData(row.original.id, row.index, id, value)
        }
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <Input isFullWidth value={value} onChange={onChange} onBlur={onBlur} />
}
  
  // Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
}

export default function DataTable({ team }) {
    const toast = useToast()
    const key = 'abc'
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [spinner, setSpinner] = React.useState(false)
    const [data, setData] = React.useState([])
    const [add, setAdd] = React.useState({
        name: '',
        role: '',
        team,
        leader: false,
        img: ''
    })
    const [skipPageReset, setSkipPageReset] = React.useState(false)

    const updateMyData = async (id, rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        console.log('update', id, rowIndex, columnId, value)
        setSkipPageReset(true)
        const ref = doc(db, "leaders", id)
        await updateDoc(ref, {
            [columnId]: value
          });
    }

    const getData = async () => {
        const teamQ = collection(db, "leaders")
        const q = query(teamQ, where("team", "==", team))
        const querySnapshot = await getDocs(q)
        let data = []
        console.log('DB Run', querySnapshot)
        querySnapshot.forEach((doc) => {
            let row = doc.data()
            row.id = doc.id
            data.push(row)
        })
        setData(data)
    }

    React.useEffect(() => {
        getData()
    }, [])

    React.useEffect(() => {
        setSkipPageReset(false)
    }, [data])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Title',
                accessor: 'role',
            },
            {
                Header: 'Team',
                accessor: 'team',
            },
            {
                Header: 'Leader',
                accessor: 'leader',
                Cell: tableProps => (
                    <Switch size ="lg" isChecked={tableProps.row.original.leader} onChange={() => {
                        updateMyData(tableProps.row.original.id, tableProps.row.index, 'leader', !tableProps.row.original.leader)
                        getData()
                    }}/>
                )

            },
            {
                Header: 'Image URL',
                accessor: 'img',
            },
            {  
                Header: 'Image',
                accessor: 'image',
                Cell: tableProps => (
                    <Image
                        rounded={'full'}
                        src={tableProps.row.original.img}
                        width={16}
                        alt='Image'
                    />
                )
            },
            {
                Header: () => null,
                id: 'delete',
                Cell: ({row}) => (
                    <IconButton
                        variant='ghost'
                        colorScheme='teal'
                        aria-label='Send email'
                        icon={<DeleteIcon />}
                        onClick={() => {
                            removeRow(row)
                        }}
                    />
                )
            }
        ],[]
    )
    
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data, defaultColumn, autoResetPage: !skipPageReset, updateMyData }, useSortBy)

    const removeRow = async (row) => {
        setSpinner(true)
        const id = row.original.id
        const ref = doc(db, "leaders", id)
        await deleteDoc(ref)
        await getData()
        setSpinner(false)
        toast({
            title: 'Team Member Removed',
            description: `${row.original.name} has been removed for this team.`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    }

    const  handleFormInputChange = (e) => {
        if (e.target.id === 'leader') {
            setAdd({
                ...add,
                leader: !add.leader
            })
        } else {
            setAdd({
                ...add,
                [e.target.id]: e.target.value
            })
        }
        console.log(add)
    }

    const resetForm = () => {
        setAdd({
            name: '',
            role: '',
            team,
            leader: false,
            img: ''
        })
        onClose()
    }

    const submitForm = async () => {
        setSpinner(true)
        const name = add.name
        const ref = collection(db, "leaders")
        const docRef = await addDoc(ref, {
            ...add
        })
        console.log("Document written with ID: ", docRef.id)
        await getData()
        setSpinner(false)
        resetForm()
        toast({
            title: 'Team Member Added',
            description: `${name} has been added to this team.`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    }   

    return (
        <>
            <Styles>
                <Table 
                    size={'sm'}
                    // backgroundColor={'white'}
                    width={'full'}
                    {...getTableProps()}>
                    <Thead>
                        {headerGroups.map((headerGroup) => (
                            <Tr key={key} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <Th key={key}
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        isNumeric={column.isNumeric}
                                    >
                                        {column.render('Header')}
                                        <chakra.span pl='4'>
                                            {column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <TriangleDownIcon aria-label='sorted descending' />
                                                ) : (
                                                    <TriangleUpIcon aria-label='sorted ascending' />
                                                )
                                            ) : null}
                                        </chakra.span>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row)
                            return (
                                <Tr key={key} {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <Td key={key} {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                                            {cell.render('Cell')}
                                        </Td>
                                    ))}
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
                <Flex alignItems={'center'} mt={4} px={4}>
                    <Button colorScheme='green' size='sm' onClick={onOpen}>Add Team Member</Button>
                    <Spacer />
                    {spinner && <Spinner/>}
                </Flex>
            </Styles>
            <Modal isCentered isOpen={isOpen} onClose={resetForm}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Team Member</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input value={add.name} id="name" placeholder='Alex Smith' onChange={handleFormInputChange}/>
                            <Grid mt={2} templateColumns='repeat(5, 1fr)' gap={6}>
                                <GridItem colSpan={4}>
                                    <FormLabel htmlFor="role">Title</FormLabel>
                                    <Input value={add.role} id="role" placeholder='Solution Engineer' onChange={handleFormInputChange}/>
                                </GridItem>
                                <GridItem colStart={5} colEnd={6}>
                                    <FormLabel htmlFor="leader">Leader</FormLabel>
                                    <Switch size='lg' isChecked={add.leader} id="leader" onChange={handleFormInputChange} />
                                </GridItem>
                            </Grid>
                            
                            <FormLabel mt={2} htmlFor="team">Team</FormLabel>
                            <Input value={add.team} id="team" placeholder='Enterprise' onChange={handleFormInputChange}/>
                            <FormLabel mt={2} htmlFor="img">Image URL</FormLabel>
                            <Input value={add.img} id="img" placeholder='http://www.example.com/img.jpg' onChange={handleFormInputChange}/>
                            
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        {spinner && <Spinner mr={6}/>}
                        <Button colorScheme='green' mr={3} onClick={submitForm}>
                        Save
                        </Button>
                        <Button variant='ghost' onClick={resetForm}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>                 
    )
}