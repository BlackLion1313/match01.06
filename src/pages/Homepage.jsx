import React, { useContext, useEffect, useState } from 'react';
import Main from '../Components/Main/Main';
import { AuthContext } from '../context/AuthContext';

function Homepage() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if authentication state has been loaded
    if (user && Object.keys(user).length > 0) {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isLoggedIn ? (
        <h2>Welcome, {user.name || user.email}!!</h2>
      ) : (
        <h1>Hi, nobody. Please log in.</h1>
      )}
      <Main />
    </>
  );
}

export default Homepage;
