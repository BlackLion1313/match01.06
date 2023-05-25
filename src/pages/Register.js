import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

function Register() {
  const { register } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleRegister = () => {
    //  console.log('email, password', email, password)
    register(email, password)
  };

  return (
    <>
      <div>Register</div>
      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange} />
        <label htmlFor='email'>Email</label>

        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
        <label htmlFor='password'>Password</label>

        <button onClick={handleRegister}>Register</button>
      </div>
    </>
  )
}

export default Register;