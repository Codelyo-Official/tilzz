import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setActiveTab } from "../../redux/features/tabSlice";
import { User } from "../../types/user";

const API_BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';


const TopBarDashboard = ({ user }: {
    user: any
}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
        <div className="logged-in-user-avatar"><span>{user.username}</span> <button onClick={() => {
            let element = document.getElementById("dropdown-content-id") as HTMLDivElement;
            if (element.style.display === "none") {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }}><img src={`${API_BASE_URL}${user.profile_picture}`} /></button>
            <div className="dropdown-content" id="dropdown-content-id">
                <a onClick={() => {
                    let element = document.getElementById("dropdown-content-id") as HTMLDivElement;
                    dispatch(setActiveTab("account"))
                    element.style.display = "none";
                    navigate("/dashboard?activeTab=account");
                }}>View Profile</a>
            </div>
        </div>
    )
}

export default TopBarDashboard;