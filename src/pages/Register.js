import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Card, Alert } from 'react-bootstrap';


function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext); 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
  
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    setError('');
    setIsLoading(true);
  
    try {
      // Create user with email, password, and name
      await register(email, password, name);
      setIsLoading(false);
      navigate('/users'); // Redirect to user page
    } catch (error) {
      setError('An error occurred while registering. Please try again.');
      setIsLoading(false);
    }
  };
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={handleNameChange}
                autoComplete="name" required />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={handleEmailChange} 
              autoComplete="email" required />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="password"
                required
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                autoComplete="new-password"
                required
              />
            </Form.Group>

            <Button variant="primary" block="true" onClick={handleRegister} disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <Link to="/login">Already have an account? Login here</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
    
    
  );
}

export default Register;

