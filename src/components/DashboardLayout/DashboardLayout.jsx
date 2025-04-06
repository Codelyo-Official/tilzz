import React, {useEffect,useMemo,useState} from "react";
import "./styles.css";
import { useAuth } from "../../contexts/AuthProvider";
import Sidebar from "../Sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {setActiveTab} from "../../features/tabSlice";

import { RiHomeLine } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import MainContent from "../../components/MainDashboardContent/MainContent";



const DashboardLayout = React.memo(({children}) => {

    console.log("dashboard layout component rendered");
     const dispatch = useDispatch();
    const navigate = useNavigate();
    const {getUser} = useAuth();
    const user = useMemo(() => getUser(), []);

    return (
        <>
        {user!==null ? (
            <>
        <div className="navbar-dashboard">
        <Link to={"/"} >
            <h2 className="logo">Narrato</h2>
        </Link>
        <div className="logged-in-user-avatar"><span>{user.username}</span> <button onClick={()=>{
            let element = document.getElementById("dropdown-content-id");
            if (element.style.display === "none") {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }}><img src={"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1738868287~exp=1738871887~hmac=e24f4e7f6c2262238670c06cca214d2d0629465513fa6c63fdf54624c2855cf2&w=740"}/></button>
        <div className="dropdown-content" id="dropdown-content-id">
            <a onClick={()=>{
                let element = document.getElementById("dropdown-content-id");
                navigate("/dashboard?activeTab=account");
                dispatch(setActiveTab("account"))
                element.style.display = "none";
            }}>View Profile</a>
        </div>
        </div>
        </div>
        <div className="main-user-dashboard">
            <div className="leftdiv">
                <Sidebar/>
            </div>
            <div className="rightdiv"><MainContent/></div>
        </div>
        <div className="bottom-bar-dashboard">
        <a onClick={()=>{
                navigate("/");
            }}>
            <RiHomeLine/>
            </a>
            <a className="middle-bottom-icon" onClick={()=>{
                navigate("/dashboard?activeTab=create-story");
                dispatch(setActiveTab("create-story"))
            }}>
            <IoAddCircleOutline/>
            </a>
            <a onClick={()=>{
                navigate("/dashboard?activeTab=account");
                dispatch(setActiveTab("account"))
            }}>
            <CgProfile/>
            </a>
        </div>
        </>
        ):(
            <div>loading</div>
        )}
        </>
    );
});

export default DashboardLayout;
