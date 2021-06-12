import React, { useState, useEffect } from "react";
import axios from "axios";
import UserService from "../Services/userService";

export const Login: React.FC = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [user, setUser] = useState()

  const getUserData = async () => {
    const grabData = await UserService.getAllUsers();
    const userData = grabData?.users;
    return userData
    // setUserLists(userData)
  };

  async function handleSubmit(e:any) {
    e.preventDefault()
    const userInfo = await getUserData()
    console.log(userInfo)
    // const user = { username, password };
    console.log("I'm working")
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container my-1">
      {/* <Link to="/signup">
        ← Go to Signup
      </Link> */}

      <h2>Login</h2>
      <form>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
          />
        </div>
        {/* {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null} */}
        <div className="flex-row flex-end">
          <button 
          onClick={(e: any) => handleSubmit(e)} 
          type="submit"
          >
          Submit
          </button>
        </div>
      </form>
    </div>
  );
};
