import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import dev from '../../assets/dev.mp4'
import { AuthContext } from '../../context/AuthContext';

const Main = () => {
  const linkStyle = {
    color: 'red',
    fontSize: 'large',
  };

  const { user, isLoggedIn, logout, deleteUser } = useContext(AuthContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleDeleteUser = () => {
    setShowConfirmation(true);
  };

  const confirmDeleteUser = () => {
    deleteUser()
      .then(() => {
        logout();
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      })
      .finally(() => {
        setShowConfirmation(false);
      });
  };

  const cancelDeleteUser = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="position-relative vh-100">
        <video className="position-fixed background-100%" autoPlay loop muted>
          <source src={dev} type="video/mp4" />
        </video>

        <Container className="position-relative min-vh-100" style={{ zIndex: 10 }}>
          <Row className="justify-content-center align-items-center">
            <Col xs="auto" className="text-center">
              <header className='my-4'>
                <NavLink style={({ isActive }) => isActive ? linkStyle : null} className='mx-4' to='/'>Home</NavLink>
                {isLoggedIn ? (
                  <>
                    <NavLink className='mx-4' to='/users'>Developers</NavLink>
                    <NavLink className='mx-4' to='/chat'>Chat</NavLink>
                    <Button className='mx-4' variant="primary" onClick={handleLogout}>Logout</Button>
                    <Button className='mx-4' variant="danger" onClick={handleDeleteUser}>Delete Account</Button>
                  </>
                ) : (
                  <>
                    <NavLink className='mx-4' to='/login'>
                      Login
                    </NavLink>
                    <NavLink className='mx-4' to='/register'>
                      Register
                    </NavLink>
                  </>
                )}
                {isLoggedIn && user ? (
                  <div className="d-flex align-items-start mt-4">
                    <PersonCircle
                      size={48}
                      className="me-2"
                      style={{
                        color: 'white',
                        textShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)',
                      }}
                    />
                    <div>
                      <h2 className="text-white fs-4">{user.name || user.email}</h2>
                    </div>
                  </div>
                ) : (
                  <h2 className='text-white mt-4'>
                    Please register if you do not have an account or login if you have one
                  </h2>
                )}
              </header>
              <Card className="my-4" style={{ opacity: 0.9 }}>
                <Card.Body>
                  <h3>Outstaff Developers</h3>
                  <p>
                    We provide highly skilled and dedicated outstaff developers for your projects.
                    Our developers are experienced in various technologies and can seamlessly integrate into your team.
                    Whether you need web development, mobile app development, or any other software development expertise, we've got you covered.
                    With our flexible engagement models, you can scale your team up or down based on your project requirements.
                    Take your projects to the next level with our exceptional outstaff developers.
                  </p>
                </Card.Body>
              </Card>

              <Card className="my-4" style={{ opacity: 0.9 }}>
                <Card.Body>
                  <h3>Quality Assurance</h3>
                  <p>
                    Our QA experts ensure that your software meets the highest quality standards.
                    With their meticulous testing and quality assurance processes, we identify and resolve any issues to deliver a flawless product.
                    From functional testing to performance testing and everything in between, our QA team guarantees a seamless user experience.
                    Trust us to provide comprehensive quality assurance services for your projects.
                  </p>
                </Card.Body>
              </Card>

              <Card className="my-4" style={{ opacity: 0.9 }}>
                <Card.Body>
                  <h3>Project Management</h3>
                  <p>
                    Our project managers ensure smooth execution and timely delivery of your projects.
                    With their expertise in agile methodologies and efficient coordination, they keep your development process on track.
                    From requirement gathering to task management and communication, our project managers streamline the project lifecycle.
                    Trust us to provide effective project management services for successful project outcomes.
                  </p>
                </Card.Body>
              </Card>
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
            </Col>
          </Row>
        </Container>
      </div>

      <Modal show={showConfirmation} onHide={cancelDeleteUser} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDeleteUser}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteUser}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Main;
