import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const DeleteUserPage = () => {
  const { deleteUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteUser = () => {
    deleteUser()
      .then(() => {
        logout();
        navigate('/');
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  return (
    <div>
      <h1>Delete User</h1>
      <p>Are you sure you want to delete your account?</p>
      <button onClick={handleDeleteUser}>Delete Account</button>
    </div>
  );
};

export default DeleteUserPage;
