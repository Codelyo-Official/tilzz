import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../../contexts/AuthProvider";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {User} from "../../../types/user";
import "../login.css";

// types/UserSignup.ts
type SignupData = {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

type SignupResponse = {
  id: number;        // assuming the server returns the new user's id
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  // add more fields if the API returns more
}

const API_BASE_URL = process.env.BASE_URL || 'http://localhost:8000'; // load from env

// Define types for the form input values
const Register = () => {
  const navigate = useNavigate();

  // Define state types
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

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      password: password,
      password2: confirmPassword,
    };
    console.log(payload);

    // Dummy token (replace with actual API call later)
    const response1 = await axios.post(`${API_BASE_URL}/api/users/signup/`, payload);
    const token = response1.data.token;
    let user_temp: User = {
      "email": response1.data.user.email,
      "first_name": response1.data.user.first_name,
      "last_name": response1.data.user.last_name,
      "profile_picture": response1.data.user.profile_picture,
      "role": response1.data.user.role,
      "username": response1.data.user.username
    } = response1.data.user;
    console.log(response1)
    console.log(token)
    const response = await login(token, user_temp);
    if (response.success) {
      navigate("/dashboard");
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
          <input
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
          />
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
        {/* <div className="social-login">
          <p>Or login with:</p>
          <div className="social-icons">
            <FaFacebook
              style={{ color: "#15A0F9" }}
              className="facebook-icon"
              onClick={() => console.log("Facebook Login")}
            />
            <FcGoogle
              className="google-icon"
              onClick={() => console.log("Google Login")}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Register;
