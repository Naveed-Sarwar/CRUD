import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../store/AuthSlice";
import "./Signup.css";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(data));

    console.log("data", data);
  };

  return (
    <div className="signup">
      <div>
        <h1 className="signup-heading">Signup</h1>
        {/* <label htmlFor="firstName">First Name:</label> */}
        <input
          type="text"
          id="firstName"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        {/* <label htmlFor="lastName">Last Name:</label> */}
        <input
          type="text"
          id="lastName"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        {/* <label htmlFor="email">Email:</label> */}
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        {/* <label htmlFor="password">Password:</label> */}
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} className="submit-button" type="submit">
        Submit
      </button>
      <p>Already Have an account please 
        <Link to={"/login"}>Login</Link></p>
    </div>
  );
};

export default Signup;
