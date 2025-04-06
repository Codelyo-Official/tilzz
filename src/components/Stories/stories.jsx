import React, { useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from "../../features/tabSlice";
import { useAuth } from "../../contexts/AuthProvider";


const FeedStories = [
    {
        id: 1,
        title: "Hamza First Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",
        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"
    }, {
        id: 2,
        title: "Hamza Second Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "hamza856",

        follow: false,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 3,
        title: "R6 Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 4,
        title: "Japan Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
    , {
        id: 5,
        title: "Pak Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 6,
        title: "My Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 7,
        title: "Another Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
]

const MyStories = [
    {
        id: 1,
        title: "Hamza First Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",
        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"
    }, {
        id: 2,
        title: "R6 Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 3,
        title: "Japan Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
    , {
        id: 4,
        title: "Pak Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 5,
        title: "My Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 6,
        title: "Another Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
]

const FollowingStories = [
    {
        id: 1,
        title: "Hamza First Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",
        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"
    }, {
        id: 2,
        title: "R6 Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 3,
        title: "Japan Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
    , {
        id: 4,
        title: "Pak Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 5,
        title: "My Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }, {
        id: 6,
        title: "Another Story",
        img: "https://images.pexels.com/photos/3218465/pexels-photo-3218465.jpeg?auto=compress" +
            "&cs=tinysrgb&w=1260&h=750&dpr=1",
        description: "this is a story. And this is my description",
        story_by_user: "john_doe",

        follow: true,
        liked: false,
        like_count: 10,
        user_avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"

    }
]

function Stories({ children, slugStories }) {

    console.log("stories component rendered");

    const dispatch = useDispatch();
    const { getUser } = useAuth();
    const user = getUser();

    const [dataStories, setDataStories] = React.useState([]);

    useEffect(() => {
        console.log(`sending req to recieve stories for user:${user.username}`)
        if (slugStories === "stories-feed" || slugStories === null) {
            // api call for all stories
            setDataStories(FeedStories);
        } else if (slugStories === "my-stories") {
            // api call for user story only
            setDataStories(MyStories);
        } else if (slugStories === "following-stories") {
            // api call for stories followed by the user
            setDataStories(FollowingStories);
        }
    }, [slugStories]);

    const handleActiveMenu = (name) => {
        dispatch(setActiveTab(name));
    };

    const toggleFollow = (id) => {

        setDataStories(() =>
            dataStories.map((story) =>
                story.id === id ? { ...story, follow: !story.follow } : story
            ));
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
                                    <div className="like-dislike-div">
                                        <button
                                            onClick={() => { console.log("like btn toggled") }}
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
                                        <h4 className="like-count">{st.like_count}</h4>
                                    </div>
                                    <div className="story-by-user"><img src={st.user_avatar} /> <div style={{ position: "absolute", top: "2px", left: "32px" }}>{st.story_by_user}</div></div>

                                    <img src={st.img} alt="" />
                                    <div className="title">
                                        <p >{st.title}
                                            {slugStories !== "my-stories" && (
                                                <button
                                                    onClick={() => { toggleFollow(st.id) }}
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
                <div className="viewmore-div">
                    <button>View More</button>
                </div>
            </div>
        </div>
    );
}

export default Stories;
