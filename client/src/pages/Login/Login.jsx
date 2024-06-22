import React, { useContext } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Logo from '../../images/logo.png';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="circle"></div>
        <div className="login">
          <h2 className="loginHeader">
            <img src={Logo} alt="10ant logo" className="login-logo" />
            <span className="title">10ANT</span>
          </h2>
          <form className="loginForm" onSubmit={loginUser}>
            <button className="google-btn" type="button" onClick={loginUser}>
              <FcGoogle className="google-icon" />
              <span className="google-btn-text">Sign in with Google</span>
            </button>
            <div className="orWrapper">
              <hr className="line" />
              <p className="orText">OR</p>
              <hr className="line" />
            </div>
            <article>Email</article>
            <input type="email" name="email" id="lgnemail" />
            <article>Password</article>
            <input type="password" name="password" id="lgnpass" />
            <br />
            <button className="submit-btn" type="submit">Login</button>
          </form>
          <p>Don't have an account? <Link to="/signup"><span className="signupLink">Register</span></Link></p>
        </div>
      </div>
    </div>
  );
}
