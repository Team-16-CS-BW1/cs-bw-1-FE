import React, { useState } from 'react';
import axios from 'axios';

const Login = props => {
  // LOGIN STATE
  const [loginState, setLoginState] = useState({ username: '', password: '' });

  // REGISTER STATE
  const [registerState, setRegisterState] = useState({
    username: '',
    password1: '',
    password2: '',
  });

  const registerChange = e => {
    setRegisterState({
      ...registerState,
      [e.target.name]: e.target.value,
    });
  };

  const loginChange = e => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  console.log('USER:', loginState);
  console.log('USER:', registerState);

  // console.log('VALUE:', value);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   setUser([...user, value]);
  //   setValue('');
  // };

  const handleLogin = e => {
    e.preventDefault();
    axios
      .post('https://lambda-mud-test.herokuapp.com/api/login/', loginState)
      .then(res => {
        localStorage.setItem('token', res.data.key);
        // props.setLoginState(true);
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
        console.log(err);
      });
  };

  const handleRegister = e => {
    e.preventDefault();
    axios
      .post(
        'https://lambda-mud-test.herokuapp.com/api/registration/',
        registerState,
      )
      .then(res => {
        localStorage.setItem('token', res.data.key);
        // props.setLoginState(true);
        console.log('REGISTER DATA', res.data);
      })
      .catch(err => {
        console.error(err);
        console.log(err);
      });
  };

  return (
    <div className='main-wrapper'>
      <div className='login-wrapper'>
        <form onSubmit={handleLogin}>
          <div className='input-fields'>
            <input
              placeholder='username'
              onChange={loginChange}
              name='username'
              value={loginState.username}
            />
            <input
              onChange={loginChange}
              placeholder='password'
              name='password'
              value={loginState.password}
            />
            <button type='submit'>Log In</button>
          </div>
        </form>
      </div>

      <div className='register-form'>
        <form onSubmit={handleRegister}>
          <div className='input-fields'>
            <input
              placeholder='username'
              onChange={registerChange}
              name='username'
              value={registerState.username}
            />
            <input
              onChange={registerChange}
              placeholder='password'
              name='password1'
              value={registerState.password1}
            />
            <input
              onChange={registerChange}
              placeholder='confirm password'
              name='password2'
              value={registerState.password2}
            />
            <button type='submit'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
