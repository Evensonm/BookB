import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function SingleBook({ token }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_BOOK_URL);
    axios(`${import.meta.env.VITE_BOOK_URL}/api/books/${id}`)
      .then((response) => {
        console.log(response.data.book);
        setBook(response.data.book);
      })
      .catch((err) => console.error("Error fetching book:", err));
  }, [id]);

  console.log(`${import.meta.env.VITE_BOOK_URL}/api/books/${id}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`${import.meta.env.VITE_BOOK_URL}/api/books/${id}`,
        { available: false },
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

 

  const available = book?.available;
  console.log(available);

  return (
    <div>
      <h2>Book Buddy {token}</h2>
      <Link to="/Books">Home</Link>
      <div>
        <p>Title: {book?.title}</p>
        <div className="book-card-img">
          <img src={book?.coverimage} alt="Book cover" />
        </div>
        <p>Description: {book?.description}</p>
      </div>
      {available ? (
        <button onClick={handleSubmit}>Checkout Book</button>
      ) : (
        <p>Book Not Available</p>
      )}
    </div>
  );
}

export default SingleBook;