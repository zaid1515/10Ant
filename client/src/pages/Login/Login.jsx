import React, { useContext, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Logo from '../../images/logo.png';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  let { loginUser, googleLogin } = useContext(AuthContext);
  const forgotPassword = async () => {
    try {
      if (!email) {
        toast.error("Email is required for password reset!");
        return
      }
      const response = await axios.post('http://localhost:4000/api/v1/auth/forgot', {
        email: email,
      })

      console.log(response.data)
      if (response.data.success) {
        toast.success("Password reset link sent to your email");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`);
    }
  }
  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="circle"></div>
        <div className="login">
          <ToastContainer />
          <h2 className="loginHeader">
            <img src={Logo} alt="10ant logo" className="login-logo" />
            <span className="title">10ANT</span>
          </h2>
          <form className="loginForm" onSubmit={loginUser}>
            <button className="google-btn" type="button" onClick={googleLogin}>
              <FcGoogle className="google-icon" />
              <span className="google-btn-text">Sign in with Google</span>
            </button>
            <div className="orWrapper">
              <hr className="line" />
              <p className="orText">OR</p>
              <hr className="line" />
            </div>
            <article>Email</article>
            <input type="email" name="email" id="lgnemail" onChange={(e) => setEmail(e.target.value)} />
            <article>Password</article>
            <input type="password" name="password" id="lgnpass" />
            <div className='forgot-pass' onClick={forgotPassword}>Forgot Password?</div>
            {/* <br /> */}
            <button className="submit-btn" type="submit">Login</button>
          </form>
          <p>Don't have an account? <Link to="/signup"><span className="signupLink">Register</span></Link></p>
        </div>
      </div>
    </div>
  );
}
