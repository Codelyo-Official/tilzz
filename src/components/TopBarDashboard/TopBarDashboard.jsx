import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setActiveTab } from "../../features/tabSlice";


const TopBarDashboard = ({user}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
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
                dispatch(setActiveTab("account"))
                element.style.display = "none";
                navigate("/dashboard?activeTab=account");
            }}>View Profile</a>
        </div>
        </div>
    )
}

export default TopBarDashboard;