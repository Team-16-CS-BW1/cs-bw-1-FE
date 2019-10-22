import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [loginState, setLoginState] = useState({ username: '', password: '' });
  // const [value, setValue] = useState('');

  const loginChange = e => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  console.log('USER:', loginState);
  // console.log('VALUE:', value);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   setUser([...user, value]);
  //   setValue('');
  // };

  const handleLogin = e => {
    e.preventDefault();
    axios
      .post('https://lambda-mud-test.herokuapp.com/api/login', loginState)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='login-wrapper'>
      <form onSubmit={handleLogin}>
        <div className='input-fields'>
          <input
            onChange={loginChange}
            name='username'
            placeholder='username'
            value={loginState.username}
          />
          <input
            onChange={loginChange}
            placeholder='password'
            name='password'
            value={loginState.password}
          />
          <button type='submit'>Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
