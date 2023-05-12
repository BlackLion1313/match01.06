import { Routes, Route, Link } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { NotfoundPage } from './pages/NotfoundPage';
import { Userspage } from './pages/Userspage';
import './App.css';
import React from 'react';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/users" element={<Userspage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>

  )
}

export default App;



