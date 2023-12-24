import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js'
import { getByDisplayValue } from '@testing-library/react'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const LineChart = () => {
    const data = {
        labels: ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6"],
        datasets: [{
            data: [72.5, 73.0, 73.0, 73.5, 74.0, 74.0],
            backgroundColor: 'transparent',
            borderColor: '#f26c6d',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension: 0.5 
        }]
    }
    const options ={
        plugins: {
            legend: false
        },
        scales: {
            x: {
                grid: {
                    display: false
                } 
            },
            y: {
                ticks: {
                    stepSize: 0.5,
                    callback: (value) => value + ' kg'
                },
                grid: {
                    display: false
                }
            }
        },
        elements: {
            point: {
            radius: 3, // Add small circles to data points
            },
        },
    }

  return (
    <div>
        <Line data={data} options={options}></Line>
    </div>
  )
}

export default LineChart