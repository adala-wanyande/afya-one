import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Avatar, WrapItem, Spacer } from '@chakra-ui/react';
import LineChart from '../Components/LineChart';
import FullWeightHistoryPage from '../Components/FullWeightHistory';
import Title from '../Components/Title';
import WeightEntryComponent from '../Components/WeightEntryComponent';
import NewWeightEntryPage from '../Components/NewWeightEntry';
import SetNewTargetWeightPage from '../Components/SetNewTargetWeight';
import WidgetPlaceholder from '../Components/WidgetPlaceholder';
import ProgressBar from '../Components/ProgressBar';
import MediumLoadingSpinner from '../Components/MediumLoadingSpinner';

const WeightDashboard = () => {
  const [allWeightEntries, setAllWeightEntries] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [isLoading, setIsLoading] = useState(true); // New state to track loading status
  const [height] = useState(180); // Set a default height value
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
        setIsLoading(false); // Set loading status to false only on success
      } else {
        console.error('Failed to fetch weight data');
      }
    } catch (error) {
      console.error('Error during data fetching:', error);
      setIsLoading(false); // Set loading status to false on error
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
    <div className='bg-[#16172E] flex flex-col lg:flex-row w-full'>
      <div className='flex flex-col w-full lg:w-1/2 lg:h-screen'>
        <div className='flex m-4 justify-between'>
          {/* User Icon and filter*/}
          <div>
            {/* User Icon */}
            <Avatar size='md' name='Adala Wanyande' src='https://bit.ly/code-beast' />
          </div>
          <div>
            {/* Filter */}
            <label for="underline_select" class="sr-only">Underline select</label>
            <select 
              alignItems="center"
              onChange={handleTimeRangeChange}
              value={selectedTimeRange}
              class="border rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 bg-[#16172E] border-[#f26c6d] placeholder-gray-400 text-[#f26c6d] focus:ring-blue-500 focus:border-blue-500">
                <option value="all"><Text>All records</Text></option>
                <option value="6months"><Text>Past 6 months</Text></option>
                <option value="3months"><Text>Past 3 months</Text></option>
                <option value="1month"><Text>Past month</Text></option>
                <option value="1week"><Text>Past week</Text></option>
            </select>
          </div>
        </div>
        <div className="m-4 flex justify-center">
          {/* Display the loading placeholder if weightData is empty */}
          {allWeightEntries.length === 0 && <WidgetPlaceholder />}
          {/* Display the LineChart if weightData is not empty */}
          {allWeightEntries.length > 0 && (
            <LineChart weightData={allWeightEntries} selectedTimeRange={selectedTimeRange} />
          )}
        </div>
        <div className='m-4 flex justify-between'>
          {/* Weight Display or Loading Spinner */}
          <div className='p-4'>
            {/* Starting Weight */}
            <Flex direction='column'>
              <Text textAlign='center' color='#8A8B96'>Starting Weight</Text>
              <div className='flex justify-center'>
                {targetWeight==null && <MediumLoadingSpinner />}
                {/* Display the progress bar if targetWeight is available */}
                {!isLoading && targetWeight !== null && (
                <Text fontSize='xl' textAlign='center' color='#8A8B96'>{startingWeight} kg</Text>
                )}
              </div>
            </Flex>
          </div>
          <div className='p-4'>
            {/* Current Weight */}
            <Flex flexDirection='column'>
              <Text textAlign='center' color='#FFFFFF'>Current Weight</Text>
              <div className='flex justify-center'>
                {targetWeight==null && <MediumLoadingSpinner />}
                {/* Display the progress bar if targetWeight is available */}
                {!isLoading && targetWeight !== null && (
                <Text as='b' fontSize='4xl' textAlign='center' color='#FFFFFF'>{allWeightEntries[0]?.weight} kg</Text>
                )}
              </div>         
            </Flex>
          </div>
          <div className='p-4'>
            {/* Target Weight */}
            <Flex flexDirection='column'>
                <Text textAlign='center' color='#8A8B96'>Target Weight</Text>
                <div className='flex justify-center'>
                  {targetWeight==null && <MediumLoadingSpinner />}
                  {/* Display the progress bar if targetWeight is available */}
                  {!isLoading && targetWeight !== null && (
                  <Text fontSize='xl' textAlign='center' color='#8A8B96'>{targetWeight} kg</Text>
                  )}
                </div>  
              </Flex>
          </div>
        </div>
        <div className='m-4'>
          <ProgressBar progress={calculateWeightProgressPercentage(startingWeight, targetWeight, allWeightEntries[0]?.weight)} />
        </div>
      </div>
      <div className='flex flex-col w-full lg:w-1/2 lg:h-screen'>
        <div>
          {/* BMI Calculator or Loading Spinner */}
          <div>
            {/* Title */}
            <Title m={4} title="BMI Calculator"></Title>
          </div>
          <div className='flex justify-center'>
          {/* Display the loading spinner while BMI is being calculated */}
          {targetWeight==null && <MediumLoadingSpinner />}
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
          </div>
        </div>
        <Box>
            <Flex alignItems='center' justifyContent='center'>
              <Title m={4} title="Weight History"></Title>
              <Spacer/>
              <FullWeightHistoryPage />
            </Flex>

            {/* Display the loading placeholder if weightData is empty */}
            {top3WeightEntries.length === 0 && 
              <Flex justify='center'>
                <MediumLoadingSpinner />
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

            <div className='flex flex-col lg:flex-row justify-center m-4'>
              <NewWeightEntryPage />
              <SetNewTargetWeightPage />
            </div>
          </Box>
      </div>
      </div>
  );
}

export default WeightDashboard;
