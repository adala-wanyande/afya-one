import React from 'react';
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
} from '@chakra-ui/react';

const WeightInput = () => {
  return (
    <FormControl>
      <FormLabel>Weight (kg)</FormLabel>
      <NumberInput
        max={300}
        min={0}
        step={0.5} // Adjust the increment/decrement step
        defaultValue={75} // Set the initial value
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};

export default WeightInput;
