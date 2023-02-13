import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../contexts/UserContext";

function Dashboard(props) {
    const context = useContext(userContext);

    if (!context.user) {
        return <Navigate to="/login"/>
    }

    return (
        <h1>Dashboard</h1>
    );
}

export default Dashboard;