import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SignIn />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
