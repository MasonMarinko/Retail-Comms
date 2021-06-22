import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../Stores/userStore";
import jwt from "jsonwebtoken"


function Nav() {
  const userStore = useUserStore()
  const [currentToken, setCurrentToken] = useState("")

  const setToken = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      return
    } {
      setCurrentToken(token)
    }
    }

  const getUser = () => {
    const token = currentToken
    const userTokenInfo = jwt.decode(token)
    if (!userTokenInfo) {
      return
    } {
      return getFirstName(userTokenInfo)
    }
  }

  const logout = () =>  {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
  
  const getFirstName = (userInfo:any) => {
    const firstName = userInfo.firstName
    return firstName
  }

  const loggedIn = () => {
    const token = localStorage.getItem("token")
    return !!token
  }

  // console.log(userName)

  useEffect(() => {
    setToken()
  },[])
  
  function showNavigation() {
    if (loggedIn()) {
      return (
        <ul className="flex-row">
        <li>Welcome {getUser()} </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li>Welcome {getUser()} </li>
          <li className="mx-1">
            <Link to="/Signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      );
  }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          Costco Wholesale
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
