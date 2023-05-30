import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import { NotfoundPage } from './pages/NotfoundPage';
import { Userspage } from './pages/Userspage';
import './App.css';
import React from 'react';
import UserDetails from './pages/UserDetails';
import { AuthContextProvider } from './context/AuthContext';
import { app } from './config/firebaseConfig';
import Register from './pages/Register';
import Login from './pages/Login';



const App = () => {

console.log(app)
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Userspage />} />
          <Route path="/user/:userId" element={<UserDetails />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </AuthContextProvider>
    </>

  )
}

export default App;
