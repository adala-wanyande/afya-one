import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = () => {
  const chartRef = useRef(null);

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Weight',
        data: [73.0, 73.5, 74.0, 74.5, 74.0, 75.0],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
        tension: 0.4,
        fill: {
            target: 'origin',
            below: 'rgb(255, 0, 0)',   // Area will be red above the origin
            above: 'rgb(0, 0, 255)'    // And blue below the origin
          }
      },
    ],
  };

  useEffect(() => {
    const chartCanvas = chartRef.current;

    if (chartCanvas) {
      const myChart = new Chart(chartCanvas, {
        type: 'line', // Specify line chart type
        data: lineData,
        options: {
          scales: {
            x: {
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
        },
      });

      // Cleanup function to destroy the chart on unmount
      return () => myChart.destroy();
    }
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineGraph;
