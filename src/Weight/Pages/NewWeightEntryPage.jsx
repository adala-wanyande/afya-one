import React, { useState } from 'react';
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const NewWeightEntryPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    date: '',
    weight: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/weights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: formData.date,
          weight: parseFloat(formData.weight),
        }),
      });

      if (response.ok) {
        // Handle success, e.g., close the drawer or show a success message
        onClose();
      } else {
        // Handle errors, e.g., show an error message
        console.error('Failed to submit the form');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <>
      <Button bg='#1AFFD5' onClick={onOpen} rightIcon={<AddIcon />}>
        Add New Weight
      </Button>
      <Drawer bg='#16172E' placement='bottom' isOpen={isOpen} onClose={onClose} size='xl'>
        <DrawerOverlay />
        <DrawerContent bg='#16172E'>
          <DrawerCloseButton color='#FFFFFF' />
          <DrawerHeader color='#FFFFFF' textAlign='center'>
            New Weight Entry
          </DrawerHeader>
          <DrawerBody color='#FFFFFF'>
            <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
              <div className='mb-5'>
                <input
                  id='date'
                  type='text'
                  value={formData.date}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Enter the date'
                  required
                />
              </div>
              <div className='mb-5'>
                <input
                  type='text'
                  id='weight'
                  value={formData.weight}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Enter your weight in kgs'
                  required
                />
              </div>
              <Flex m={8} justifyContent='center'>
                <Button bg='#1AFFD5' type='submit'>
                  Save
                </Button>
              </Flex>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NewWeightEntryPage;
