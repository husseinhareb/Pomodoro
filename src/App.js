import React from 'react';
import Pomodoro from './Components/Pomodoro';
import Navbar from './Components/Navbar';
import Settings from './Components/Settings';
import './App.css';
import Toggler from './Components/Toggler';
function App() {
  return (
    <div>
      <Navbar />
      <Toggler />
      <Settings />
      <Pomodoro />
    </div>
  );
}

export default App;
