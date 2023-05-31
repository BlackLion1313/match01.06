import React, { useContext } from 'react';
import Users from '../Components/Users/Users';
import { Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { PersonCircle } from 'react-bootstrap-icons';

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
            <NavLink className='mx-4' to='/'>Home</NavLink>
            <div className="d-flex align-items-start mt-4">
                    <PersonCircle
                      size={48}
                      className="me-2"
                      style={{
                        color: 'blue',
                     
                      }}
                    />
              <h2>Welcome, {user.displayName || user.email}!</h2>
            </div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <h1>Hi, nobody. Please log in.</h1>
        )}
       
        <Users />
      </Container>
     
    </div>
  );
};

export default Userspage;
