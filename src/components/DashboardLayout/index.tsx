import React from "react";
import { useAuth } from "../../contexts/AuthProvider";
import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';
import BottomBarDashboard from "../BottomBarDashboard";
import TopBarDashboard from "../TopBarDashboard";
import "./dashboardstyles.css";

function DashboardLayout({children}:{children:React.ReactNode}) {

    const {user} = useAuth();

    return (
        <>
        <div className="navbar-dashboard">
        <Link to={"/"} >
            <h2 className="logo">Narrato</h2>
        </Link>
        <TopBarDashboard user={user}/>
        </div>
        <div className="main-user-dashboard">
            <div className="leftdiv">
                <Sidebar/>
            </div>
            <div className="rightdiv">{children}</div>
        </div>
        <BottomBarDashboard/>
        </>
    );
}

export default DashboardLayout;

