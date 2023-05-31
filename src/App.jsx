import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import  NotfoundPage  from './pages/NotfoundPage';
import  Userspage  from './pages/Userspage';
import './App.css';
import React from 'react';
import { AuthContextProvider } from './context/AuthContext';
import { app } from './config/firebaseConfig';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import DeleteUserPage from './pages/DeleteUserPage';

const App = () => {
  console.log(app);

  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Userspage />} />
          <Route path="/user/:uKey" element={<UserDetails />} />
          <Route path="/delete" element={<DeleteUserPage />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
