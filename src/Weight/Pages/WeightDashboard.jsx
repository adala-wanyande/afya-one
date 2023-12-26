import React from 'react'
import NewWeightEntryPage from './NewWeightEntryPage';
import SetNewTargetWeightPage from './SetNewTargetWeightPage';
import WeightEntryComponent from '../Components/WeightEntryComponent';
import LineChart from '../Components/LineChart';
import FullWeightHistoryPage from './FullWeightHistoryPage';
import Title from '../Components/Title';
import { Box, Text, Progress, Avatar, WrapItem, Flex, Spacer, Select } from '@chakra-ui/react';

const WeightDashboard = () => {
  function calculateWeightProgressPercentage(startingWeight, targetWeight, currentWeight) {
    // Ensure starting weight is not greater than target weight
    if (startingWeight > targetWeight) {
      throw new Error("Starting weight cannot be greater than target weight.");
    }
  
    // Calculate total weight loss needed
    const totalWeightToLose = startingWeight - targetWeight;
  
    // Calculate weight already lost
    const weightLost = startingWeight - currentWeight;
  
    // Calculate percentage of progress
    const progressPercentage = (weightLost / totalWeightToLose) * 100;
  
    // Return the percentage, rounded to two decimal places
    return Math.round(progressPercentage * 100) / 100;
  }
  
  return (
    <Flex bg="#16172E" h="$100vh">
      <Box w="50%" p={4} px={8}>
        <Box>
          <Flex p={8} alignItems="center">
            <WrapItem>
              <Avatar size='md' name='Christian Nwamba' src='https://bit.ly/code-beast' />{' '}
            </WrapItem>
            <Spacer />
            <Select
              bg='#16172E'
              borderColor='#f26c6d'
              color='#f26c6d'
              width={180}
              minWidth={100}
              alignItems="center"
            >
              <option>All records</option>
              <option>Past 6 months</option>
              <option>Past 3 months</option>
              <option>Past month</option>
              <option>Past week</option>
            </Select>
          </Flex>
        </Box> 
        <Box>
          <LineChart></LineChart>
        </Box>
        <Box mt={16} px={8}>
          <Flex>
            <Flex direction='column'>
              <Text color='#8A8B96'>Starting Weight</Text>
              <Text fontSize='xl' textAlign='center' color='#8A8B96'>72.5 kg</Text>
            </Flex>
            <Spacer/>
            <Flex flexDirection='column'>
              <Text color='#FFFFFF'>Current Weight</Text>
              <Text as='b' fontSize='4xl' textAlign='center' color='#FFFFFF'>73.5 kg</Text>
            </Flex>
            <Spacer/>
            <Flex flexDirection='column'>
              <Text color='#8A8B96'>Target Weight</Text>
              <Text fontSize='xl' textAlign='center' color='#8A8B96'>78.5 kg</Text>
            </Flex>
          </Flex>
          {/* Progression Bar */}
          <Box>
            <Box mt={8} px={8}>
                <Progress height='4px' bg='#8A8B96' colorScheme="green" value={calculateWeightProgressPercentage(72.5, 78.5, 74.5)} />
            </Box>
            <Box mt={4}>
              <Text fontSize='xl' textAlign='center' color='#f26c6d'>{calculateWeightProgressPercentage(72.5, 78.5, 74.5)}%</Text>
            </Box>
          </Box>
          
        </Box>
      </Box>
      <Box p={4} w='50%'>
        <Flex direction='column' justifyContent='center'>
          <Title title="BMI Calculator"></Title>
          <Text pl={16} fontSize='md' color='#8A8B96'>Your Current BMI: <Text as='b' fontSize='lg' color='#f26c6d'>23.14</Text></Text>
          <Text pl={16} fontSize='md' color='#8A8B96'>You are healthy!</Text>
        </Flex>
        <Box>
          <Flex alignItems='center' justifyContent='center' p={4}>
            <Title title="Weight History"></Title>
            <Spacer/>
            <FullWeightHistoryPage></FullWeightHistoryPage>
          </Flex>
          <WeightEntryComponent></WeightEntryComponent>
          <WeightEntryComponent></WeightEntryComponent>
          <WeightEntryComponent></WeightEntryComponent>
          <Flex mt={8} px={32}>
            <NewWeightEntryPage></NewWeightEntryPage>
            <Spacer/>
            <SetNewTargetWeightPage></SetNewTargetWeightPage>
          </Flex>
        </Box>
      </Box>
    </Flex>
    
  )
}

export default WeightDashboard