import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../contexts/AuthProvider";
import { Link } from 'react-router-dom';
import { User } from "../../../types/user";
import { ApiError } from "../../../types/apiError";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import "../login.css";
import { ToastContainer, toast } from 'react-toastify';


const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const LoginSignup = () => {
  const navigate = useNavigate();

    const notify = (msg:string) => toast(msg);
  

  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const inputUserRef = useRef<HTMLInputElement | null>(null);  // Typed ref
  const inputEmailRef = useRef<HTMLInputElement | null>(null);  // Typed ref
  const [email, setEmail] = React.useState<string | undefined>(undefined);
  const inputPasswordRef = useRef<HTMLInputElement | null>(null);  // Typed ref
  const inputPasswordRef1 = useRef<HTMLInputElement | null>(null);  // Typed ref
  const codeRef = useRef<HTMLInputElement | null>(null);  // Typed ref

  const { login } = useAuth();
  const [errors, setErrors] = useState<string | null>(null);  // Typed state
  const [loading, setLoading] = useState<boolean>(false);
  const [loginState, setLoginState] = useState<number>(0)

  const handleLoginSubmit = async (e: React.FormEvent) => {  // Event type
    e.preventDefault();

    // const controller = new AbortController();
    // const { signal } = controller;
    // if (isRequestInProgress) {
    //   controller.abort(); 
    // }
    // setIsRequestInProgress(true); 

    if (loginState === 0) {
      const payload = {
        username: inputUserRef.current?.value,
        password: inputPasswordRef.current?.value,
      };

      try {
        setLoading(true);
        const login_api_response = await axios.post(`${API_BASE_URL}/api/accounts/login/`, payload);
        console.log(login_api_response);
        if (login_api_response.data?.token) {
          const token = login_api_response.data.token;
          let p_temp = undefined;
          if (login_api_response.data.user.profile !== null) {
            p_temp = login_api_response.data.user.profile.profile_picture;
          }
          let user_temp: User = {
            id: login_api_response.data.user.id,
            "email": login_api_response.data.user.email,
            // "first_name": login_api_response.data.user.first_name,
            // "last_name": login_api_response.data.user.last_name,
            "profile_picture": p_temp,
            // "role": login_api_response.data.user.role,
            "username": login_api_response.data.user.username
          };
          setLoading(false);

          console.log("from above:", user_temp)

          const response = login(token, user_temp);
          if (response.success) {
            navigate("/dashboard");
          } else {
            setErrors('login failed, please try again!');
          }
        } else {
          setLoading(false);
          setErrors('something went wrong!');
        }
      } catch (err: any) {
        setLoading(false);
        console.log(err)
        const apiError = err as ApiError;
        setErrors(apiError.message);
        if (apiError.response) {
          const status = apiError.response.status;
          const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
          setErrors(errorMessage);
        }
      } finally {
        //setIsRequestInProgress(false); 
      }
    } else if (loginState === 1) {
      // /api/accounts/password-reset/

      const payload = {
        email: inputEmailRef.current?.value,
      };

      try {
        setLoading(true);
        const sendCodeEmail_api_response = await axios.post(`${API_BASE_URL}/api/accounts/password-reset/`, payload);
        console.log(sendCodeEmail_api_response);
        setEmail(inputEmailRef.current?.value)
        setLoading(false);
        setLoginState(2)
        notify(`reset code sent to ${inputEmailRef.current?.value}`)

      } catch (err: any) {
        setLoading(false);
        console.log(err)
        const apiError = err as ApiError;
        setErrors(apiError.message);
        if (apiError.response) {
          const status = apiError.response.status;
          const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
          setErrors(errorMessage);
        }
      } finally {
        //setIsRequestInProgress(false); 
      }
    } else if (loginState === 2) {

      ///api/accounts/verify-reset-code/

      console.log(email)
      console.log(codeRef.current?.value)
      console.log(inputPasswordRef1.current?.value)

      const payload = {
        "email": email,
        "code": codeRef.current?.value,
        "new_password": inputPasswordRef1.current?.value
      }

      try {
        setLoading(true);
        const verify_reset_code_api_response = await axios.post(`${API_BASE_URL}/api/accounts/reset-password/`, payload);
        console.log(verify_reset_code_api_response);

        notify("password reset successsfully")

        setLoading(false);

      } catch (err: any) {
        setLoading(false);
        console.log(err)
        const apiError = err as ApiError;
        setErrors(apiError.message);
        if (apiError.response) {
          const status = apiError.response.status;
          const errorMessage = apiError.response.data?.error || 'Something went wrong on the server!';
          setErrors(errorMessage);
        }
      } finally {
        //setIsRequestInProgress(false); 
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
        <h2 style={{ fontSize: "16px", color: "black" }}>{loginState === 0 ? "Login" : loginState === 1 ? "Send Verification code to your email" : "Verify Update Password"}</h2>
        <form onSubmit={handleLoginSubmit}>

          {loginState === 0 && (
            <>
              <input
                type="text"
                placeholder="username"
                ref={inputUserRef}
                required
                onChange={(e) => {
                  if (inputUserRef.current) {
                    inputUserRef.current.value = e.target.value;
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
            </>
          )}

          {loginState === 1 && (
            <>
              <input
                type="email"
                placeholder="example@email.com"
                ref={inputEmailRef}
                required
                onChange={(e) => {
                  if (inputEmailRef.current) {
                    inputEmailRef.current.value = e.target.value;
                  }
                }}
              />
            </>
          )}

          {loginState === 2 && (
            <>
              <input
                type="text"
                placeholder="enter code"
                ref={codeRef}
                required
                onChange={(e) => {
                  if (codeRef.current) {
                    codeRef.current.value = e.target.value;
                  }
                }}
              />
              <input
                type="password"
                placeholder="Enter New Password"
                ref={inputPasswordRef1}
                required
                onChange={(e) => {
                  if (inputPasswordRef1.current) {
                    inputPasswordRef1.current.value = e.target.value;
                  }
                }}
              />
            </>
          )}

          {errors && <p className="errors">{errors}</p>}

          {!loading ? (
            <button type="submit" style={{ fontSize: "14px" }}>
              {loginState === 0 ? "Login" : loginState === 1 ? "Send Code" : "Submit"}
            </button>) : (
            <div style={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Spinner animation="grow" role="status" style={{ color: "blue", fontSize: "20px", background: "#ACA6FF" }}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}

        </form>
        <div
          className="toggle-link"
          onClick={toggleLoginSignup}
          style={{ fontSize: "12px", color: "black" }}
        >
          {"Create an Account"}
        </div>
        <div
          className="toggle-link"
          onClick={() => {
            if (loginState === 0)
              setLoginState(1)
            else
              setLoginState(0)
          }}
          style={{ fontSize: "12px", color: "black", marginTop: "5px" }}
        >
          {loginState === 0 ? "forgot your password?" : "back to login"}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default LoginSignup;
