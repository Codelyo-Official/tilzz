import React, { useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from "../../redux/features/tabSlice";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "axios";
import { ApiError } from "../../types/apiError";
import { story } from "../../types/story";
import { User } from "../../types/user";
import Spinner from 'react-bootstrap/Spinner';
import Dots from "../../common/components/dots";
import CategoryFilter from "../CategoryFilter";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function Stories({ slugStories }: { slugStories: string | null }) {

    const dispatch = useDispatch();
    const { user }: any = useAuth();
    const [dataStories, setDataStories] = React.useState<story[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isRequestInProgress, setIsRequestInProgress] = React.useState(false);
    const [isRequestInProgress1, setIsRequestInProgress1] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState<string>("");
    const [searchQuery, setSearchQuery] = React.useState<string>("");

    const getMyStories = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            const myStoriesApi_response = await axios.get(`${API_BASE_URL}/api/stories/stories/my_stories/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            setLoading(false);
            console.log(myStoriesApi_response);
            setDataStories(myStoriesApi_response.data);

        } catch (err: any) {
            setLoading(false);
            console.log(err)
            const apiError = err as ApiError;
            let errorMessage = apiError.message;
            if (apiError.response) {
                const status = apiError.response.status;
                errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
            }
            alert(errorMessage);
        }
    }

    const getAllStories = async () => {
        try {
            setLoading(true);

            const token = sessionStorage.getItem("token");
            const allStoriesApi_response = await axios.get(`${API_BASE_URL}/api/stories/stories/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(allStoriesApi_response);
            setLoading(false);

            setDataStories(allStoriesApi_response.data);

        } catch (err: any) {
            setLoading(false);
            console.log(err)
            const apiError = err as ApiError;
            let errorMessage = apiError.message;
            if (apiError.response) {
                const status = apiError.response.status;
                errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
            }
            alert(errorMessage);
        }
    }

    const getFavStories = async () => {
        try {
            setLoading(true);

            const token = sessionStorage.getItem("token");
            const favStoriesApi_response = await axios.get(`${API_BASE_URL}/api/accounts/favorite-stories/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(favStoriesApi_response);
            setLoading(false);

            // setDataStories(favStoriesApi_response.data);

        } catch (err: any) {
            setLoading(false);
            console.log(err)
            const apiError = err as ApiError;
            let errorMessage = apiError.message;
            if (apiError.response) {
                const status = apiError.response.status;
                errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
            }
            alert(errorMessage);
        }
    }

    const getFollowedStories = async () => {
        try {
            setLoading(true);

            const token = sessionStorage.getItem("token");
            const followedStoriesApi_response = await axios.get(`${API_BASE_URL}/api/accounts/followed-stories/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            console.log(followedStoriesApi_response);
            setLoading(false);

            setDataStories(followedStoriesApi_response.data);

        } catch (err: any) {
            setLoading(false);
            console.log(err)
            const apiError = err as ApiError;
            let errorMessage = apiError.message;
            if (apiError.response) {
                const status = apiError.response.status;
                errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
            }
            alert(errorMessage);
        }
    }

    useEffect(() => {
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
            getFollowedStories();
        }

        else if (slugStories === "fav-stories") {
            // api call for stories followed by the user
            // setDataStories(FollowingStories);
            getFavStories();
        }
    }, [slugStories]);

    const handleActiveMenu = (name: string) => {
        dispatch(setActiveTab(name));
    };

    const toggleFollow = async (st: story) => {

        const controller = new AbortController();
        const { signal } = controller;
        if (isRequestInProgress) {
            console.log("follow alreadyin progress")
            controller.abort();
            return;
        }
        setIsRequestInProgress(true);

        try {
            const token = sessionStorage.getItem("token");
            let follow_flag = checkIfInFollowing(user, st);
            const followStoryApi_response = await axios.post(`${API_BASE_URL}/api/stories/stories/${st.id}/${!follow_flag ? 'follow' : 'unfollow'}/`, {}, {
                headers: {
                    Authorization: `Token ${token}`,
                }, signal: signal
            });
            console.log(followStoryApi_response);
            //setDataStories(followStoryApi_response.data);

            setDataStories(prevStories =>
                prevStories.map(s =>
                    s.id === st.id
                        ? {
                            ...s,
                            followed_by: follow_flag
                                ? s.followed_by.filter(id => id !== user.id)
                                : [...s.followed_by, user.id],
                        }
                        : s
                )
            );


        } catch (err: any) {
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
                alert(errorMessage)
            }
        } finally {
            setIsRequestInProgress(false);
        }
    }

    const handle_like = async (st: story) => {

        const controller = new AbortController();
        const { signal } = controller;
        if (isRequestInProgress1) {
            console.log("like alreadyin progress")
            controller.abort();
            return;
        }
        setIsRequestInProgress1(true);

        try {
            const token = sessionStorage.getItem("token");
            let like_flag = checkIfInLiking(user, st);

            const likeStoryApi_response = await axios.post(`${API_BASE_URL}/api/stories/stories/${st.id}/${!like_flag ? 'like' : 'unlike'}/`, {}, {
                headers: {
                    Authorization: `Token ${token}`,
                },
                signal: signal
            });
            console.log(likeStoryApi_response);
            //setDataStories(likeStoryApi_response.data);
            setDataStories(prevStories =>
                prevStories.map(s =>
                    s.id === st.id
                        ? {
                            ...s,
                            likes_count: like_flag ? st.likes_count - 1 : st.likes_count + 1,
                            liked_by: like_flag
                                ? s.liked_by.filter(id => id !== user.id)
                                : [...s.liked_by, user.id],
                        }
                        : s
                )
            );

        } catch (err: any) {
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.detail || 'Something went wrong on the server!';
                alert(errorMessage)
            }
        } finally {
            setIsRequestInProgress1(false);
        }
    }

    const checkIfInFollowing = (user: User, st: story) => {
        if (st.followed_by.includes(user.id))
            return true;
        return false;
    }

    const checkIfInLiking = (user: User, st: story) => {
        if (st.liked_by.includes(user.id))
            return true;
        return false;
    }

    const getfirstepsiodedescp = (st: any) => {

        if (st.versions.length > 0) {
            if (st.versions[0].episodes.length > 0) {
                return st.versions[0].episodes[0].content;
            }
        }

        return '';
    }

    const handleCategoryChange = (category: string, searchQuery: string) => {
        console.log("Selected category from child:", category, searchQuery);
        setSelectedCategory(category)
        setSearchQuery(searchQuery)
        // Do whatever you need here
    };

    // Filter stories by title based on searchQuery
    const filteredStories = dataStories.filter((story: any) =>
        (selectedCategory === "All" || (story.category !== null && story.category.includes(selectedCategory))) && (searchQuery === "" || story.title.includes(searchQuery))
    );

    return (
        <div>
            <CategoryFilter onCategoryChange={handleCategoryChange} />
            <div className="logged-in-user-story-div" style={{
                backgroundColor: slugStories === "public-feed" ? "transparent" : "white",
                boxShadow: slugStories === "public-feed" ? "none" : "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}>
                <h2 className="heading-your-story">{slugStories === null || slugStories === "stories-feed" ? ("Stories") : slugStories === "my-stories" ? "My Stories" : slugStories === "following-stories" ? "Following Stories" : "Following Stories"}</h2>
                {loading ? (<div style={{ width: "100%", height: "120px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Dots />
                </div>) : (
                    <div className="story-container">
                        <ul className="story-box101">
                            {filteredStories.map((st, index) => {
                                if (st.visibility !== "private" || (st.visibility === "private" && st.creator === user.id)) {
                                    return (
                                        <li className="story-box" key={index}>
                                            <NavLink
                                                className=""
                                                style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", zIndex: 2 }}
                                                to={`/dashboard?activeTab=story-preview&storyId=${st.id}`}
                                                onClick={() => { handleActiveMenu("story-preview") }}
                                            >
                                            </NavLink>
                                            {(st.creator !== user.id || true) && (
                                                <div className="like-dislike-div"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            console.log("like btn hit")
                                                            handle_like(st)
                                                        }}
                                                        style={{ height: "20px", width: "20px", color: "white", zIndex: "9", position: "relative" }}
                                                    >
                                                        <div className="heart-icon">
                                                            <svg
                                                                className={`heart ${checkIfInLiking(user, st) ? 'clicked' : ''}`}
                                                                version="1.1"
                                                                id="Layer_1"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 541 471">
                                                                <path d="M531.74 179.384C523.11 207.414 507.72 237.134 485.99 267.714V267.724C430.11 346.374 362.17 413.124 284.06 466.134C279.83 469.004 274.93 470.444 270.03 470.444C265.12 470.444 260.23 469.004 255.99 466.134C177.88 413.134 109.94 346.374 54.05 267.724C32.32 237.134 16.93 207.414 8.30003 179.384C-3.38997 141.424 -2.73 106.594 10.27 75.8437C23.4 44.7837 49.2 20.9136 82.91 8.61363C114.03 -2.73637 149.33 -2.87637 179.77 8.23363C213.87 20.6836 244.58 45.1136 270.02 79.7436C295.46 45.1136 326.16 20.6836 360.27 8.23363C390.71 -2.87637 426.02 -2.73637 457.13 8.61363C490.84 20.9136 516.64 44.7837 529.77 75.8437C542.77 106.594 543.431 141.424 531.74 179.384Z" fill="white" />
                                                            </svg>

                                                        </div>
                                                    </button>
                                                    <h4 className="like-count">{st.likes_count}</h4>
                                                </div>)}
                                            {/* <div className="story-by-user"><img src={st.author.profile_picture} /> <div style={{ position: "absolute", top: "2px", left: "32px" }}>{st.author.username}</div></div> */}

                                            <img src={st.cover_image} alt="" />
                                            <div className="title">
                                                <p >{st.title}
                                                </p>
                                                {(st.creator !== user.id) && (
                                                    <button
                                                        style={{ zIndex: "9", position: "relative" }}
                                                        onClick={() => { toggleFollow(st) }}
                                                        className={checkIfInFollowing(user, st)
                                                            ? "following-btn"
                                                            : "follow-btn"}>{checkIfInFollowing(user, st)
                                                                ? "following"
                                                                : "follow"}</button>
                                                )}
                                                <p className="descp">{getfirstepsiodedescp(st)}</p>
                                            </div>
                                        </li>
                                    )
                                } else
                                    return;
                            })}
                        </ul>

                    </div>
                )}

                {/* <div className="viewmore-div">
                    <button>View More</button>
                </div> */}
            </div>
        </div>
    );
}

export default Stories;
