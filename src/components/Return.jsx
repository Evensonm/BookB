import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Books.css";

function Return()  {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios(`${import.meta.env.VITE_BOOK_URL}/api/books`)
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

  


    return (<div className="page">
        
        
        <div className="main-layout">
            {books.map(function (data) {
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
    </div>
    )
} }
 

export default Return
