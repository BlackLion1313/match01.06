import React, { useContext } from 'react';
import Users from '../Components/Users/Users';
import { Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Userspage = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="position-relative vh-100">
      <Container className="position-relative" style={{ zIndex: 10 }}>
        {isLoggedIn ? (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Welcome, {user.displayName || user.email}!</h2>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <h1>Hi, nobody. Please log in.</h1>
        )}
        <div>Userspage</div>
        <Users />
      </Container>
      <img
        className="w-100 position-fixed top-0 start-0"
        src="https://images.pexels.com/photos/1198839/pexels-photo-1198839.jpeg"
        alt="Background"
      />
    </div>
  );
};

export { Userspage };
