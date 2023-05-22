import { Routes, Route, Link } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { NotfoundPage } from './pages/NotfoundPage';
import { Userspage } from './pages/Userspage';
import './App.css';
import React from 'react';
import UserDetails from './pages/UserDetails';
import { AuthPage } from './pages/AuthPage';




const App = () => {


  return (
    <>
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/users" element={<Userspage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user/:userId" element={<UserDetails />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>

    </>

  )
}

export default App;