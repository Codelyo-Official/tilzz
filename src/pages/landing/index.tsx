import { Link } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi";
import HomeNavbar from "../../components/HomeNavbar";
import Footer from "../../components/Footer"
import "./home.css";
import { ApiError } from "../../types/apiError";
import axios from "axios";
import { story } from "../../types/story";
import React from 'react';
import { get } from 'react-hook-form';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function Home() {

    const [dataStories, setDataStories] = React.useState<story[]>([]);
    const [story1, setStory1] = React.useState<story | null>(null);
    const [story2, setStory2] = React.useState<story | null>(null);


    const getPublicStories = async () => {
        try {
            const publicStoriesApi_response = await axios.get(`${API_BASE_URL}/api/stories/public/stories/`);
            console.log(publicStoriesApi_response);
            setDataStories(publicStoriesApi_response.data);

        } catch (err: any) {
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
            }
        }
    }

    React.useEffect(() => {
        getPublicStories()
    }, [])

    const getTwoUniqueIndexes = (array:any)=> {
        const indexes = [...array.keys()]; // [0, 1, 2, ...]
        // Shuffle using Fisher–Yates
        for (let i = indexes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
        }
        return indexes; // Return first two shuffled indexes
      }

    React.useEffect(() => {
        if (dataStories.length > 0) {
            // 1. Pick the first random index:
            let indices = getTwoUniqueIndexes(dataStories)
            setStory1(dataStories[indices[0]]);
            if (indices.length > 1) {
                setStory2(dataStories[indices[1]]);
            }
        }
    }, [dataStories])

    console.log('home loaded')
    return (
        <div className="home-banner">
            <HomeNavbar />
            <div className="main-banner">
                <div className="main-banner-top-sec">
                    <h1 className="main-banner-top-sec-h">STORIES</h1>
                    <Link to="/stories-feed"> <button className="main-banner-top-sec-btn">Read Our Stories <FiArrowRightCircle style={{ display: "inline", marginBottom: "2px", marginLeft: "5px" }} /></button></Link>
                </div>
                <div className="main-banner-grid-imgs">
                    <div className="box left0">
                        <Link to="/stories-feed" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }}></Link>
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

                        <Link to="/stories-feed" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }}></Link>

                    </div>
                    <div className="box right0">
                        {/* <p className="center0toptitle"><span>Category</span> . Fiction</p> */}
                        <div className="center0top">
                            <p className="center0toptitle1"> {story1 !== null ? (<><><span>by</span> . {story1.creator_username}</></>) : (<><span>by</span> . john_123</>)}</p>
                            <p style={{ marginTop: "16px" }}>   {story1 !== null ? (<>{story1.title}</>) : (<>Whispers of the Forgotten Future</>)}</p>
                            <p className="center0toptitle1" style={{ fontSize: "12px", fontWeight: "bold", marginTop: "14px" }}>View the most popular stories <FiArrowRightCircle style={{ display: "inline" }} />
                            </p>
                        </div>
                        <Link to="/stories-feed" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }}></Link>

                    </div>
                    <div className="box center1">
                        <video autoPlay loop muted playsInline>
                            <source src="/videos/try.webm" type="video/webm" />
                        </video>
                        <p className="center0toptitle" style={{ color: "white" }}><span>Narrato</span> . innovative dashboard</p>
                        <div className="center0top" style={{ top: "auto", bottom: "30px" }}>
                            <p className="video-descp-banner">Narrato . Collaborative Story Telling</p>
                            <p className="center0topdescp" style={{ color: "white" }}>Welcome to a thriving community of writers and readers.</p>
                        </div>
                        <Link to="/stories-feed" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }}></Link>

                    </div>
                    <div className="box right1">
                        {/* <div className="right1-categories">
                            <button>Life Style</button>
                            <button style={{ backgroundColor: "#FFE665" }}>Fiction</button>
                            <button>Diet</button>
                            <button>Diseases</button>
                            <button>Medical Knowledge</button>
                            <button>Fantasy</button>
                            <button>Thriller</button>
                            <Link to="/stories-feed" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }}></Link>

                        </div> */}
                        {/* <div className="right1-bottom">
                            <div className="icon">
                                <a href="" className="iconBox"><span className="material-symbols-outlined">arrow_outward</span></a>
                            </div>
                        </div> */}
                        <div className="center0top">
                            <p className="center0toptitle1"> {story2 !== null ? (<><><span>by</span> . {story2.creator_username}</></>) : (<><span>by</span> . tenma.levi</>)}</p>
                            <p style={{ marginTop: "16px" }}>   {story2 !== null ? (<>{story2.title}</>) : (<>Deep Sea Secrets by Tenma Levi</>)}</p>
                            <p className="center0toptitle1" style={{ fontSize: "12px", fontWeight: "bold", marginTop: "14px" }}>Read this and many more interesting stories <FiArrowRightCircle style={{ display: "inline" }} />
                            </p>
                        </div>
                        <Link to="/stories-feed" style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }}></Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
