import React, { useState } from 'react';
import './Dashboard.css'; // Import CSS file for styling

function RetirementCalculator() {
  const [formData, setFormData] = useState({
    currentAge: 0,
    retirementAge: 0,
    lifeExpectancy: 0,
    currentIncome: 0,
    currentExpense: 0,
    growthRate: 0,
    inflationRate: 0,
  });

  const [retirementCorpus, setRetirementCorpus] = useState(0);
  const [isSufficient, setIsSufficient] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.valueAsNumber,
    });
  };

  const calculateRetirementCorpus = () => {
    const { retirementAge, lifeExpectancy, currentExpense, inflationRate } = formData;

    let futureExpenses = 0;
    for (let year = 1; year <= lifeExpectancy - retirementAge; year++) {
      futureExpenses += currentExpense * Math.pow(1 + inflationRate / 100, year);
    }

    setRetirementCorpus(futureExpenses);
  };

  const checkSufficiency = () => {
    const { currentIncome, growthRate, currentExpense, inflationRate, retirementAge } = formData;
    let futureSavings = 0;
    let expense = currentExpense;

    for (let year = 1; year <= retirementAge - formData.currentAge; year++) {
      futureSavings += currentIncome * (1 + growthRate / 100) - expense;
      expense *= 1 + inflationRate / 100;
    }

    setIsSufficient(futureSavings >= retirementCorpus);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateRetirementCorpus();
    checkSufficiency();
  };

  return (
    <div className="retirement-calculator">
      <h1 className="header">Retirement Calculator</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">Current Age:</label>
        <input
          type="number"
          name="currentAge"
          value={formData.currentAge}
          onChange={handleChange}
          className="input-field"
        />
        <label className="form-label">Retirement Age:</label>
        <input
          type="number"
          name="retirementAge"
          value={formData.retirementAge}
          onChange={handleChange}
          className="input-field"
        />
        <label className="form-label">Life Expectancy:</label>
        <input
          type="number"
          name="lifeExpectancy"
          value={formData.lifeExpectancy}
          onChange={handleChange}
          className="input-field"
        />
        <label className="form-label">Current Yearly Income:</label>
        <input
          type="number"
          name="currentIncome"
          value={formData.currentIncome}
          onChange={handleChange}
          className="input-field"
        />
        <label className="form-label">Current Yearly Expense:</label>
        <input
          type="number"
          name="currentExpense"
          value={formData.currentExpense}
          onChange={handleChange}
          className="input-field"
        />
        <label className="form-label">Yearly Percentage Growth in Income:</label>
        <input
          type="number"
          name="growthRate"
          value={formData.growthRate}
          onChange={handleChange}
          className="input-field"
        />
        <label className="form-label">Inflation Percentage:</label>
        <input
          type="number"
          name="inflationRate"
          value={formData.inflationRate}
          onChange={handleChange}
          className="input-field"
        />
        <button type="submit" className="submit-button">Calculate</button>
      </form>

      {retirementCorpus > 0 && (
        <div className="result-container">
          <p className="result-message">Required Retirement Corpus: ${retirementCorpus.toFixed(2)}</p>
          {isSufficient ? (
            <p className="result-info">Your current income is sufficient to reach your retirement goals!</p>
          ) : (
            <p className="result-info">
              Your current income may not be sufficient. Consider increasing your
              savings or adjusting your retirement goals.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default RetirementCalculator;
