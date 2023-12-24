import React from 'react'
import { Text, Card, CardBody } from '@chakra-ui/react'
import { ArrowUpIcon } from '@chakra-ui/icons'

const WeightEntryComponent = () => {
  return (
    <Card p={4}>
        <CardBody>
            <Text>Today</Text>
            <Text rightIcon={<ArrowUpIcon />}>0.5 kg</Text>
            <Text>73.5 kg</Text>
        </CardBody>
    </Card>
    
  )
}

export default WeightEntryComponent