import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';

const Nav = () => {
    const { isLoggedIn, setIsLoggedIn, setCurrentUser } = useContext(AppContext);

    function handleClick() {
        localStorage.removeItem("token");
        setCurrentUser(null);
        setIsLoggedIn(false);
    }

    return (
      <>
        <Link to="/">Public</Link>
        <Link to="/priv">Private</Link>
        {isLoggedIn ? <button onClick={handleClick}>Logout</button> : <Link to="/login">Login</Link>}
      </>
    );
  };

export default Nav
