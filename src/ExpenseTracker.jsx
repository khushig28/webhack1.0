import React, { useState } from 'react';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleExpenseAmountChange = (e) => {
    setExpenseAmount(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const addTransaction = () => {
    if (transactionType && expenseAmount && category) {
      const newTransaction = {
        id: transactions.length + 1,
        transactionType,
        expenseAmount: parseFloat(expenseAmount),
        category,
      };
      setTransactions([...transactions, newTransaction]);
      setTransactionType('');
      setExpenseAmount('');
      setCategory('');
    }
  };

  const removeTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <select value={transactionType} onChange={handleTransactionTypeChange}>
          <option value="">Select Transaction Type</option>
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>
        <input
          type="number"
          placeholder="Expense Amount"
          value={expenseAmount}
          onChange={handleExpenseAmountChange}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={handleCategoryChange}
        />
        <button onClick={addTransaction}>Set</button>
      </div>
      <div>
        <h2>Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Transaction Type</th>
              <th>Expense Amount</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.transactionType}</td>
                <td>${transaction.expenseAmount}</td>
                <td>{transaction.category}</td>
                <td><button onClick={() => removeTransaction(transaction.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTracker;
