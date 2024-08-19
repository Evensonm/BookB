// /* TODO - add your code to create a functional React component that renders account details for a logged in user. 
// Fetch the account data from the provided API. You may consider conditionally rendering a message 
// for other users that prompts them to log in or create an account.  */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Account({token}) {
  const [userData, setUserData] = useState([]);
    useEffect(() => {
        axios
        .get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me`, 
          {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }}
        )
        .then((data) => {
          
          setUserData(data.data);
               
            })
            .catch((err) => console.log(err));

    }, []);
    console.log(userData);
  
    const [userRes, setUserRes] = useState([]);
    useEffect(() => {
        axios
        .get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations`, 
          {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }}
        )
        console.log(userRes);
        
           

    }, []);
    
  
  

  return (
    <div>
      <h1>Account Information </h1>
      <Link to="/Books.jsx">Home</Link>
      <p>Name: {userData.lastname}, {userData.firstname}</p>
      <p>Email: {userData.email}</p>
      <br></br>
      <p>Books Checked Out</p>
      
    </div>
  )
}

export default Account
