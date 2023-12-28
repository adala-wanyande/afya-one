import React from 'react';
import { Text, Card, Flex, Spacer, Box } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

const WeightEntryComponent = (props) => {
  const formatWeightDifference = () => {
    const weightDifference = props.weightDifference;

    if (weightDifference > 0) {
      return (
        <Text color='green' rightIcon={<ArrowUpIcon />}>
          + {Math.abs(weightDifference)} kg
        </Text>
      );
    } else if (weightDifference < 0) {
      return (
        <Text color='red' rightIcon={<ArrowUpIcon />}>
         - {Math.abs(weightDifference)} kg
        </Text>
      );
    } else {
      return <Text color='orange'>No change</Text>;
    }
  };

  const formattedDate = new Date(props.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
      <Card p={4} m={4} bg='#202137'>
        <Flex alignItems='center' px={4}>
          <Box>
            <Text color='#FFFFFF'>{formattedDate}</Text>
            {formatWeightDifference()}
          </Box>
          <Spacer />
          <Text color='#FFFFFF' fontSize='xl' as='b'>
            {props.weight} kg
          </Text>
        </Flex>
      </Card>
  );
};

export default WeightEntryComponent;
