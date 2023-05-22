import React from 'react';
import AuthForm from '../Components/AuthForm/AuthForm';

const AuthPage = () => {

  const handleAuth = ({ userLogin, userPassword }) => {
    axios.get('http://localhost:3001/users.json')
      .then(({ data }) => {
        const result = data.filter(({ login, pass }) => {
          return login === userLogin && pass === userPassword;
        });
        if (!result.length) {
          console.log('error')
          //we enter wring login
        } else {
          console.log('ok')
        }

      })
  }


  return (
    <>
      <AuthForm onSignIn={handleAuth} />
    </>
  )
}

export { AuthPage };