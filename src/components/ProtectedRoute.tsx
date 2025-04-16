import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/AuthProvider";


const ProtectedRoute = ({children}:{children:React.JSX.Element}) => {
    const {user} = useAuth();
    const location = useLocation();
    // console.log(location)
    if (location.pathname === "/dashboard" && user.username=="none") {
        return <Navigate to={`/login${location.search}`}/>;
    }

    if ((location.pathname === "/login" || location.pathname === "/register") && user.username!="none") {
        // console.log("in here yo")
        return <Navigate to={`/dashboard${location.search}`}/>;
    }

    return children;
};

export default ProtectedRoute;