import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../contexts/AuthProvider";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User } from "../../../types/user";
import { ApiError } from "../../../types/apiError";
import "../login.css";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {

  const navigate = useNavigate();

  // Define state types
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { login } = useAuth();
  const [errors, setErrors] = useState<string | null>(null);  // Typed state for errors

  const handleSignupSubmit = async (e: React.FormEvent) => {  // Event type
    e.preventDefault();

    // Create a new AbortController instance
    const controller = new AbortController();
    const { signal } = controller;
    // Track the request state
    if (isRequestInProgress) {
      controller.abort(); // Abort the ongoing request if one is already in progress
    }

    setIsRequestInProgress(true); // Indicate the request is in progress

    if (password !== confirmPassword) {
      setErrors("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setErrors("Password must be at least 8 characters long.");
      return;
    }
    setErrors("");

    const payload = {
      // first_name: firstName,
      // last_name: lastName,
      email: email,
      username: username,
      password: password,
      password_confirmation
        : confirmPassword,
    };

    try {
      const signup_api_response: any = await axios.post(`${API_BASE_URL}/api/accounts/register/`, payload, { signal });

      console.log(signup_api_response)
      const token = signup_api_response.data.token;
      let p_temp = undefined;
      if (signup_api_response.data.user.profile !== null) {
        p_temp = signup_api_response.data.user.profile.profile_picture;
      }
      let user_temp: User = {
        id: signup_api_response.data.user.id,
        "email": signup_api_response.data.user.email,
        // "first_name": signup_api_response.data.user.first_name,
        // "last_name": signup_api_response.data.user.last_name,
        "profile_picture": p_temp,
        // "role": signup_api_response.data.user.role,
        "username": signup_api_response.data.user.username
      };

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
        const errorMessage = apiError.response.data?.username[0] || 'Something went wrong on the server!';
        setErrors(errorMessage);
      }
    } finally {
      setIsRequestInProgress(false); // Reset request state after completion
    }
  };

  const toggleLoginSignup = () => {
    navigate("/login");
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

      <div className={`form-container form-container-expanded`} style={{ marginTop: "120px" }}>
        <h2 style={{ fontSize: "16px", color: "black" }}>{"Create New Account"}</h2>
        <form onSubmit={handleSignupSubmit}>
          {/* <input
            type="text"
            placeholder="First Name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          /> */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors && <p style={{ color: "red" }}>{errors}</p>}
          <button type="submit" style={{ fontSize: "14px" }}>
            {"Create Account"}
          </button>
        </form>
        <div
          className="toggle-link"
          onClick={toggleLoginSignup}
          style={{ fontSize: "12px", color: "black" }}
        >
          {"Already have an account? Login"}
        </div>
      </div>
    </div>
  );
};

export default Register;
