import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=70');
      const data = await response.json();
      const userData = data.results[0];
      setUser(userData);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  const likeUser = () => {
    setIsLiked(true);
  };

  const unlikeUser = () => {
    setIsLiked(false);
  };

  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return <div>Error loading user details.</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <Card
        style={{
          width: '400px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Card.Body>
          <Card.Title>{`${user.name.first} ${user.name.last}`}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>City: {user.location.city}</Card.Text>
          <Card.Text>Country: {user.location.country}</Card.Text>
          <Card.Text>Gender: {user.gender}</Card.Text>
          <div>
            {isLiked ? (
              <button className="btn btn-danger" onClick={unlikeUser}>
                Unlike
              </button>
            ) : (
              <button className="btn btn-primary" onClick={likeUser}>
                Like
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserDetails;
