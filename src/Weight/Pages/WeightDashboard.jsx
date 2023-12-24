import React from 'react'
import NewWeightEntryPage from './NewWeightEntryPage';
import SetNewTargetWeightPage from './SetNewTargetWeightPage';
import WeightEntryComponent from '../Components/WeightEntryComponent';
import LineChart from '../Components/LineChart';
import FullWeightHistoryPage from './FullWeightHistoryPage';
import Title from '../Components/Title';
import { Box, Text, Progress } from '@chakra-ui/react';


const WeightDashboard = () => {
  return (
    <Box>
        {/* User Icon */}
        {/* Filter Dropdown Menu for Weight Progression Graph */}
        {/* Weight Progression Graph */}
        <Box>
          <LineChart></LineChart>
        </Box>
        <Text>Starting Weight: 72.5 kg</Text>
        <Text>Current Weight: 73.5 kg</Text>
        <Text>Target Weight: 78.0kg</Text>

        {/* Progression Bar */}
        <Box p={16}>
            <Progress value={80} />
        </Box>

        <Title title="BMI Calculator"></Title>
        <Text>Your Current BMI: 23.14</Text>
        <Text>You are healthy</Text>

        <Title title="Weight History"></Title>
        <FullWeightHistoryPage></FullWeightHistoryPage>
        <WeightEntryComponent></WeightEntryComponent>
        <WeightEntryComponent></WeightEntryComponent>
        <WeightEntryComponent></WeightEntryComponent>
        <NewWeightEntryPage></NewWeightEntryPage>
        <SetNewTargetWeightPage></SetNewTargetWeightPage>
    </Box>
    
  )
}

export default WeightDashboard