import React, { use, useEffect } from "react";
import Stories from "../Stories";
import CreateStory from "../CreateStory";
import StoryPreview from "../StoryPreview";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from "../../redux/features/tabSlice";
import Account from "../Account";
import Reports from "../Reports";

function MainContent() {

    console.log("maincontent component rendered");
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('activeTab'); // Retrieve the value of a specific query parameter
    React.useEffect(()=>{
        // console.log(value)
        dispatch(setActiveTab(value));
    },[value])

    return (
        <>

            {(value === null || (value === "stories-feed" || value === "my-stories" ||
                value === "following-stories" || value === "fav-stories"
            )) && (
                    <Stories slugStories={value} />
                )}

            {value === "create-story" && (
                <CreateStory />
            )}

            {value === "story-preview" && (
                <StoryPreview />
            )}

            {value === "account" && (
                <Account />
            )}

            {value === "reports" && (
                <Reports />
            )}
        </>
    );
}

export default MainContent;
