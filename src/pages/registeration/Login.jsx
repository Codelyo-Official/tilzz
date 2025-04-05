import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./login.css";
import { useAuth } from "../../contexts/AuthProvider";
import { Link } from 'react-router-dom';



const LoginSignup = () => {

  console.log('login invoked')
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const [errors, setErrors] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };

    //send an api req to login and get access token from backend

    // axiosClient
    //   .post("/login", payload)
    //   .then(({ data }) => {
    //     setUser(data.user);
    //     setToken(data.token);
    //   })
    //   .catch((err) => {
    //     const response = err.response;
    //     if (response && response.status === 422) {
    //       if (response.data.errors) {
    //         setErrors(response.data.errors);
    //       } else {
    //         setErrors({
    //           email: [response.data.message],
    //         });
    //       }
    //     } else {
    //       setErrors("User name or password is incorrect");
    //     }
    //   });

    // using dummy token for now
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lIiwiZXhwIjoxNzE3MDE0MDAwfQ.12345";
    const response = await login(token);

    if(response.success){
      navigate("/dashboard");
    }
  };

  const toggleLoginSignup = () => {
    navigate("/register");
  };

  return (
    <div className="login-signup-container" style={{position:"relative"}}>
      <div style={{position:"absolute", top:"0px", left:"0px", width:"100%", height:"100px", textAlign:"center"}}><Link to={"/"} ><h2 className="Logo" style={{position:"absolute", left:"50%", transform:"translateX(-50%)"}}>Narrato</h2></Link></div>
      <div
        className={`form-container`}
        style={{marginTop:"120px"}}
      >
        <h2 style={{fontSize:"16px", color:"black"}}>{"Login"}</h2>
        <form onSubmit={handleLoginSubmit} >
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
          {errors && (
            <p style={{ color: "red" }}>
            {errors}
            </p>
          )}
          <button type="submit" style={{fontSize:"14px"}}>{"Login"}</button>
        </form>
        <div className="toggle-link" onClick={toggleLoginSignup} style={{fontSize:"12px", color:"black"}}>
          {"Create New Account"}
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

export default LoginSignup;
