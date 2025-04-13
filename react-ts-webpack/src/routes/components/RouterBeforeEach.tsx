import { useLocation, useNavigate} from "react-router-dom";
import {baseRoutes, RouteConfig} from "@/routes";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import { checkPermission } from "../guards";

// 遍历获取目标路由
const getCurrentRouterMap = (routers: RouteConfig[], path: string): RouteConfig => {
    for(const router of routers) {
        // 父路由
        if(router.path == path) return router;
        // 子路由
        if(router.children) {
            path = path.replace("/", "")
            const childRouter = getCurrentRouterMap(router.children, path)
            if(childRouter) return childRouter;
        }
    }
    return baseRoutes[baseRoutes.length -1]
}

export const RouterBeforeEach = ({children}: any) => {
    const token = useSelector<RootState, string>(state => state.admin.auth)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const router = getCurrentRouterMap(baseRoutes, location.pathname);
        
        // 处理路由重定向
        if (router.redirect) {
            navigate(router.redirect, { replace: true });
            return;
        }
        
        // 处理权限验证
        if (!checkPermission(router, token)) {
            navigate('/login', {
                replace: true,
                state: { from: location }
            });
            return;
        }
        
        // 设置页面标题
        if (router.meta?.title) {
            document.title = router.meta.title;
        }
        
    }, [token, location.pathname, navigate]);
    return children
}