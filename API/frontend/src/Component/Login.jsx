import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:1009/login', { email, password });
      if (response.data.token) {
        Cookies.set("token", response.data.token);
        navigate("/index");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <>
      <center> <br /><br />
        <h1>Login</h1> <br />
        <br />
        <br />
        <form onSubmit={handleAdd}>
          <input type="email" placeholder="Enter Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required /> <br />
          <br />
          <input type="password" placeholder="Enter Password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required /> <br />
          <br />
          <button id="bt1" type="submit">
            Login
          </button>
        </form> <br />
        <p className="p1">You've First time visit, click <Link to={"/"}>Register</Link></p>
      </center>
    </>
  );
}