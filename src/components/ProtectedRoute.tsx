import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../contexts/AuthProvider";


const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const {user} = useAuth();
    const location = useLocation();

    if (location.pathname === "/dashboard" && user.username=="none") {
        return <Navigate to="/login"/>;
    }

    if ((location.pathname === "/login" || location.pathname === "/register") && user.username!="none") {
        return <Navigate to="/dashboard"/>;
    }

    return children;
};

export default ProtectedRoute;