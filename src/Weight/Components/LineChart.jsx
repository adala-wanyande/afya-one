// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { format, isValid, addMonths, addWeeks, addDays } from 'date-fns';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ weightData, selectedTimeRange }) => {
  const validWeightData = weightData.filter(entry => isValid(new Date(entry.date)));

  const filterDataByTimeRange = (data, range) => {
    const currentDate = new Date();
    switch (range) {
      case 'all':
        return data;
      case '6months':
        return data.filter(entry => addMonths(new Date(entry.date), 6) >= currentDate);
      case '3months':
        return data.filter(entry => addMonths(new Date(entry.date), 3) >= currentDate);
      case '1month':
        return data.filter(entry => addMonths(new Date(entry.date), 1) >= currentDate);
      case '1week':
        return data.filter(entry => addWeeks(new Date(entry.date), 1) >= currentDate);
      default:
        return data;
    }
  };

  const filteredWeightData = filterDataByTimeRange(validWeightData, selectedTimeRange);

  const data = {
    labels: filteredWeightData.map(entry => format(new Date(entry.date), 'MMM dd yy')).reverse(),
    datasets: [
      {
        data: filteredWeightData.map(entry => entry.weight).reverse(),
        backgroundColor: 'transparent',
        borderColor: '#f26c6d',
        pointRadius: 3,
        pointBackgroundColor: '#f26c6d',
        pointBorderColor: 'transparent',
        tension: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          stepSize: 0.5,
          callback: (value) => value + ' kg',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;