import React, { use, useEffect } from "react";
import Stories from "../Stories/stories";
import CreateStory from "../CreateStory/CreateStory";
import StoryPreview from "../StoryPreview/StroryPreview";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from "../../features/tabSlice";
import Account from "../Account/Account";
import Reports from "../Reports/reports";

function MainContent({ children }) {

    console.log("maincontent component rendered");
    const dispatch = useDispatch();
    // const activeMenu = useSelector(((state) => state.activeTab.activeTab));
    // console.log(activeMenu)
    const location = useLocation();
    //console.log(location)
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get('activeTab'); // Retrieve the value of a specific query parameter
    // if (activeMenu !== value)

    React.useEffect(()=>{
        dispatch(setActiveTab(value));
    },[value])



    return (
        <>

            {(value === null || (value === "stories-feed" || value === "my-stories" ||
                value === "following-stories"
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
