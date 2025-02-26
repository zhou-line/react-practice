import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const ProtectedRoute = (props: any) => {
    // const { token } = useAuth();
    const role= useSelector<RootState, number>(state => state.player.role)
    const location = useLocation();

    if (!role) { //重定向之前页面
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return props.children
};

export default ProtectedRoute;
