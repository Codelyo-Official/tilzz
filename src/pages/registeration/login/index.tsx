import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../contexts/AuthProvider";
import { Link } from 'react-router-dom';
import {User} from "../../../types/user";
import { ApiError } from "../../../types/apiError";
import axios from "axios";
import "../login.css";


const API_BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';

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
      username: inputEmailRef.current?.value,
      password: inputPasswordRef.current?.value,
    };

    try {
      const login_api_response = await axios.post(`${API_BASE_URL}/api/users/login/`, payload);
      console.log(login_api_response);
      const token = login_api_response.data.token;
      let user_temp: User = {
        "email": login_api_response.data.user.email,
        "first_name": login_api_response.data.user.first_name,
        "last_name": login_api_response.data.user.last_name,
        "profile_picture": login_api_response.data.user.profile_picture,
        "role": login_api_response.data.user.role,
        "username": login_api_response.data.user.username
      } = login_api_response.data.user;

      const response = login(token, user_temp);
      if (response.success) {
        navigate("/dashboard");
      } else {
        setErrors('signup failed, please try again!');
      }
    } catch (err: any) {
      console.log(err)
      const apiError = err as ApiError;
      setErrors(apiError.message);
      if (apiError.response) {
        const status = apiError.response.status;
        const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
        setErrors(errorMessage);
      }
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
            type="text"
            placeholder="username"
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
