// /* TODO - add your code to create a functional React component that displays all 
// of the available books in the library's catalog. Fetch the book data from the provided API. 
// Users should be able to click on an individual book to navigate to the SingleBook component 
// and view its details. */

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Books.css";

function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios(`${import.meta.env.VITE_BOOK_URL}api/books`)
            .then((data) => {
                const allBooks = data.data
                setBooks(allBooks);
            })
            .catch((err) => console.log(err));

    }, []);
    console.log(books);

    const navigate = useNavigate();

  


    return (<div className="page">
        
        
        <div className="main-layout">
            {books?.map(function (data) {
                return (
                    <div className="book-card" key={data}>
                        Title: {data.title}
                        <div className="book-card-img">
                            <img src={data.coverimage} />
                        </div>
                        Author: {data.author}
                        <button onClick={() => navigate(`/books/${data.id}`)}>
                            See Details
                        </button>
                    </div>




                )})};



        </div>
    </div>
    )
}

export default Books





  
 