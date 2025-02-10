import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi";
import "./home.css";

function Home() {

    return (
        <div className="home-banner">
            <div className="top-par-home">
                <h2 className="Logo">Narrato</h2>
                <div className="home-navbar">
                    <button>Home</button>
                    <div className="dot"></div>
                    <button>Stories</button>
                    <div className="dot"></div>
                    <button>Contact</button>
                    <div className="dot"></div>
                    <button>About Us</button>
                </div>
                <Link to={"/login"} className="login-btn-home">
                    Login
                </Link>
            </div>
            <div className="main-banner">
                <div className="main-banner-top-sec">
                    <h1 className="main-banner-top-sec-h">STORIES</h1>
                    <button className="main-banner-top-sec-btn">Read Our Stories <FiArrowRightCircle style={{display:"inline", marginBottom:"2px", marginLeft:"5px"}}/></button>
                </div>
                <div className="main-banner-grid-imgs">
                    <div className="box left0">
                        <div className="left0-descp">
                            <p>INTRIGUING IDEAS</p>
                            <p>COLLABORATIVE STORIES</p>
                        </div>
                    </div>
                    <div className="box center0">
                        <p className="center0toptitle"><span>Narrato</span> . Collaborative Stories</p>
                        <div className="center0top">
                            <p>READY, SET, GO!</p>
                            <p>CREATE INTERESTING STORIES NOW</p>
                            <p className="center0topdescp">Join a community of storytellers and shape the future of interactive storytelling!</p>
                        </div>
                        <div className="link-go">
                                <button>Popular Stories</button>
                        </div>
                        <div className="icon">
                            <a href="" className="iconBox"><span className="material-symbols-outlined">arrow_outward</span></a>
                        </div>
                    </div>
                    <div className="box right0">
                    <p className="center0toptitle"><span>Category</span> . Fiction</p>
                    <div className="center0top">
                         <p className="center0toptitle1"><span>Hot</span> . 12 Feb</p>
                            <p style={{marginTop:"16px"}}>Whispers of the Forgotten Future</p>
                            <p className="center0toptitle1" style={{fontSize:"12px",fontWeight:"bold", marginTop:"14px"}}>View the most popular story for fiction readers <FiArrowRightCircle style={{display:"inline"}}/>
                            </p>
                        </div>
                    </div>
                    <div className="box center1">
                    <video autoPlay loop muted playsInline>
                            <source src="/videos/try2.mp4" type="video/mp4"/>
                        </video>
                    <p className="center0toptitle" style={{color:"white"}}><span>Narrato</span> . innovative dashboard</p>
                    <p className="video-descp-banner">Effortlessly create and manage your stories, track episodes, and engage with a thriving community of writers and readers.</p>

                    </div>
                    <div className="box right1">
                        <div className="right1-categories">
                            <button>Life Style</button>
                            <button style={{backgroundColor:"#FFE665"}}>Fiction</button>
                            <button>Diet</button>
                            <button>Diseases</button>
                            <button>Medical Knowledge</button>
                            <button>Fantasy</button>
                            <button>Thriller</button>
                        </div>
                        <div className="right1-bottom">
                            <button>View All Categories</button>
                            <div className="icon">
                                <a href="" className="iconBox"><span className="material-symbols-outlined">arrow_outward</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
