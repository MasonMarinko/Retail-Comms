import React from "react";
// import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    // if (Auth.loggedIn()) {
    //   return (
    //     <ul className="flex-row">
    //       <li className="mx-1">
    //         {/* this is not using the Link component to logout or user and then refresh the application to the start */}
    //         <a href="/" onClick={() => Auth.logout()}>
    //           Logout
    //         </a>
    //       </li>
    //       <li className="mx-1">
    //         <a href="/profile">
    //           Profile
    //         </a>
    //       </li>
    //     </ul>
    //   );
    // } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/Signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/Login">Login</Link>
          </li>
          {/* <li className="mx-1">
            <Link to="/admin">
            Admin
            </Link>
          </li> */}
        </ul>
      );
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
