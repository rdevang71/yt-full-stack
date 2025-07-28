// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register.js'; // ✅ fix typo if it was "Rigester"
import Login from './components/Login.js'; // ✅ import Login component

function App() {
  return (
    <Routes>
      {/* Show Register page at root route */}
      <Route path="/" element={<Register />} />

      {/* Explicit Register route */}
      <Route path="/register" element={<Register />} />

      {/* New Login route */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
