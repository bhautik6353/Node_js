import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdd = async (event) => {
    event.preventDefault();
    const data = { name, email, password };

    try {
      const response = await axios.post("http://localhost:1009/register", data);
      navigate("/index");
    } catch (error) {
      setError(error.response?.data?.message || "There was an error registering!");
      console.error("There was an error registering!", error);
    }
  };

  return (
    <>
      <center>
        <h1>Register</h1> <br />
        <br />
        <br />
        <form onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Enter Name"
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />{" "}
          <br />
          <br />
          <input
            type="email"
            placeholder="Enter Email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <br />
          <button id="bt1" type="submit">
            Register
          </button>
        </form>{" "}
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p className="p1">
          You've already registered, click <Link to={"/login"}>Login</Link>
        </p>
      </center>
    </>
  );
}