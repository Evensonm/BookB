// /* TODO - add your code to create a functional React component that renders account details for a logged in user. 
// Fetch the account data from the provided API. You may consider conditionally rendering a message 
// for other users that prompts them to log in or create an account.  */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams} from "react-router-dom";
import "./Books.css";

function Account({token}) {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
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
        axios(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations`, 
          {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }})
          .then((data) => {
                
            setUserRes(data.data.reservation);
        })
        .catch((err) => console.log(err));

}, [id]);
console.log(userRes); 

  const [books, setBooks] = useState([]);
  useEffect(() => {
      axios(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books`)
          .then((data) => {
              
              setBooks(data.data.books);
          })
          .catch((err) => console.log(err));

  }, []);

  console.log(books);


  
async function handleSubmit(title) {

  function findBytitle(list, title) {
    return list.find((obj) => obj.title === title).id
  };
   console.log(title);
   const returnId = findBytitle(books, title);
   console.log(returnId);

   axios
    .patch(`${import.meta.env.VITE_BOOK_URL}/api/books/${returnId}`,
      { available: true },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => console.log(response))
    .catch((err) => {
      console.error("Error details:", err);
      if (err.response) {
        console.error('Response error:', err.response.data);
      } else if (err.request) {
        console.error('Request error:', err.request);
      } else {
        console.error('Axios error:', err.message);
      }
    });
    
};
  
  return (
    <div>
      <h1>Account Information</h1>
      <Link to="/Books.jsx">Home</Link>
      <p>Name: {userData.lastname}, {userData.firstname}</p>
      <p>Email: {userData.email}</p>
      <br></br>
      <p>Books Checked Out</p>
      <p className='page'>
      <div className="main-layout">
            {userRes.map(function (data) {
                return (
                    <div className="book-card" key={data}>
                        Title: {data.title}
                        <div className="book-card-img">
                            <img src={data.coverimage} />
                        </div>
                        Author: {data.author}
                        <button onClick={() => handleSubmit(data.title)}>
                            Return Book
                        </button>
                    </div>
                    
                    )})};
        </div>
      </p>
      
    </div>
  )
}

export default Account
