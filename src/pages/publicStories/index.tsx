import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { FiArrowRightCircle } from "react-icons/fi";
import "./publicstory.css";
import HomeNavbar from "../../components/HomeNavbar";
import PublicStoriesFeed from "../../components/PublicStories";
import Footer from "../../components/Footer";

function PublicStories() {
    console.log("pUBLIC dTORY PAGE LOADED")
    return (
        <>
            <HomeNavbar />
            <div>
                <PublicStoriesFeed />
            </div>
            <Footer/>
        </>
    );
}

export default PublicStories;
