import React, { useEffect, useState } from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getSession } from "@/api/user";
import { setAuth, setSuperuser, setUsername } from "@/store/actions/adminAction";
import { setLoading } from "@/store/actions/photoAction";

interface LoginResponse {
    code: number;
    message: string;
    token: string;
    is_authenticated: boolean;
    is_superuser: boolean;
    username: string;
}

// 优化后的 ProtectedRoute 组件
const ProtectedRoute = (props: any) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const [isAuth, setIsAuth] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            console.log(location)
            try {
                dispatch(setLoading(true))
                const session = await getSession();
                const value = session as any as LoginResponse;
                dispatch(setUsername(value.username))
                dispatch(setSuperuser(value.is_superuser))
                setIsAuth(value.is_authenticated)
                if (value.is_authenticated) {
                    dispatch(setAuth(value.token));
                } else {
                    dispatch(setAuth(''));  
                }

            } catch {
                window.location.href = '#/404';
            }
        }
    
        checkAuthStatus();
    }, [location])

    if (!isAuth) {
        // 保存用户尝试访问的路径
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return props.children;
};

export default ProtectedRoute;
