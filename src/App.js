
// import React, { useState } from 'react';
// import './App.css';
// import LoginPage from './Login';
// import CryptoData from './CryptoData';
// import LineChart from './LineChart';
// import PieChart from './PieChart';
// import ExpenseTracker from './ExpenseTracker';
// import Dashboard from './Dashboard';


// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <div className="App">
//       {isLoggedIn ? (
//         <Dashboard />
//       ) : (
//         <LoginPage onLogin={() => setIsLoggedIn(true)} />
        
//       )
//   }
//     </div>
    
//   );
// }


// export default App;
import React, { useState } from 'react';
import './App.css';
import LoginPage from './Login';
import CryptoData from './CryptoData';
import LineChart from './LineChart';
import PieChart from './PieChart';
import ExpenseTracker from './ExpenseTracker';
import Dashboard from './Dashboard';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
        
      )
  }
    </div>
    
  );
}


export default App;