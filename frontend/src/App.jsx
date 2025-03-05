import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';

import './App.css';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Navigation from './components/Nav';
import AddPost from './components/AddPost';
import { PostProvider } from './context/PostsContext';

function App() {
  return (
    <>
      <PostProvider>
        <SessionProvider>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route
                path="/"
                element={<SignIn />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
              <Route
                path="/addPost"
                element={<AddPost />}
              />
            </Routes>
          </BrowserRouter>
        </SessionProvider>
      </PostProvider>
    </>
  );
}

export default App;
