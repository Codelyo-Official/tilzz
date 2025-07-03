import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { story } from "../../types/story";
import { ApiError } from "../../types/apiError";
import axios from "axios";
import "./publicfeed.css"
import CategoryFilter from "../CategoryFilter";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

function PublicStoriesFeed() {
    const [dataStories, setDataStories] = useState<story[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState<string>("");
    const [searchQuery, setSearchQuery] = React.useState<string>("");
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
    const filteredStories = dataStories.filter((story: any) =>
        (selectedCategory === "All" || (story.category !== null && story.category.includes(selectedCategory))) && (searchQuery === "" || story.title.includes(searchQuery))
    );

    const handleCategoryChange = (category: string, searchQuery: string) => {
        console.log("Selected category from child:", category, searchQuery);
        setSelectedCategory(category)
        setSearchQuery(searchQuery)
        // Do whatever you need here
    };

    return (
        <div>
            <CategoryFilter onCategoryChange={handleCategoryChange} />
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
