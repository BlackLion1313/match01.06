import React, { useRef, useState } from 'react'
import { validateLogin, validatePassword } from '../../helpers/validators';


const AuthForm = ({ onSignIn }) => {
  const [errors, setErrors] = useState(false)
  const login = useRef('');
  const password = useRef('');

  const handleSignIn = () => {
    const loginValue = login.current.value;
    const passwordValue = password.current.value;

    const isLoginValid = validateLogin(loginValue);
    const isPasswordValid = validatePassword(passwordValue);

    if (isLoginValid && isPasswordValid) {
      setErrors(false)
      return onSignIn({
        login: loginValue,
        password: passwordValue
      });
    }

setErrors(true);

  };

  return (
    <div className='AuthForm'>
      {errors && ( 
      <div className='errors'>
        Login or Password invalid
      </div> 
      )}
      <p>
        <input
          ref={login}
          type="text" name='login' placeholder='Enter your login' />
      </p>
      <p>
        <input
          ref={password} type="password" name='password' placeholder='Password' />
      </p>
      <p>
        <input type="button" value="Sign in" onClick={handleSignIn} />
      </p>
    </div>
  )
}

export default AuthForm;