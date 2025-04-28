import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../../contexts/AuthProvider";
import { Link } from 'react-router-dom';
import {User} from "../../../types/user";

import "../login.css";

// Define types for form refs
const LoginSignup = () => {
  const navigate = useNavigate();

  const inputEmailRef = useRef<HTMLInputElement | null>(null);  // Typed ref
  const inputPasswordRef = useRef<HTMLInputElement | null>(null);  // Typed ref

  const { login } = useAuth();
  const [errors, setErrors] = useState<string | null>(null);  // Typed state

  const handleLoginSubmit = async (e: React.FormEvent) => {  // Event type
    e.preventDefault();
    
    // Ensure refs are non-null before accessing
    const payload = {
      email: inputEmailRef.current?.value,
      password: inputPasswordRef.current?.value,
    };

    // Dummy token (replace with your actual API request later)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lIiwiZXhwIjoxNzE3MDE0MDAwfQ.12345";
    //const response = login(token);
    //response.success
    if(true){
      navigate("/dashboard");
    } else {
      setErrors("Login failed, please try again.");
    }
  };

  const toggleLoginSignup = () => {
    navigate("/register");
  };

  return (
    <div className="login-signup-container" style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100px",
          textAlign: "center",
        }}
      >
        <Link to={"/"}>
          <h2
            className="Logo"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Narrato
          </h2>
        </Link>
      </div>

      <div className={`form-container`} style={{ marginTop: "120px" }}>
        <h2 style={{ fontSize: "16px", color: "black" }}>{"Login"}</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            ref={inputEmailRef}
            required
            onChange={(e) => {
              if (inputEmailRef.current) {
                inputEmailRef.current.value = e.target.value;
              }
            }}
          />
          <input
            type="password"
            placeholder="Password"
            ref={inputPasswordRef}
            required
            onChange={(e) => {
              if (inputPasswordRef.current) {
                inputPasswordRef.current.value = e.target.value;
              }
            }}
          />
          {errors && <p style={{ color: "red" }}>{errors}</p>}
          <button type="submit" style={{ fontSize: "14px" }}>
            {"Login"}
          </button>
        </form>
        <div
          className="toggle-link"
          onClick={toggleLoginSignup}
          style={{ fontSize: "12px", color: "black" }}
        >
          {"Create an Account"}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
