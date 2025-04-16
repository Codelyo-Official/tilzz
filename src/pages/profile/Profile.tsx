import React from "react";
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import MainContent from "../../components/MainDashboardContent/MainContent";


const Profile = () => {
    console.log("profile component rendered");
    return (
        <DashboardLayout>
            <MainContent />
        </DashboardLayout>
    );
}

export default Profile;
