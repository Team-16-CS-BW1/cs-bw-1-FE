import React, { useState } from "react";
import axios from "axios";

import styled from "styled-components";

const Login = props => {
  // LOGIN STATE
  const [loginState, setLoginState] = useState({ username: "", password: "" });

  // REGISTER STATE
  const [registerState, setRegisterState] = useState({
    username: "",
    password1: "",
    password2: ""
  });

  // Toggle for displaying either login form or the sign up form
  const [showLogin, setShowLogin] = useState(true);

  const registerChange = e => {
    setRegisterState({
      ...registerState,
      [e.target.name]: e.target.value
    });
  };

  const loginChange = e => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value
    });
  };

  console.log("USER:", loginState);
  console.log("USER:", registerState);

  // console.log('VALUE:', value);

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   setUser([...user, value]);
  //   setValue('');
  // };

  // handles submit for the login form
  const handleLogin = e => {
    e.preventDefault();
    axios
      .post(
        // "https://lambda-mud-test.herokuapp.com/api/login/",
        "https://t-16-mud.herokuapp.com/api/login/",
        loginState
      )
      .then(res => {
        localStorage.setItem("token", res.data.key);
        // props.setLoginState(true);
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
        console.log(err);
      });
  };

  // handles submit for the registration form
  const handleRegister = e => {
    e.preventDefault();
    axios
      .post(
        // "https://lambda-mud-test.herokuapp.com/api/registration/",
        "https://t-16-mud.herokuapp.com/api/registration/",
        registerState
      )
      .then(res => {
        localStorage.setItem("token", res.data.key);
        // props.setLoginState(true);
        console.log("REGISTER DATA", res.data);
      })
      .catch(err => {
        console.error(err);
        console.log(err);
      });
  };

  return (
    <LandingContainer>
      <h1>{showLogin ? "Welcome Back!" : "Join Us Today!"}</h1>
      {showLogin ? (
        // <div className='main-wrapper'>
        <div className="login-wrapper">
          <form onSubmit={handleLogin}>
            <div className="input-fields">
              <input
                placeholder="username"
                onChange={loginChange}
                name="username"
                value={loginState.username}
                className="field"
              />
              <input
                onChange={loginChange}
                placeholder="password"
                name="password"
                value={loginState.password}
                className="field"
              />
              <button className="custom-button" type="submit">
                Log In
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="register-form">
          <form onSubmit={handleRegister}>
            <div className="input-fields">
              <input
                placeholder="username"
                onChange={registerChange}
                name="username"
                value={registerState.username}
                className="field"
              />
              <input
                onChange={registerChange}
                placeholder="password"
                name="password1"
                value={registerState.password1}
                className="field"
              />
              <input
                onChange={registerChange}
                placeholder="confirm password"
                name="password2"
                value={registerState.password2}
                className="field"
              />
              <button className="custom-button" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        // </div>
      )}
      <button
        className="custom-button2"
        onClick={() => setShowLogin(!showLogin)}
      >
        Toggle Sign in
      </button>
    </LandingContainer>
  );
};

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  align-items: center;
`;

// const StyledForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   width: 40%;
//   margin: 0 auto;
//   input {
//     width: 100%;
//     height: 56px;
//     position: relative;
//     padding: 0px 16px;
//     border: none;
//     border-radius: 4px;
//     font-family: "Gotham SSm A", "Gotham SSm B", sans-serif;
//     font-size: 16px;
//     font-weight: 400;
//     line-height: normal;
//     background-color: transparent;
//     color: #282828;
//     outline: none;
//     box-shadow: 0px 4px 20px 0px transparent;
//     transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
//       0.1s padding ease-in-out;
//     -webkit-appearance: none;
//   }
// `;

export default Login;
