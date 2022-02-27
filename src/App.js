import React from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  var perf =require('./index.html');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <iframe src={perf }></iframe>   /* like this */
        <p>
          Freelance Beach Cleanup!
        </p>
      </header>
    </div>
  );
}

export default App;
