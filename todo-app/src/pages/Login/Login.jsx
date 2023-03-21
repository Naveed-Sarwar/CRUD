import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/AuthSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      email,
      password,
    };
    console.log("data", data);
    dispatch(login({data , navigate}));

  };

  return (
    <div className="login">
      <h1 className="login-heading">Login</h1>
      <div>
        {/* <label htmlFor="username">Username:</label> */}
        <input
          type="text"
          id="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        {/* <label htmlFor="password">Password:</label> */}
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button
        className="login-submit-button"
        onClick={handleSubmit}
        type="submit"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
