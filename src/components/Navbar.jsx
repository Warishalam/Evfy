import React from 'react'
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div id="Login_link">
        <Link to="/">Login</Link>
        <Link to="/book">Book</Link>
    </div>
  )
}

export default Navbar