import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/signup/Signup";
import PrivateRouting from "./PrivateRouting";

const Routing = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  console.log(isUserLoggedIn)
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRouting isUserLoggedIn={isUserLoggedIn}>
                <Home />
              </PrivateRouting>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;
