import React, { useState } from 'react';

const Login = () => {
  const [loginState, setLoginState] = useState({ username: '', password: '' });
  const [value, setValue] = useState('');

  const loginChange = e => {
    setLoginState({
      ...loginState,
    });
  };

  console.log('USER:', user);
  console.log('VALUE:', value);

  const handleSubmit = e => {
    e.preventDefault();
    setUser([...user, value]);
    setValue('');
  };

  return (
    <div className='login-wrapper'>
      <form onSubmit={handleSubmit}>
        <div className='input-fields'>
          <input
            onChange={e => setValue(e.target.value)}
            name='Username'
            value={value}
          />
          <input
            onChange={e => setValue(e.target.value)}
            name='Password'
            value={value}
          />
          <button></button>
        </div>
      </form>
    </div>
  );
};

export default Login;
