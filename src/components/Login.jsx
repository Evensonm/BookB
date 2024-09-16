/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Login({ setToken, token }) {
  const navigate = useNavigate({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${import.meta.env.VITE_BOOK_URL}/api/users/login`, formData)
        .then((response) => {
          console.log(response.data.message);
          if (response.data.message) {
            console.log(response.data.token);
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));


    } catch (err) {
      console.log(err);
    }

  };
  if (token) {
    navigate("/");
  }
  return (
    <div>
      <h1>Please Login </h1>
      <Link to="/Books.jsx">Home</Link>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="text" name="email" onChange={handleInput} />
        </label>
        <label>
          Password:
          <input type="text" name="password" onChange={handleInput} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login
