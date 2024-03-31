import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ expenses }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (expenses) {
      if (chartInstance.current) {
        updateChart();
      } else {
        createChart();
      }
    }
  }, [expenses]);

  const createChart = () => {
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(expenses),
        datasets: [{
          data: Object.values(expenses),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
            // Add more colors if needed
          ]
        }]
      }
    });
  };

  const updateChart = () => {
    chartInstance.current.data.datasets[0].data = Object.values(expenses);
    chartInstance.current.update();
  };

  return (
    <div className="pie-chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PieChart;
