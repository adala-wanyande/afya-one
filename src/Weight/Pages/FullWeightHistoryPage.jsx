import React from 'react'
import WeightEntryComponent from '../Components/WeightEntryComponent'
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

const FullWeightHistoryPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Button onClick={onOpen}>See All</Button>
        <Drawer placement='bottom' isOpen={isOpen} onClose={onClose} size='full'>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Full Weight History</DrawerHeader>
            <DrawerBody>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
                <WeightEntryComponent></WeightEntryComponent>
            </DrawerBody>
  
            <DrawerFooter>
              
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default FullWeightHistoryPage