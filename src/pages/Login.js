import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Card } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      await login(email, password);
      setIsLoading(false);
      navigate('/users');
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('Unregistered email. Please register first.');
      } else {
        setErrorMessage('Login error: ' + error.message);
      }
    }
  };


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh', background: '#f8f9fa' }}
    >
      <Card
        style={{
          width: '400px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="pass"
                required
              />
            </Form.Group>

            {errorMessage && (
              <div className="text-danger mb-3">{errorMessage}</div>
            )}

            <Button
            className='mt-4'
              variant="primary"
              block="true"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <Link to="/register">Don't have an account? Sign up here</Link>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          <div className="mt-2">
        
</div>
</Card.Footer>
</Card>
</div>
);
}

export default Login;