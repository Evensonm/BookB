// /* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. 
// You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function SingleBook(token) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  useEffect(() => {
    axios(`${import.meta.env.VITE_BOOK_URL}/books/${id}`)
      .then((response) => {
        console.log(response.data.book);
        setBook(response.data.book);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit =(e)=> {
    e.preventDefault();
    axios
      .patch(`${import.meta.env.VITE_BOOK_URL}/books/${id}`, 
        {available: false},
        {headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }})
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  console.log(book);

  const available = book?.available;

  console.log(available);

  return (
    <div>
      <h2>Book Buddy</h2>
      <Link to="/Books.jsx">Home</Link>
      <p>
        Title: {book?.title}
        <div className="book-card-img">
          <img src={book?.coverimage} />
        </div>
        <p>
        Description: {book?.description}
        </p>
       

      </p>
      {available ? (<button onClick={handleSubmit}>Checkout Book</button>) : (<p>Book Not Available</p>)}
    </div>
  )
}

export default SingleBook
