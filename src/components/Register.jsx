/* TODO - add your code to create a functional React component that renders a registration form */

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Register() {

  const [formData, setFormData] = useState({});

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register`, formData)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            console.log(response);
          }
        })
        .catch((err) => console.log(err));

    }
    catch (err) {
      console.log(err);
    };
  }
    return (
      <div>
        <h1>Register for Book Buddy</h1>
        <Link to="/Books.jsx">Home</Link>
        <form className="registration-form" onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstname" onChange={handleInput} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastname" onChange={handleInput} />
          </label>
          <label>
            Email:
            <input type="text" name="email" onChange={handleInput} />
          </label>
          <label>

            Password:
            <input type="text" name="password" onChange={handleInput} />
          </label>
          <button>
            Submit
          </button>
        </form>
      </div>
    )
  }


export default Register
