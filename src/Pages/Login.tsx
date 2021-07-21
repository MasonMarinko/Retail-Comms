import React, { useState, useEffect } from "react";
import axios from "axios";
import UserService from "../Services/userService";
import useUserStore from "../Stores/userStore";
import "./Login.css"

export const Login: React.FC = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const userStore = useUserStore()
  
  useEffect(() => {
    console.log("token is " + userStore.token)
    console.log("payload is " , userStore.payload)
  },[userStore.token])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      userStore.setToken(token)
    }
  }, [])

 const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
   const loginData = {
     username: formState.username,
     password: formState.password
   }

   UserService.login(loginData)
   .then((postResponse: any) => {
     e.preventDefault();
     userStore.setToken(postResponse.token)
     localStorage.setItem("token",postResponse.token)
     window.location.assign('/');
   })
   .catch((err: any) => {
     alert(err.response.data.message);
   });
 }
 
  const handleChange = (name:keyof typeof formState, e:React.ChangeEvent<HTMLInputElement>) => {
    const data = {...formState};
    data[name] = e.target.value
    setFormState(data)
  }

  return (
    <div className="container my-1">
      {/* <Link to="/signup">
        ← Go to Signup
      </Link> */}

      <h2>Login</h2>
      <form>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            type="username"
            id="username"
            className="login-boxes"
            onChange={(e) => handleChange("username", e)}
          />
        </div>
        <div className="pw-contain">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            className = "login-boxes"
            onChange={(e) => handleChange("password", e)}
          />
        </div>
        {/* {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null} */}
        <div className="flex-row flex-end">
          <button
          onClick={(e: any) => handleFormSubmit(e)} 
          type="submit"
          >
          Submit
          </button>
        </div>
      </form>
    </div>
  );
};
