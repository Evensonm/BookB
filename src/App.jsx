import Account from "./components/Account";
import Books from "./components/Books";
import Login from "./components/Login";
import Navigations from "./components/Navigations";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook";
import Return from "./components/Return";
import { useState, useEffect } from 'react';
import bookLogo from './assets/books.png';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    console.log(token);
    if (localToken) {
      setToken(localToken);
    }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  }
  


  return (
    <>
      <h1><img id='logo-image' src={bookLogo} />Welcome to Book Buddy </h1>
      <div className="navLinks">
        <Link to="/login">Login</Link>
        <Link to="/account">My Account Information</Link>
        <Link to="/register">Register to Checkout Books</Link>
        <Link to="/return">Return Books</Link>
        <button onClick={handleLogout}>Logout</button>
      </div> 
    

      <Routes>
        <Route path="/navigations" element={<Navigations/>} />;
        <Route path="/books" element={<Books />} />;
        <Route path="/books/:id" element={<SingleBook token={token}/>} />;
        <Route path="/account" element={<Account token={token} />} />;
        <Route path="/login" 
          element={<Login setToken={setToken} token={token} />} />
        <Route path="/register" element={<Register />} />;
        <Route path="/return" element={<Return token={token} />} />;
        <Route path="*" element={<Books />} />;



      </Routes>


    </>
  )
}

export default App


/* <p>Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading.</p>

     <p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

     <p>Don't forget to set up React Router to navigate between the different views of your single page application!</p> */