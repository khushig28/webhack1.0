import React, { useState } from 'react';
import './Dashboard.css'; // Import CSS file for styling
import { Chart, ArcElement } from 'chart.js';
import WorkingAverage from './WorkingAverage';
import RetirementCalculator from './RetirementCalculator';
import { PieChart } from 'recharts';
Chart.register(ArcElement);

const Dashboard = () => {
  const [availableBalance, setAvailableBalance] = useState(0);
  const [expenses, setExpenses] = useState({
    food: 0,
    entertainment: 0,
    shopping: 0,
    others: 0,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [transactionMode, setTransactionMode] = useState('cash');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionCategory, setTransactionCategory] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionRecord, setTransactionRecord] = useState([]);

  const handleAddBalance = () => {
    const amount = parseFloat(prompt('Enter amount to add:'));
    if (!isNaN(amount)) {
      setAvailableBalance(prevBalance => prevBalance + amount);
    }
  };

  const handleAddExpense = () => {
    const type = prompt('Enter type of expense (food, entertainment, shopping, others):');
    const amount = parseFloat(prompt('Enter amount for this expense:'));
    if (!isNaN(amount) && amount <= availableBalance && expenses.hasOwnProperty(type)) {
      setExpenses(prevExpenses => ({
        ...prevExpenses,
        [type]: prevExpenses[type] + amount
      }));
      setAvailableBalance(prevBalance => prevBalance - amount);
      addExpenseData(amount); // Add data for expenses line chart
    } else {
      alert('Invalid expense type or amount, or insufficient balance.');
    }
  };

  const addExpenseData = (amount) => {
    const currentDate = new Date().toLocaleDateString();
    setExpensesData(prevData => [...prevData, { date: currentDate, amount }]);
  };

  const addRevenueData = (amount) => {
    const currentDate = new Date().toLocaleDateString();
    setRevenueData(prevData => [...prevData, { date: currentDate, amount }]);
  };

  const handleAddTransaction = () => {
    if (!transactionDate.trim() || !transactionCategory.trim() || !transactionAmount.trim()) {
      alert('Please fill all fields.');
      return;
    }
    const amount = parseFloat(transactionAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Invalid transaction amount.');
      return;
    }
    setTransactionRecord(prevRecord => [
      ...prevRecord,
      { mode: transactionMode, date: transactionDate, category: transactionCategory, amount }
    ]);
    setTransactionDate('');
    setTransactionCategory('');
    setTransactionAmount('');
  };

  return (
    <div className="dashboard-container">
      <div className='heading'><h1>FINANCIAL DASHBOARD</h1></div> 
      <div className="sectionone">
        <h2>Available Balance: ${availableBalance}</h2>
        <button onClick={handleAddBalance}>Add Balance</button>
      </div>
      <div className="sectiontwo">
        <h2>Expenses</h2>
        <button onClick={handleAddExpense}>Add Expense</button>
        <ul>
          <li>Food: ${expenses.food}</li>
          <li>Entertainment: ${expenses.entertainment}</li>
          <li>Shopping: ${expenses.shopping}</li>
          <li>Others: ${expenses.others}</li>
        </ul>
        <PieChart expenses={expenses} />
      </div>
      <div className="working-average">
        
        <WorkingAverage />
      </div>
      <div className="transaction-history">
        <h2>Transaction History</h2>
        <div className="transaction-form">
          <select value={transactionMode} onChange={(e) => setTransactionMode(e.target.value)}>
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
          </select>
          <input
            type="date"
            placeholder="Date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={transactionCategory}
            onChange={(e) => setTransactionCategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <button onClick={handleAddTransaction}>Add Transaction</button>
        </div>
        <ul>
          {transactionRecord.map((record, index) => (
            <li key={index}>
              Mode: {record.mode}, Date: {record.date}, Category: {record.category}, Amount: ${record.amount}
            </li>
          ))}
        </ul>
      </div>
      <h1>RetirementCalculator</h1>
      <RetirementCalculator/>
    </div>
  );
};

export default Dashboard;
