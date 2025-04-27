import React, { useEffect, useState } from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getSession } from "@/api/user";
import { setAuth } from "@/store/actions/adminAction";

interface LoginResponse {
    code: number;
    message: string;
    token: string;
    is_authenticated: boolean;
    
}

// 优化后的 ProtectedRoute 组件
const ProtectedRoute = (props: any) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const [isAuth, setIsAuth] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const session = await getSession();
            const value = session as any as LoginResponse;
            if (value.is_authenticated) {
                dispatch(setAuth(value.token));
                setIsAuth(true)
            } else {
                dispatch(setAuth(''));
                setIsAuth(false)
            }
        }
    
        checkAuthStatus();
    }, [])

    if (!isAuth) {
        // 保存用户尝试访问的路径
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return props.children;
};

export default ProtectedRoute;
