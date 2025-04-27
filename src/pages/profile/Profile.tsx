import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import MainContent from "../../components/MainDashboardContent";


const Profile = () => {
    console.log("profile component rendered");
    return (
        <DashboardLayout>
            <MainContent />
        </DashboardLayout>
    );
}

export default Profile;
