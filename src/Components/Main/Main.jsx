import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import beach from '../../assets/beach.mp4';

const Main = () => {
  return (
    <div className="position-relative vh-100">
      <video className="w-100 position-absolute top-0 start-0" autoPlay loop muted>
        <source src={beach} type="video/mp4" />
      </video>
      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="justify-content-center align-items-center">
          <Col xs="auto" className="text-center">
          <header className='my-4'>
        <Link className='mx-4' to='/'>Home</Link>
        <Link className='mx-4' to='/users'>Users</Link>
      </header>
            <h1 className="mb-4 text-white">MatchYou</h1>
            <h2 className='text-white'>BLA BLA BLA BLA BLA BLA</h2>
     
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;



