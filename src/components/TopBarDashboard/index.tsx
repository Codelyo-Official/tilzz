import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setActiveTab } from "../../redux/features/tabSlice";
import { User } from "../../types/user";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;
const PUBLIC_BASE_URL = process.env.REACT_APP_PUBLIC_BASE_URL;

const TopBarDashboard = ({ user }: {
    user: any
}) => {

    console.log(PUBLIC_BASE_URL)

    console.log("user from top bar:",user)
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
        }}>
            {/* <img src={user.profile_picture!==null && user.profile_picture.startsWith('http')
            ? user.profile_picture
            : `${API_BASE_URL}${user.profile_picture}`}
            /> */}
            <img src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} alt="avatar"/>
            </button>
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