import React from 'react';
import Pomodoro from './Components/Pomodoro';
import Navbar from './Components/Navbar';
import Settings from './Components/Settings';
import './App.css';
import {  Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Pomodoro />} />
      </Routes>
    </div>
  );
}

export default App;
