import React from 'react'
import { Text, Card, Flex, Spacer, Box } from '@chakra-ui/react'
import { ArrowUpIcon } from '@chakra-ui/icons'

const WeightEntryComponent = () => {
  return (
    <Card p={4} m={4} bg='#202137'>
      <Flex alignItems='center' px={4}>
        <Box>
          <Text color='#FFFFFF'>Today</Text>
          <Text color='#19DEBC' rightIcon={<ArrowUpIcon />}>0.5 kg</Text>
        </Box>
        <Spacer/>
        <Text color='#FFFFFF' fontSize='xl' as='b'>73.5 kg</Text>
      </Flex>
    </Card>
    
  )
}

export default WeightEntryComponent