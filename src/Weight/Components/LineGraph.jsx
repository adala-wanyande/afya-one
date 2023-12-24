import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('all');
  const chartRef = useRef(null);

  useEffect(() => { 
        const updateChart = () => {
            const chartCanvas = chartRef.current;
        
            if (chartCanvas) {
            const myChart = new Chart(chartCanvas, {
                type: 'line',
                data: {
                labels: filteredData.map((entry) => new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })),
                datasets: [
                    {
                    label: 'Weight',
                    data: filteredData.map((entry) => entry.weight),
                    borderColor: 'rgba(62, 135, 246, 1)',
                    backgroundColor: 'rgba(62, 135, 246, 0.2)',
                    borderWidth: 1,
                    tension: 0.4,
                    fill: {
                        target: 'origin',
                        below: 'rgb(255, 0, 0)',
                        above: 'rgb(0, 0, 255)',
                    },
                    },
                    // Add additional datasets here if needed
                ],
                },
                options: {
                scales: {
                    x: {
                    ticks: {
                        autoSkip: false, // Prevent overlapping labels
                        rotation: 45, // Make labels easier to read
                    },
                    title: {
                        display: true,
                        text: 'Month',
                    },
                    },
                    y: {
                    title: {
                        display: true,
                        text: 'Weight',
                    },
                    },
                },
                gridLines: {
                    display: false, // Remove grid lines for cleaner look
                },
                backgroundColor: 'rgba(240, 240, 240, 1)', // Light gray background
                legend: {
                    display: false, // Hide legend unless needed
                },
                elements: {
                    point: {
                    radius: 3, // Add small circles to data points
                    },
                },
                defaultFontFamily: 'Arial', // Set font family for consistency
                },
            });
        
            return () => myChart.destroy(); // Clean up chart when component unmounts
            }
        };

    const testData = [
        { date: '01/01/2024', weight: 70 },
        { date: '02/01/2024', weight: 70.5 },
        { date: '03/01/2024', weight: 71 },
        { date: '04/01/2024', weight: 71.2 },
        { date: '05/01/2024', weight: 70.8 },
        // Add more entries as needed
    ];

    const filterData = () => {
        const filtered = data.filter((entry) => {
          const date = new Date(entry.date);
          const today = new Date();
          switch (filter) {
            case 'all':
              return true;
            case 'past6Months':
              return date > new Date(today.getFullYear(), today.getMonth() - 6);
            case 'past3Months':
              return date > new Date(today.getFullYear(), today.getMonth() - 3);
            case 'pastMonth':
              return date > new Date(today.getFullYear(), today.getMonth() - 1);
            case 'pastWeek':
              return date > new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            default:
              return true;
          }
        });
        setFilteredData(filtered);
        updateChart();
      };
        // Replace 'your-api-endpoint' with your actual API endpoint URL
        // fetch('your-api-endpoint')
        //   .then((response) => response.json())
        //   .then((data) => setData(data))
        //   .catch((error) => console.error(error));
        setData(testData);
        filterData();
  }, [data,  filter, filteredData]);
  
  return (
    <div>
      <div>
        Filter by:
        <button onClick={() => setFilter('all')}>All Records</button>
        <button onClick={() => setFilter('past6Months')}>Past 6 Months</button>
        <button onClick={() => setFilter('past3Months')}>Past 3 Months</button>
        <button onClick={() => setFilter('pastMonth')}>Past Month</button>
        <button onClick={() => setFilter('pastWeek')}>Past Week</button>
      </div>
      <canvas ref={chartRef} />
    </div>
  ); // Closing parenthesis added here
};

export default LineGraph;
