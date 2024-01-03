import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import { WorkoutsContextProvider } from './Workout/Context/WorkoutContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
