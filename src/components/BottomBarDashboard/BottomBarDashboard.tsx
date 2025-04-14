import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setActiveTab } from "../../features/tabSlice";
import { RiHomeLine } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";


const BottomBarDashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
        <div className="bottom-bar-dashboard">
            <a onClick={() => {
                navigate("/");

            }}>
                <RiHomeLine />
            </a>
            <a className="middle-bottom-icon" onClick={() => {
                navigate("/dashboard?activeTab=create-story");
                dispatch(setActiveTab("create-story"))

            }}>
                <IoAddCircleOutline />
            </a>
            <a onClick={() => {
                navigate("/dashboard?activeTab=account");
                dispatch(setActiveTab("account"))

            }}>
                <CgProfile />
            </a>
        </div>
    )
}

export default BottomBarDashboard;