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

const SetNewTargetWeightPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    target: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/targets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target: parseFloat(formData.target),
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
      <Button m={4} bg='#1AFFD5' onClick={onOpen} rightIcon={<AddIcon />}>
        Set New Target Weight
      </Button>
      <Drawer placement='bottom' isOpen={isOpen} onClose={onClose} size='xl'>
        <DrawerOverlay />
        <DrawerContent bg='#16172E'>
          <DrawerCloseButton color='#FFFFFF' />
          <DrawerHeader color='#FFFFFF' textAlign='center'>
            Set New Target
          </DrawerHeader>
          <DrawerBody color='#FFFFFF'>
            <form
              className='max-w-sm mx-auto'
              id='my-form'
              onSubmit={handleSubmit}
            >
              <input
                type='text'
                id='target'
                value={formData.target}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Enter your target weight in kgs'
                required
              />
              <Flex m={8} justifyContent='center'>
                <Button bg='#1AFFD5' type='submit' form='my-form'>
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

export default SetNewTargetWeightPage;
