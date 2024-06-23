import React, { useContext, useState } from "react";
import "./Login.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Logo from '../../images/logo.png';
import { FcGoogle } from 'react-icons/fc';

export default function Signup() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const {googleLogin}=useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { username, email, password, confirmpassword } = form;
      if (password !== confirmpassword) {
        alert("Passwords do not match");
      } else {
        console.log(form)
        const res = await axios.post("http://localhost:4000/api/v1/auth/register", {
          username,
          email,
          password,
        });
        console.log(res.data);
        res.data && window.location.replace("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <div className="circle"></div>
        <div className="login">
          {/* <h2>
            WELCOME TO <br></br>
            <span className="title">10ANT</span>
          </h2> */}
          <h2 className="loginHeader">
            <img src={Logo} alt="10ant logo" className="login-logo" />
            <span className="title">10ANT</span>
          </h2>
          <form className="loginForm" onSubmit={handleSubmit}>
            <button className="google-btn" type="button" onClick={googleLogin}>
              <FcGoogle className="google-icon" />
              <span className="google-btn-text">Sign in with Google</span>
            </button>
            <div className="orWrapper">
              <hr className="line" />
              <p className="orText">OR</p>
              <hr className="line" />
            </div>
            <article>Username</article>
            <input type="text" name="username" value={form.username} onChange={handleChange} />
            <article>Email</article>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
            <article>Password</article>
            <input type="password" name="password" value={form.password} onChange={handleChange} />
            {/* <article>Confirm Password</article> */}
            {/* <input type="password" name="confirmpassword" value={form.confirmpassword} onChange={handleChange}/> */}
            <br/>
            <button className="submit-btn" type="submit">
              Signup
            </button>
          </form>
          <p>
            Dont have an account? <Link to='/login'><span className="signupLink">Login</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
}
