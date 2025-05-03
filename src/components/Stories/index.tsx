import React, { useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from "../../redux/features/tabSlice";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "axios";
import { ApiError } from "../../types/apiError";
import { story } from "../../types/story";


const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function Stories({ slugStories }: { slugStories: string | null }) {

    console.log("stories component rendered");

    const dispatch = useDispatch();
    const { user }: any = useAuth();
    console.log(user)

    const [dataStories, setDataStories] = React.useState<story[]>([]);

    const getMyStories = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const myStoriesApi_response = await axios.get(`${API_BASE_URL}/api/stories/my_stories/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(myStoriesApi_response);
            setDataStories(myStoriesApi_response.data);

        } catch (err: any) {
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
            }
        }
    }

    const getAllStories = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const allStoriesApi_response = await axios.get(`${API_BASE_URL}/api/stories/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(allStoriesApi_response);
            setDataStories(allStoriesApi_response.data);

        } catch (err: any) {
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
            }
        }
    }

    useEffect(() => {
        console.log(`sending req to recieve stories for user:${user.username}`)
        if (slugStories === "stories-feed" || slugStories === null) {
            // api call for all stories
            // setDataStories(FeedStories);
            getAllStories();
        } else if (slugStories === "my-stories") {
            // api call for user story only
            // setDataStories(MyStories);
            getMyStories();
        } else if (slugStories === "following-stories") {
            // api call for stories followed by the user
            // setDataStories(FollowingStories);
            setDataStories([])
        }
    }, [slugStories]);

    const handleActiveMenu = (name: string) => {
        dispatch(setActiveTab(name));
    };

    const toggleFollow = async (st: story) => {

        try {
            const token = sessionStorage.getItem("token");
            console.log(token);
            const followStoryApi_response = await axios.post(`${API_BASE_URL}/api/stories/${st.id}/${!st.follow ? 'follow' : 'unfollow'}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(followStoryApi_response);
            //setDataStories(followStoryApi_response.data);

        } catch (err: any) {
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
                alert(errorMessage)
            }
        } finally {
           
        }
    }

    const handle_like = async (st: story) => {
        console.log(st);
        try {
            const token = sessionStorage.getItem("token");
            console.log(token);
            const likeStoryApi_response = await axios.post(`${API_BASE_URL}/api/stories/${st.id}/${!st.is_liked ? 'like' : 'unlike'}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(likeStoryApi_response);
            //setDataStories(likeStoryApi_response.data);

        } catch (err: any) {
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
                alert(errorMessage)
            }
        } finally {
            
        }
    }

    return (
        <div>
            <div className="logged-in-user-story-div" style={{
                backgroundColor: slugStories === "public-feed" ? "transparent" : "white",
                boxShadow: slugStories === "public-feed" ? "none" : "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}>
                <h2 className="heading-your-story">{slugStories === null || slugStories === "stories-feed" ? ("Stories") : slugStories === "my-stories" ? "My Stories" : "Following Stories"}</h2>
                <div className="story-container">
                    <ul className="story-box101">
                        {dataStories.map((st, index) => {
                            return (
                                <li className="story-box" key={index}>
                                    <NavLink
                                        className=""
                                        style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%" }}
                                        to={`/dashboard?activeTab=story-preview&storyId=${st.id}`}
                                        onClick={() => { handleActiveMenu("story-preview") }}
                                    >
                                    </NavLink>
                                    <div className="like-dislike-div"
                                    >
                                        <button
                                            onClick={() => {
                                                console.log("like btn hit")
                                                handle_like(st)
                                            }}
                                            style={{ height: "20px", width: "20px", color: "white" }}
                                        >
                                            <div className="heart-icon">
                                                <svg
                                                    fill="white"
                                                    version="1.1"
                                                    id="Layer_1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 511.996 511.996">
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M467.01,64.373c-29.995-29.995-69.299-44.988-108.612-44.988c-36.779,0-73.259,13.662-102.4,39.919
                                                        c-29.15-26.257-65.621-39.919-102.4-39.919c-39.313,0-78.618,14.993-108.612,44.988c-59.981,59.981-59.981,157.235,0,217.225
                                                        L255.998,492.61L467.01,281.598C526.991,221.609,526.991,124.363,467.01,64.373z M448.919,263.49L255.998,456.403L63.085,263.499
                                                        c-49.903-49.911-49.903-131.115,0-181.018c24.175-24.175,56.32-37.487,90.513-37.487c31.206,0,60.399,11.563,83.695,31.889
                                                        l18.705,17.485l18.714-17.493c23.296-20.318,52.489-31.889,83.695-31.889c34.193,0,66.33,13.312,90.513,37.487
                                                        C498.831,132.375,498.822,213.587,448.919,263.49z"/>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </button>
                                        <h4 className="like-count">{st.likes_count}</h4>
                                    </div>
                                    <div className="story-by-user"><img src={st.author.profile_picture} /> <div style={{ position: "absolute", top: "2px", left: "32px" }}>{st.author.username}</div></div>

                                    <img src={st.cover_image} alt="" />
                                    <div className="title">
                                        <p >{st.title}
                                            {st.author.id !== user.id && (
                                                <button
                                                    onClick={() => { toggleFollow(st) }}
                                                    className={st.follow
                                                        ? "following-btn"
                                                        : "follow-btn"}>{st.follow
                                                            ? "following"
                                                            : "follow"}</button>
                                            )}
                                        </p>
                                        <p className="descp">{st.description}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                </div>
                {/* <div className="viewmore-div">
                    <button>View More</button>
                </div> */}
            </div>
        </div>
    );
}

export default Stories;
