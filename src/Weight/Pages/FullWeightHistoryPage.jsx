import React from 'react'
import WeightEntryComponent from '../Components/WeightEntryComponent'
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

const FullWeightHistoryPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Button bg="#1AFFD5" onClick={onOpen}>See All</Button>
        <Drawer bg="#16172E" placement='bottom' isOpen={isOpen} onClose={onClose} size='xl'>
          <DrawerOverlay />
          <DrawerContent bg="#16172E">
            <DrawerCloseButton color="#FFFFFF"/>
            <DrawerHeader color='#FFFFFF' textAlign="center">Full Weight History</DrawerHeader>
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
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default FullWeightHistoryPage