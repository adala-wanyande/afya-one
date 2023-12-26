import React from 'react'
import WeightInput from '../Components/WeightInput'
import Calendar from '../Components/Calendar'
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const NewWeightEntryPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button bg='#1AFFD5' onClick={onOpen} rightIcon={<AddIcon />}>Add New Weight</Button>
      <Drawer bg="#16172E" placement='bottom' isOpen={isOpen} onClose={onClose} size='xl'>
        <DrawerOverlay />
        <DrawerContent bg="#16172E">
          <DrawerCloseButton color="#FFFFFF"/>
          <DrawerHeader color="#FFFFFF" textAlign="center">New Weight Entry</DrawerHeader>
          <DrawerBody color='#FFFFFF'>
            <form
              id='my-form'
              onSubmit={(e) => {
                e.preventDefault()
                console.log('submitted')
              }}
            >
              <Calendar/>
              <WeightInput/>
            </form>
          </DrawerBody>

          <Flex m={8} justifyContent='center'>
            <Button bg='#1AFFD5' type='submit' form='my-form'>
              Save
            </Button>
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default NewWeightEntryPage