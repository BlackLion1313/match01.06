// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// function ProtectedRoute(props) {
//   const { user } = useContext(AuthContext);
//   const isntAuth = user === null ? true : false
//   return (
//     <>{isntAuth ? props.children : <Navigate to="/users"/>}</>
//   )
// }

// export default ProtectedRoute;