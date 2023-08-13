import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, redirect = "/login",
    redirectAdmin = "/profile", }) => {
    const { isLoggedIn, user } = useSelector((state) => state.user);

    if (!isLoggedIn) {
        console.log("hi");
        return <Navigate to={"/login"} />;
    }
    console.log("hi2");
    return children ? children : <Outlet />;
};

export default ProtectedRoute;
