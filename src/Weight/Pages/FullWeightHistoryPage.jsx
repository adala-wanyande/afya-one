import React, { useEffect, useState } from 'react';
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import WeightEntryComponent from '../Components/WeightEntryComponent';

const FullWeightHistoryPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const calculateWeightDifference = (index) => {
    if (index === weightData.length - 1) {
      return 0; // No next entry for the last one
    }

    return weightData[index].weight - weightData[index + 1].weight;
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/weights');
      if (response.ok) {
        const data = await response.json();
        // Sort data in descending order based on the date
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setWeightData(sortedData);
      } else {
        console.error('Failed to fetch weight data');
      }
    } catch (error) {
      console.error('Error during data fetching:', error);
    }
  };

  return (
    <>
      <Button bg='#1AFFD5' onClick={onOpen}>
        See All
      </Button>
      <Drawer
        bg='#16172E'
        placement='bottom'
        isOpen={isOpen}
        onClose={() => {
          onClose();
          fetchData(); // Refetch data when the drawer is closed
        }}
        size='xl'
      >
        <DrawerOverlay />
        <DrawerContent bg='#16172E'>
          <DrawerCloseButton color='#FFFFFF' />
          <DrawerHeader color='#FFFFFF' textAlign='center'>
            Full Weight History
          </DrawerHeader>
          <DrawerBody>
            {weightData.map((entry, index) => (
              <WeightEntryComponent
                key={entry._id}
                date={entry.date}
                weight={entry.weight}
                weightDifference={calculateWeightDifference(index)}
              />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FullWeightHistoryPage;
