import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import "./homenavbar.css";

function HomeNavbar() {

    const navigate = useNavigate();
    const { user } = useAuth();
    console.log(user)


    return (
        <div className="top-par-home">
            <Link to={"/"} >
                <h2 className="Logo1">
                    Narrato
                </h2>
            </Link>
            <div className="home-navbar">
                <button onClick={() => {
                    navigate("/")
                }}>Home</button>
                <div className="dot"></div>
                <button onClick={() => {
                    navigate("/stories-feed")
                }}>Stories</button>
                <div className="dot"></div>
                <button onClick={() => {
                    navigate("/contact")
                }}>Contact</button>
                <div className="dot"></div>
                <button onClick={() => {
                    navigate("/about")
                }}>About Us</button>
            </div>
            {user?.username && user.username === "none" && (
                <>
                    <Link to={"/login"} className="login-btn-home">
                        Login
                    </Link>
                    <Link to={"/register"} className="reg-btn-home">
                        Register
                    </Link>
                </>
            )}

            {user?.username && user.username !== "none" && (
                <>
                    <Link to={"/login"} className="login-btn-home" style={{borderWidth:"1px", borderRadius: "26px 26px 26px 26px"}}>
                        Dashboard
                    </Link>
                </>
            )}

        </div>
    );
}

export default HomeNavbar;
