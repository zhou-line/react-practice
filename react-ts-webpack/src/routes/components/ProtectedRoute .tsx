import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const ProtectedRoute = (props: any) => {
    // const { token } = useAuth();
    const location = useLocation();
    
    const admin = useSelector<RootState, any>(state => state.admin)
    if (!admin.auth) { //重定向之前页面
        return <Navigate to="/login" replace state={{ from: location, admin: admin }} />;
    }
    return props.children
};

export default ProtectedRoute;
