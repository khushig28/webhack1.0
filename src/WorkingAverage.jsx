import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css'; // Import CSS file for styling
import Chart from 'chart.js/auto';

const WorkingAverage = () => {
  const [expenses, setExpenses] = useState({
    food: 0,
    entertainment: 0,
    shopping: 0,
    others: 0,
  });

  const chartRef = useRef(null); // Reference to the chart instance

  // Function to handle adding expenses
  const handleAddExpense = (type, amount) => {
    setExpenses(prevExpenses => ({
      ...prevExpenses,
      [type]: prevExpenses[type] + amount
    }));
  };

  useEffect(() => {
    // Line chart data and options
    const lineChartData = {
      labels: Object.keys(expenses),
      datasets: [{
        label: 'Expenses Over Time',
        data: Object.values(expenses),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1 // Adjust the tension value here
      }]
    };

    const lineChartOptions = {
      scales: {
        x: {
          offset: true, // Enable the offset to reduce the gap between labels
        },
        y: {
          beginAtZero: true
        }
      }
    };

    // Initialize the line chart or update existing chart
    const lineChartCanvas = document.getElementById('line-chart');
    if (lineChartCanvas) {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy existing chart if it exists
      }
      chartRef.current = new Chart(lineChartCanvas, {
        type: 'line',
        data: lineChartData,
        options: lineChartOptions
      });
    }

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [expenses]);

  return (
    <div className="working-average">
      <h2>Working Average</h2>
      <div className="expenses">
        {/* Button to add expenses */}
        <button onClick={() => handleAddExpense('food', 50)}>Add Food Expense</button>
        <button onClick={() => handleAddExpense('entertainment', 30)}>Add Entertainment Expense</button>
        <button onClick={() => handleAddExpense('shopping', 40)}>Add Shopping Expense</button>
        <button onClick={() => handleAddExpense('others', 20)}>Add Others Expense</button>
      </div>
      {/* Line chart to visualize expenses over time */}
      <div className="line-chart-container">
        <h3>Expenses Over Time</h3>
        <canvas id="line-chart" width="500" height="150"></canvas> {/* Adjust canvas dimensions */}
      </div>
    </div>
  );
};

export default WorkingAverage;
