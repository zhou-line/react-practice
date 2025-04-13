import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

// 优化后的 ProtectedRoute 组件
const ProtectedRoute = (props: any) => {
    const admin = useSelector<RootState, any>(state => state.admin);
    const location = useLocation();
    
    if (!admin.auth) {
        // 保存用户尝试访问的路径
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return props.children;
};

export default ProtectedRoute;
