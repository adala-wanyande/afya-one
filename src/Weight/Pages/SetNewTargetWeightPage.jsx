import React from 'react'
import WeightInput from '../Components/WeightInput'
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const SetNewTargetWeightPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Button onClick={onOpen} rightIcon={<AddIcon />}>Set New Target Weight</Button>
        <Drawer placement='bottom' isOpen={isOpen} onClose={onClose} size='full'>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Set New Target</DrawerHeader>
            <DrawerBody>
              <form
                id='my-form'
                onSubmit={(e) => {
                  e.preventDefault()
                  console.log('submitted')
                }}
              >
                <WeightInput/>
              </form>
            </DrawerBody>
  
            <DrawerFooter>
              <Button type='submit' form='my-form'>
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default SetNewTargetWeightPage