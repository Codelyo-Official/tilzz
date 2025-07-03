// import React, { useEffect } from "react";
// import { Link, NavLink } from 'react-router-dom';
// import { story } from "../../types/story";
// import { ApiError } from "../../types/apiError";
// import axios from "axios";
// import "./publicfeed.css"


// const API_BASE_URL = process.env.REACT_APP_BASE_URL;

// function PublicStoriesFeed() {


//     const [dataStories, setDataStories] = React.useState<story[]>([]);

//     const getPublicStories = async () => {
//         try {
//             const publicStoriesApi_response = await axios.get(`${API_BASE_URL}/api/stories/public/stories/`);
//             console.log(publicStoriesApi_response);
//             setDataStories(publicStoriesApi_response.data);

//         } catch (err: any) {
//             console.log(err)
//             const apiError = err as ApiError;
//             if (apiError.response) {
//                 const status = apiError.response.status;
//                 const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
//             }
//         }
//     }

//     //this use effect will only run once and get data which is required
//     useEffect(() => {
//         console.log("sending request to recieve stories")
//         getPublicStories();
//     }, []);

//     const getfirstepsiodedescp = (st: any) => {

//         if (st.versions.length > 0) {
//             if (st.versions[0].episodes.length > 0) {
//                 return st.versions[0].episodes[0].content;
//             }
//         }

//         return '';
//     }


//     return (
//         <div>
//             <div className="logged-in-user-story-div" style={{
//                 backgroundColor: "transparent",
//                 boxShadow: "none",
//             }}>
//                 <div className="story-container" >
//                     <ul className="story-box101" style={{ rowGap: "40px" }}>
//                         {dataStories.map((st, index) => {
//                             return (
//                                 <li key={index} className="storybox-public-feed">

//                                     <div className="like-dislike-div">
//                                         {/* <button 
//                                         onClick={()=>{console.log("like btn toggled")}}
//                                         style={{height:"20px",width:"20px",color:"white"}}
//                                         >
//                                             <div className="heart-icon">
//                                                 <svg
//                                                     fill="white"
//                                                     version="1.1"
//                                                     id="Layer_1"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     viewBox="0 0 511.996 511.996">
//                                                     <g>
//                                                         <g>
//                                                             <path
//                                                                 d="M467.01,64.373c-29.995-29.995-69.299-44.988-108.612-44.988c-36.779,0-73.259,13.662-102.4,39.919
//                                                         c-29.15-26.257-65.621-39.919-102.4-39.919c-39.313,0-78.618,14.993-108.612,44.988c-59.981,59.981-59.981,157.235,0,217.225
//                                                         L255.998,492.61L467.01,281.598C526.991,221.609,526.991,124.363,467.01,64.373z M448.919,263.49L255.998,456.403L63.085,263.499
//                                                         c-49.903-49.911-49.903-131.115,0-181.018c24.175-24.175,56.32-37.487,90.513-37.487c31.206,0,60.399,11.563,83.695,31.889
//                                                         l18.705,17.485l18.714-17.493c23.296-20.318,52.489-31.889,83.695-31.889c34.193,0,66.33,13.312,90.513,37.487
//                                                         C498.831,132.375,498.822,213.587,448.919,263.49z"/>
//                                                         </g>
//                                                     </g>
//                                                 </svg>
//                                             </div>
//                                         </button> */}
//                                         {/* <h4 className="like-count">{st.like_count}</h4> */}
//                                     </div>
//                                     {/* <div className="story-by-user">
//                                         <img src={st.user_avatar} /> 
//                                         <div style={{ position: "absolute", top: "2px", left: "32px" }}>{st.story_by_user}</div>
//                                     </div> */}

//                                     <img className="story-by-user-public" src={st.cover_image} alt="" />
//                                     <div className="public-story-title">
//                                         <p style={{ fontWeight: "bold" }}>{st.title}
//                                             {/* {slugStories!=="my-stories" && (
//                                                 <button
//                                                 onClick={()=>{toggleFollow(st.id)}}
//                                                 className={st.follow
//                                                 ? "following-btn"
//                                                 : "follow-btn"}>{st.follow
//                                                     ? "following"
//                                                     : "follow"}</button>
//                                             )} */}
//                                         </p>
//                                         <p className="descp-public-stories">{getfirstepsiodedescp(st)}</p>
//                                     </div>
//                                     <NavLink
//                                         className="view-btn-public-feed"
//                                         to={`/dashboard?activeTab=story-preview&storyId=${st.id}`}
//                                     >

//                                     </NavLink>
//                                 </li>
//                             )
//                         })}
//                     </ul>

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PublicStoriesFeed;

import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { story } from "../../types/story";
import { ApiError } from "../../types/apiError";
import axios from "axios";
import "./publicfeed.css"

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function PublicStoriesFeed() {
    const [dataStories, setDataStories] = useState<story[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const getPublicStories = async () => {
        try {
            const publicStoriesApi_response = await axios.get(`${API_BASE_URL}/api/stories/public/stories/`);
            setDataStories(publicStoriesApi_response.data);
        } catch (err: any) {
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
                console.error(status, errorMessage);
            }
        }
    };

    useEffect(() => {
        getPublicStories();
    }, []);

    const getFirstEpisodeDescp = (st: any) => {
        if (st.versions.length > 0 && st.versions[0].episodes.length > 0) {
            return st.versions[0].episodes[0].content;
        }
        return '';
    };

    // Filter stories by title based on searchQuery
    const filteredStories = dataStories.filter(story =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* 🔍 Search bar */}
            <div style={{
                padding: "0px", textAlign: "center"
            }}>
                <input
                    type="text"
                    placeholder="Search stories by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: "10px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        borderRadius: "32px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        width: "94%",
                        fontSize: "14px",
                        marginTop: "10px",
                        fontFamily: "'Montserrat', sans-serif !important"
                    }}
                />
            </div>

            <div className="logged-in-user-story-div" style={{ backgroundColor: "transparent", boxShadow: "none" }}>
                <div className="story-container">
                    <ul className="story-box101" style={{ rowGap: "40px" }}>
                        {filteredStories.map((st, index) => (
                            <li key={index} className="storybox-public-feed">
                                <img className="story-by-user-public" src={st.cover_image} alt="" />
                                <div className="public-story-title">
                                    <p style={{ fontWeight: "bold" }}>{st.title}</p>
                                    <p className="descp-public-stories">{getFirstEpisodeDescp(st)}</p>
                                </div>
                                <NavLink
                                    className="view-btn-public-feed"
                                    to={`/dashboard?activeTab=story-preview&storyId=${st.id}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PublicStoriesFeed;
