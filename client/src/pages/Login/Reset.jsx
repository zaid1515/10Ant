import React, { useState } from 'react';
import './Login.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Reset() {
     const navigate=useNavigate()

     const [searchParams] = useSearchParams();
     const email = searchParams.get('email');
     const [password, setPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const [tempPassword, setTempPassword] = useState('');
     const [showPassword, setShowPassword] = useState(false);

     const togglePasswordVisibility = (field) => {
          setShowPassword((prevShowPassword) => ({
               ...prevShowPassword,
               [field]: !prevShowPassword[field]
          }));
          setTimeout(() => {
               setShowPassword((prevShowPassword) => ({
                    ...prevShowPassword,
                    [field]: false
               }));
          }, 600);
     };

     const resetPassword = async (e) => {
          e.preventDefault();
          if (!tempPassword || !password || !confirmPassword) {
               toast.error("All fields are required");
               return;
          }

          if (password !== confirmPassword) {
               toast.error("Passwords don't match");
               return;
          }

          try {
               const response = await axios.post('http://localhost:4000/api/v1/auth/reset', {
                    email: email,
                    password: tempPassword,
                    newPassword: password
               });
               if (response.data.success) {
                    toast.success("Password Reset Successful");
               }
               setTimeout(() => {
                    navigate('/login');
               },4500)
          } catch (error) {
               console.log(error)
               toast.error(`${error.response.data.message}`);
          }
     };

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
                         <form className="loginForm" onSubmit={resetPassword}>
                              <div className="reset-pass-head">Reset Password</div>
                              <article>Temp Password</article>
                              <input
                                   className="input"
                                   type={showPassword.tempPassword ? "text" : "password"}
                                   name="tempPassword"
                                   placeholder="Password sent through email"
                                   onChange={(e) => setTempPassword(e.target.value)}
                              />
                              <article>New Password</article>
                              <input
                                   type={showPassword.password ? "text" : "password"}
                                   name="password"
                                   placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   autoComplete="off"
                              />
                              <FaEye
                                   className="eye-icon"
                                   onClick={() => togglePasswordVisibility('password')}
                              />
                              <article>Confirm Password</article>
                              <input
                                   className="input"
                                   type={showPassword.confirmPassword ? "text" : "password"}
                                   name="confirmPassword"
                                   placeholder="Confirm Password"
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   autoComplete="off"
                              />
                              <FaEye
                                   className="eye-icon"
                                   onClick={() => togglePasswordVisibility('confirmPassword')}
                              />
                              <div></div>
                              <button className="submit-btn" type="submit">Submit</button>
                         </form>
                    </div>
               </div>
          </div>
     );
}
