import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Avatar, WrapItem, Spacer } from '@chakra-ui/react';
import LineChart from '../Components/LineChart';
import FullWeightHistoryPage from './FullWeightHistoryPage';
import Title from '../Components/Title';
import WeightEntryComponent from '../Components/WeightEntryComponent';
import NewWeightEntryPage from './NewWeightEntryPage';
import SetNewTargetWeightPage from './SetNewTargetWeightPage';
import WidgetPlaceholder from '../Components/WidgetPlaceholder';
import ProgressBar from '../Components/ProgressBar';
import LoadingSpinner from '../Components/LoadingSpinner';
import MediumLoadingSpinner from '../Components/MediumLoadingSpinner';

const WeightDashboard = () => {
  const [allWeightEntries, setAllWeightEntries] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [isLoading, setIsLoading] = useState(true); // New state to track loading status
  const [height] = useState(170); // Set a default height value
  const [startingWeight] = useState(70)
  const [targetWeight, setTargetWeight] = useState(null);

  useEffect(() => {
    fetchAllWeightEntries();
    fetchTargetWeight();
  }, []);

  const fetchTargetWeight = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/targets');
      if (response.ok) {
        const data = await response.json();
        // Sort data in descending order based on the createdAt date
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Take the most recent target weight
        const latestTargetWeight = sortedData[0]?.target;
        setTargetWeight(latestTargetWeight);
      } else {
        console.error('Failed to fetch target weight data');
      }
    } catch (error) {
      console.error('Error during target weight fetching:', error);
    }
  };

  const calculateBMI = (weight, height) => {
    if (!weight || !height) {
      return 'N/A';
    }

    // Convert height from centimeters to meters
    const heightInMeters = height / 100;

    // Calculate BMI using the formula: BMI = weight (kg) / (height (m))^2
    const bmi = weight / Math.pow(heightInMeters, 2);

    // Round BMI to two decimal places
    return bmi.toFixed(2);
  };

  const fetchAllWeightEntries = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/weights');
      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAllWeightEntries(sortedData);
      } else {
        console.error('Failed to fetch weight data');
      }
    } catch (error) {
      console.error('Error during data fetching:', error);
    } finally {
      // Set loading status to false once data is fetched (success or error)
      setIsLoading(false);
    }
  };
  
  const [top3WeightEntries, setTop3WeightEntries] = useState([]);

  useEffect(() => {
    fetchTop3WeightEntries();
  }, []);

  const calculateWeightDifference = (index) => {
    if (index === top3WeightEntries.length - 1) {
      return 0; // No next entry for the last one
    }

    return top3WeightEntries[index].weight - top3WeightEntries[index + 1].weight;
  };

  const handleTimeRangeChange = (event) => {
    setSelectedTimeRange(event.target.value);
  };

  const getBMIColorAndMessage = (bmi) => {
    let color, message;
  
    if (bmi < 18.5) {
      color = '#f26c6d'; // Red color for Underweight
      message = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      color = '#42be65'; // Green color for Healthy Weight
      message = 'Healthy Weight';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      color = '#f5a623'; // Yellow color for Overweight
      message = 'Overweight';
    } else {
      color = '#f26c6d'; // Red color for Obesity
      message = 'Obesity';
    }
  
    return { color, message };
  };

  const fetchTop3WeightEntries = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/weights');
      if (response.ok) {
        const data = await response.json();
        // Sort data in descending order based on the date
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Take the top 3 entries
        const top3Data = sortedData.slice(0, 3);
        setTop3WeightEntries(top3Data);
      } else {
        console.error('Failed to fetch weight data');
      }
    } catch (error) {
      console.error('Error during data fetching:', error);
    }
  };

  function calculateWeightProgressPercentage(startingWeight, targetWeight, currentWeight) {
    // Ensure starting weight is not greater than target weight
    // if (startingWeight > targetWeight) {
    //   throw new Error("Starting weight cannot be greater than target weight.");
    // }
  
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
              <Avatar size='md' name='Christian Nwamba' src='https://bit.ly/code-beast' />
            </WrapItem>
            <Spacer/>
            <label for="underline_select" class="sr-only">Underline select</label>
            <select 
              alignItems="center"
              onChange={handleTimeRangeChange}
              value={selectedTimeRange}
              class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[180px] p-2.5 bg-[#16172E] border-[#f26c6d] placeholder-gray-400 text-[#f26c6d] focus:ring-blue-500 focus:border-blue-500">
                <option value="all">All records</option>
                <option value="6months">Past 6 months</option>
                <option value="3months">Past 3 months</option>
                <option value="1month">Past month</option>
                <option value="1week">Past week</option>
            </select>
          </Flex>
        </Box> 
        <Box>
            {/* Display the loading placeholder if weightData is empty */}
            {allWeightEntries.length === 0 && <WidgetPlaceholder />}
            {/* Display the LineChart if weightData is not empty */}
            {allWeightEntries.length > 0 && (
              <LineChart weightData={allWeightEntries} selectedTimeRange={selectedTimeRange} />
            )}
        </Box>
        <Box mt={16} px={8}>
          <Flex>
            <Flex direction='column'>
              <Text color='#8A8B96'>Starting Weight</Text>
              {isLoading && <MediumLoadingSpinner />}
              {/* Display the progress bar if targetWeight is available */}
              {!isLoading && targetWeight !== null && (
              <Text fontSize='xl' textAlign='center' color='#8A8B96'>{startingWeight} kg</Text>
              )}
            </Flex>
            <Spacer/>
            <Flex flexDirection='column'>
              <Text color='#FFFFFF'>Current Weight</Text>
              {isLoading && <MediumLoadingSpinner />}
              {/* Display the progress bar if targetWeight is available */}
              {!isLoading && targetWeight !== null && (
              <Text as='b' fontSize='4xl' textAlign='center' color='#FFFFFF'>{allWeightEntries[0]?.weight} kg</Text>
              )}
            </Flex>
            <Spacer/>
            <Flex flexDirection='column'>
              <Text color='#8A8B96'>Target Weight</Text>
              {isLoading && <MediumLoadingSpinner />}
              {/* Display the progress bar if targetWeight is available */}
              {!isLoading && targetWeight !== null && (
              <Text fontSize='xl' textAlign='center' color='#8A8B96'>{targetWeight} kg</Text>
              )}
            </Flex>
          </Flex>
          {/* Progression Bar */}
          <Box mt={8}>
            {/* Display the loading spinner while target weight is being fetched */}
              <ProgressBar progress={calculateWeightProgressPercentage(startingWeight, targetWeight, allWeightEntries[0]?.weight)} />
          </Box>
        </Box>
      </Box>
      <Box p={4} w='50%'>
        <Flex direction='column' justifyContent='center'>
        <Title title="BMI Calculator"></Title>
            {/* Display the loading spinner while BMI is being calculated */}
          {isLoading && <MediumLoadingSpinner />}
          {/* Display the BMI calculation if weightData is not empty and BMI is available */}
          {!isLoading && allWeightEntries.length > 0 && (
              <Text pl={16} fontSize='md' color={getBMIColorAndMessage(calculateBMI(allWeightEntries[0]?.weight, height)).color}>
                Your Current BMI:{' '}
                <Text as='b' fontSize='lg' color={getBMIColorAndMessage(calculateBMI(allWeightEntries[0]?.weight, height)).color}>
                  {calculateBMI(allWeightEntries[0]?.weight, height)}
                </Text>
                {' - '}
                {getBMIColorAndMessage(calculateBMI(allWeightEntries[0]?.weight, height)).message}
              </Text>
          )}
        </Flex>
        <Box>
          <Flex alignItems='center' justifyContent='center' p={2}>
            <Title title="Weight History"></Title>
            <Spacer/>
            <FullWeightHistoryPage />
          </Flex>

          {/* Display the loading placeholder if weightData is empty */}
          {top3WeightEntries.length === 0 && 
            <Flex justify='center'>
              <LoadingSpinner />
            </Flex> 
            }
            {/* Display the LineChart if weightData is not empty */}
            {top3WeightEntries.map((entry, index) => (
            <WeightEntryComponent
              key={entry._id}
              date={entry.date}
              weight={entry.weight}
              weightDifference={calculateWeightDifference(index)}
            />
          ))}

          <Flex mt={8} px={32}>
            <NewWeightEntryPage />
            <Spacer/>
            <SetNewTargetWeightPage />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default WeightDashboard;
