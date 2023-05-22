import React from 'react';
import Users from '../Components/Users/Users';
import { Container } from 'react-bootstrap';
const Userspage = () => {
  return (
    <div className="position-relative vh-100">
      <img className="w-100 position-fixed top-0 start-0" src="https://images.pexels.com/photos/1198839/pexels-photo-1198839.jpeg"></img>
      <Container className="position-relative" style={{ zIndex: 10 }}>
    <div>Userspage</div>
    <Users />
    </Container>
    </div>
  )
}

export {Userspage};