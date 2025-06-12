import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./homenavbar.css";

function HomeNavbar() {

    const navigate = useNavigate();

    return (
            <div className="top-par-home">
                <Link to={"/"} >
                    <h2 className="Logo1">
                        Narrato
                    </h2>
                </Link>
                <div className="home-navbar">
                    <button onClick={()=>{
                        navigate("/")
                    }}>Home</button>
                    <div className="dot"></div>
                    <button onClick={()=>{
                        navigate("/stories-feed")
                    }}>Stories</button>
                    <div className="dot"></div>
                    <button onClick={()=>{
                        navigate("/contact")
                    }}>Contact</button>
                    <div className="dot"></div>
                    <button  onClick={()=>{
                        navigate("/about")
                    }}>About Us</button>
                </div>
                <Link to={"/login"} className="login-btn-home">
                    Login
                </Link>
                <Link to={"/register"} className="reg-btn-home"> 
                    Register
                </Link>
            </div>
    );
}

export default HomeNavbar;
