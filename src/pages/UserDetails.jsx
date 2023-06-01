import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Col, Container, Row } from 'react-bootstrap';

const UserDetails = (props) => {
  const location = useLocation();
  const { userDetails } = location.state;

  const handleLocationClick = () => {
    const { location: { city, country } } = userDetails;
    window.open(`https://maps.google.com/maps?q=${city},${country}`);
  };

  const handleEmailClick = () => {
    const { email } = userDetails;
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = () => {
    const { phone } = userDetails;
    window.location.href = `tel:${phone}`;
  };

  return (
   
      <div className="container d-flex flex-column align-items-center" style={{ marginTop: '100px', minHeight: '100%' }}>
        {userDetails ? (
          <div className="card mx-auto shadow" style={{ width: '500px', borderRadius: '10px', padding: '20px', opacity: 0.8, backgroundColor: 'white' }}>
            <div className="d-flex justify-content-between mb-4">
              <NavLink  to="/">Home</NavLink>
              <NavLink  to="/users">Developers</NavLink>
            </div>
            <div className="d-flex">
              <div style={{ marginRight: '20px' }}>
                <img src={userDetails.picture.large} alt={`${userDetails.name.first} ${userDetails.name.last}`} style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{userDetails.name.first} {userDetails.name.last}</h2>
                <p style={{ fontSize: '18px', margin: '10px 0', cursor: 'pointer' }}>
                  <FaMapMarkerAlt style={{ marginRight: '10px' }} onClick={handleLocationClick} /> 
                  Location: <span onClick={handleLocationClick}>{userDetails.location.city}, {userDetails.location.country}</span>
                </p>
                <p style={{ fontSize: '18px', margin: '10px 0', cursor: 'pointer' }}>
                  <FaEnvelope style={{ marginRight: '10px' }} onClick={handleEmailClick} /> 
                  Email: <span onClick={handleEmailClick}>{userDetails.email}</span>
                </p>
                <p style={{ fontSize: '18px', margin: '10px 0', cursor: 'pointer' }}>
                  <FaPhone style={{ marginRight: '10px' }} onClick={handlePhoneClick} /> 
                  Phone: <span onClick={handlePhoneClick}>{userDetails.phone}</span>
                </p>
              </div>
            </div>
            <div style={{ marginTop: '30px' }}>
              <h3>About Me</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius est vel justo commodo, id blandit lectus malesuada. Sed dignissim interdum scelerisque. Curabitur bibendum feugiat purus vel cursus.</p>
                <p>Nulla sed convallis dui. Curabitur non nisi facilisis, volutpat sem non, interdum dolor. Donec auctor ligula id libero luctus, et lobortis purus tempor.</p>
              </div>
            </div>
          ) : (
            <p>Developer not found.</p>
          )}
    
        <footer className="footer fixed-bottom">
  <Container fluid>
    <Row className="justify-content-center align-items-center">
      <Col xs="auto" className="text-center">
        <p className="text-white">© 2023 Mila Alenina. All rights reserved.</p>
        <p className="text-white">Terms of Service | Privacy Policy</p>
      </Col>
    </Row>
  </Container>
</footer>

      </div>
   
  );
};

export default UserDetails;