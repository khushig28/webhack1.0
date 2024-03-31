// import React, { useState } from 'react';

// function LoginPage({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Here you can perform authentication with the provided email and password
//     // For simplicity, I'll just check if email and password are not empty
//     if (email && password) {
//       onLogin();
//     } else {
//       alert('Please enter email and password');
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default LoginPage;
import React, { useState , useEffect } from 'react';
import './FinancialDashboard.css'; // Import CSS file for styling

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [welcomeMessages, setWelcomeMessages] = useState([
    "Welcome to the Financial Dashboard!",
    "Explore your finances with ease!",
    "Track your investments effortlessly!"
  ]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) =>
        (prevIndex + 1) % welcomeMessages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [welcomeMessages]);
  const handleLogin = () => {
    // Here you can perform authentication with the provided email and password
    // For simplicity, I'll just check if email and password are not empty
    if (email && password) {
      onLogin();
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <div className="dashboard-container1">
      <div className="dashboard-header1">
        <h1>Financial Dashboard</h1>
      </div>
      <div className="welcome-message">
        <h2>
          {welcomeMessages[currentMessageIndex].split('').map((char, index) => (
            <span key={index} className="char-animation">{char}</span>
          ))}
        </h2>
      </div>
      <div className="features">
        <h2>Key Features:</h2>
        <ul>
          <li>Real-time financial data</li>
          <li>Interactive charts and graphs</li>
          <li>Personalized recommendations</li>
        </ul>
      </div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;