import React, { useState, Component } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import UserService from "../Services/userService";
import Auth from "../utils/auth";

export const Signup: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    department: "",
  });
  const [submitButton, setActiveButton] = useState(true);

  const onFieldChange = (
    name: keyof typeof form,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = { ...form };
    data[name] = e.target.value;
    const firstNameField = data.firstName.length;
    const lastNameField = data.lastName.length;
    const departmentField = data.department.length;
    if (firstNameField > 1 && lastNameField > 1 && departmentField > 1) {
      setActiveButton(false);
    } else {
      setActiveButton(true);
    }
    setForm(data);
  };

  // const departmentValue = (e:any) => {
  //   console.log(typeof(e.value))
  // }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const userData = {
      firstName: form.firstName,
      lastName: form.lastName,
      password: form.password,
      username: form.username,
      department: form.department,
    };

    UserService.create(userData)
      .then((postResponse: any) => {
        e.preventDefault();
        alert("Account Created");
        console.log(postResponse);

      })
      .catch((err: any) => {
        alert(err.response.data.message);
      });
  };

  const options = [
    { value: "sales", label: "Sales" },
    { value: "morningMerch", label: "Morning Merch" },
    { value: "nightMerch", label: "Night Merch" },
  ];

  return (
    <div className="container my-1">
      <Link to="/Login">← Go to Login</Link>

      <h2>Signup </h2>
      <form>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={(e) => onFieldChange("firstName", e)}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={(e) => onFieldChange("lastName", e)}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Username:</label>
          <input
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            onChange={(e) => onFieldChange("username", e)}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="password"
            onChange={(e) => onFieldChange("password", e)}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="department">Department:</label>
          {/* <Select
            options={options}
            name="department"
            type="department"
            id="department"
            onChange={(e) => departmentValue(e)}
          /> */}
          <input
            placeholder="Department"
            name="department"
            type="department"
            id="department"
            onChange={(e) => onFieldChange("department", e)}
          />
        </div>
        <div className="flex-row flex-end">
          <button
            value="submit"
            disabled={submitButton}
            onClick={(e: any) => onSubmit(e)}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
