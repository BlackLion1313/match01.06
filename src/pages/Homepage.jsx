import React, { useContext } from 'react';
import Main from '../Components/Main/Main';
import { AuthContext } from '../context/AuthContext';

function Homepage() {
  const { user } = useContext(AuthContext);
  return (
    <>
    {/* <h2>Welcome {user?.name}!!</h2> */}
   {user.name ? <h2>Welcome {user.name}!!</h2> : <h1>hi to nobody</h1>} 
      <Main />
  </>
  )
}

export default  Homepage ;