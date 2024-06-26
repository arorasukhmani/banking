import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Documents from './components/Documents';
import PersonalDetails from './components/PersonalDetails';
import HomeServices from './components/HomeServices';
import AccountForm from './components/AccountForm'; // Import the AccountForm component

function App() {
  return (
    <Router>
      <Header /> {/* Displaying Header component globally */}
      <Routes>
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/" element={<HomeServices />} />
        <Route path="/account-form" element={<AccountForm />} /> {/* Add the AccountForm route */}
      </Routes>
    </Router>
  );
}

export default App;










// import React from 'react';
// import Header from './components/Header';
// import HomeServices from './components/HomeServices';
// import Documents from './components/Documents';
// import PersonalDetails from './components/PersonalDetails';

// function App() {
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <main className="pt-20">
//         <HomeServices />
//         <Documents />
//         <PersonalDetails />
//       </main>
//     </div>
//   );
// }

// export default App;





// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
